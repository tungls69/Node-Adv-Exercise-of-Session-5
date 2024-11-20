"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedOrder = localStorage.getItem("beamin-order");
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (order.length > 0) {
            localStorage.setItem("beamin-order", JSON.stringify(order));
        }
    }, [order]);

    return (
        <OrderContext.Provider value={{ order, setOrder, loading }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    return useContext(OrderContext);
}
