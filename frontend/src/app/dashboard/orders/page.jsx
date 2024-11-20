"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination, Table } from '@nextui-org/react';
import { useUser } from '@/contexts/UserContext';  
import { getOrders } from '@/apis/orders';
const limit = 10;


const OrderListPage = () => {
    const { user } = useUser(); 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    
    const fetchOrders = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await getOrders(currentPage, limit)
            console.log(response.data.orders);  
            setOrders(response.data.orders); 
            setTotalPage(response.data.totalPages); 
        } catch (err) {
            console.log(err)
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();  
        }
    }, [user, currentPage]);


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Danh sách đơn đặt hàng</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <p className="text-gray-600">Chưa có đơn đặt hàng nào</p>
                    ) : (
                        <div className='grid grid-cols-3 gap-3'>
                            {
                                orders.map(order =>
                                    <div className='border  rounded-md bg-white drop-shadow-sm'>
                                        <div className=' border-b pb-2'>
                                            <p className='text-center font-bold '>
                                                ID Đơn:{order.id}
                                            </p>
                                            <p className='text-center'>{order.user.email}</p>
                                        </div>
                                        <div className='p-1'>

                                            {order.items.map((item) => (
                                                <div key={item.foodId}>
                                                    <p>
                                                        {item.food.name}
                                                    </p>
                                                    <div className='flex justify-between'>
                                                        <p>(x{item.quantity})</p>
                                                        <p className='text-right font-semibold text-xl'>
                                                            {item.quantity * item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            <p className='text-right font-semibold text-xl'>Tổng cộng: {order.total} VND</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )}

                    {
                        totalPage > 1 &&
                        <div className="mt-4 flex justify-between">
                            <Pagination total={totalPage} initialPage={currentPage} onChange={setCurrentPage} />
                        </div>
                    }

                </>
            )}
        </div>
    );
};

export default OrderListPage;
