"use client";
import { createCategory, getCategories } from "@/apis/foods";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Page() {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [isAddLoading, setIsAddLoading] = useState(false);

    
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true); 
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Không thể tải danh mục.");
        } finally {
            setIsLoading(false); 
        }
    };

    const handleCreateCategory = async () => {
        if (!name.trim()) {
            toast.warn("Tên danh mục không được để trống.");
            return;
        }

        setIsAddLoading(true); 
        try {
            await createCategory({ name });
            toast.success("Tạo danh mục thành công!");
            setName("");
            fetchCategories(); 
        } catch (error) {
            console.error("Error creating category:", error);
            toast.error("Không thể tạo danh mục. Vui lòng thử lại.");
        } finally {
            setIsAddLoading(false); 
        }
    };

    return (
        <div className="grid grid-cols-4 gap-2 ml-5">
       
            <div className="col-span-1 border bg-white">
                <p className="text-lg font-semibold bg-slate-100 p-2">Tạo danh mục</p>
                <div className="space-y-2 p-2">
                    <Input
                        type="text"
                        label="Tên"
                        variant="bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên danh mục"
                    />
                    <div className="flex justify-end">
                        <Button color="primary" onPress={handleCreateCategory} isLoading={isAddLoading}>
                            {isAddLoading ? "Đang tạo..." : "Tạo"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* List of categories */}
            <div className="col-span-3">
                <p className="text-lg font-semibold">Danh sách</p>
                <div className="bg-white border p-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            Đang tải
                        </div>
                    ) : categories.length === 0 ? (
                        <p>Không có danh mục nào.</p>
                    ) : (
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="border-b py-2 px-4 hover:bg-gray-50 flex justify-between items-center"
                                >
                                    <span>{category.name}</span>
                                    <Button size="sm" color="danger" onPress={() => toast('Chức năng chưa hoàn thiện')}>
                                        Xóa
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;
