"use client"
import { createOrder } from "@/apis/orders";
import { useOrder } from "@/contexts/OrderContext";
import { useUser } from "@/contexts/UserContext";
import { Button, Card, Text } from "@nextui-org/react";
import { toast } from "react-toastify";

function Cart() {
    const { order, setOrder } = useOrder(); 
    const { user } = useUser(); 

    const totalPrice = order.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleOrder = async () => {
        if (!user) {
            toast.error("Bạn cần đăng nhập để đặt hàng!");
            return;
        }

        const orderData = order.map(item => ({
            foodId: item.foodId,
            quantity: item.quantity,
        }));

        try {
            const response = await createOrder(orderData);
            toast.success("Đặt hàng thành công")
            setOrder([])
        } catch (err) {
            toast.error("Đặt hàng không thành công, thử lại sau!")
        } finally {

        }

    }

    return (
        <div className="cart container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Giỏ hàng</h2>
            {order.length === 0 ? (
                <p className="text-lg text-gray-600">Giỏ hàng của bạn trống</p>
            ) : (
                <div>
                    {order.map((item) => (
                        <div key={item.foodId} className="mb-4 shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.price} VND</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="mr-2">Số lượng: {item.quantity}</p>
                                    <p className="font-semibold">{item.price * item.quantity} VND</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="text-lg font-semibold text-right">Tổng cộng: {totalPrice} VND</p>

                    <div className="mt-6 flex justify-end items-center">
                        <Button color="success" onPress={handleOrder}>Đặt hàng</Button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Cart;
