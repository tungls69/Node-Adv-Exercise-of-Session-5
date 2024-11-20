"use client"

import Navbar from "@/components/shares/Navbar";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
    const { user } = useUser()
    const router = useRouter();

    useEffect(() => {
        if (user?.id) {
            router.push("/"); 
        }
    }, [user, router]);

    return (
        <div className="">
            <Navbar />
            <div className="  container mx-auto">
                {children}
            </div>
        </div>
    );
}
