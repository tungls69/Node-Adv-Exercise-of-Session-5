import { useState, useEffect } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

function FoodsCard({ food }) {
    const { isOpen, onOpenChange } = useDisclosure();
    const { order, setOrder } = useOrder();
    const [quantity, setQuantity] = useState(1);

    const existingFood = order.find(item => item.foodId === food.id);

    useEffect(() => {
        if (existingFood) {
            setQuantity(existingFood.quantity);
        }
    }, [existingFood]);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCart = () => {
        const foodDetails = { foodId: food.id, name: food.name, price: food.price, quantity };

        if (existingFood) {
            const updatedOrder = order.map(item =>
                item.foodId === food.id ? { ...item, quantity } : item
            );
            setOrder(updatedOrder);
        } else {
            const updatedOrder = [...order, foodDetails];
            setOrder(updatedOrder);
        }

        onOpenChange(false);
    };

    return (
        <>
            <div key={food.id} className="border p-2 rounded-md" onClick={() => onOpenChange(true)}>
                <img
                    src={food.image}
                    alt={food.name}
                    className="rounded-md w-full"
                />
                <h3 className="font-bold mt-2">{food.name}</h3>
                <p>{food.description}</p>
                <p className="text-gray-600 mt-2 font-bold text-lg">{food.price} VND</p>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Đặt món</ModalHeader>
                    <ModalBody>
                        <Input
                            type="number"
                            label="Số lượng"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min={1}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                            Đóng
                        </Button>
                        <Button color="success" onPress={handleAddToCart}>
                            {existingFood ? "Cập nhật giỏ hàng" : "Thêm vào giỏ"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default FoodsCard;
