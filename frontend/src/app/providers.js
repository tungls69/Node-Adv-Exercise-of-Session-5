import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "@/contexts/UserContext";
import { OrderProvider } from "@/contexts/OrderContext";

export default function Providers({ children }) {
    return (
        <NextUIProvider>
            <UserProvider>
                <OrderProvider>
                    {children}
                    <ToastContainer />
                </OrderProvider>
            </UserProvider>
        </NextUIProvider>
    );
}