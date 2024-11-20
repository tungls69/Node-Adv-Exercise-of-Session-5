"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Textarea, Select, SelectItem, Pagination } from "@nextui-org/react";
import { toast } from "react-toastify";
import { createFood, getCategories, getFoods } from "@/apis/foods";

const limit = 3

function CreateFood() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [foods, setFoods] = useState([]);
    const [page, setPage] = useState(1); 
    const [category, setCategory] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchFoods();
    }, [page, category]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Không thể tải danh mục.");
        }
    };


    const fetchFoods = async () => {
        try {
            const response = await getFoods(page, category, limit);
            setFoods(response.data.foods); 
            setTotalPage(response.data.totalPages)
        } catch (error) {
            console.error("Error fetching foods:", error);
            toast.error("Không thể tải danh sách thực phẩm.");
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !stock || !categoryId || !image) {
            toast.warn("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("categoryId", categoryId);
        formData.append("image", image);

        try {
            await createFood(formData);
            toast.success("Tạo món ăn thành công!");
            setName("");
            setDescription("");
            setPrice("");
            setStock("");
            setCategoryId("");
            setImage(null);
        } catch (error) {
            console.error("Error creating food:", error);
            toast.error("Không thể tạo món ăn. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Tạo món ăn</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border rounded">
                <Input
                    label="Tên món ăn"
                    placeholder="Nhập tên món ăn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    variant="bordered"
                />
                <Textarea
                    label="Mô tả"
                    placeholder="Nhập mô tả món ăn"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="bordered"
                />
                <Input
                    type="number"
                    label="Giá (VNĐ)"
                    placeholder="Nhập giá món ăn"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    variant="bordered"
                />
                <Input
                    type="number"
                    label="Số lượng"
                    placeholder="Nhập số lượng trong kho"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    variant="bordered"
                />

                <Select
                    label="Category"
                    variant="bordered"
                    placeholder="Select an category"
                    onChange={e => setCategoryId(e.target.value)}
                >
                    {categories.map((cate) => (
                        <SelectItem key={cate.id}>
                            {cate.name}
                        </SelectItem>
                    ))}
                </Select>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        Upload file
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={handleFileChange}
                    />
                    {image && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            File selected: <strong>{image.name}</strong>
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    color="primary"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                >
                    Tạo món ăn
                </Button>
            </form>

            <h1 className="text-xl font-bold mb-4 mt-5">Danh sách</h1>
            <div className="grid grid-cols-3 gap-4">
                {foods.length === 0 ? (
                    <p>Không có thực phẩm nào trong danh sách.</p>
                ) : (
                    foods.map((food) => (
                        <div key={food.id} className="border p-4 rounded-md">
                            <img
                                src={food.image} 
                                alt={food.name}
                                className="w-full h-48 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-lg font-semibold">{food.name}</h3>
                            <p>{food.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span>{food.price} VND</span>
                                <span>Còn lại {food.stock}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {
                totalPage > 1 &&
                <div className="flex justify-center mt-3">
                    <Pagination total={totalPage} initialPage={page} onChange={setPage}/>
                </div>
            }

        </div>
    );
}

export default CreateFood;
