"use client";

import Navbar from "@/components/shares/Navbar";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const adminRouter = [
    {
        name: "Danh mục",
        path: "/dashboard/categories",
    },
    {
        name: "Thức ăn",
        path: "/dashboard/foods",
    },
    {
        name: "Đơn đặt hàng",
        path: "/dashboard/orders",
    },
];

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const { user, setUser } = useUser()

    const router = useRouter();

    useEffect(() => {
        if (!user?.id) {
            router.push("/"); 
        }
    }, [user, router]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            <div className="container mx-auto grid grid-cols-5 pt-4 gap-5 divide-x-1 bg-gray-50">
                <div className="col-span-1 flex flex-col space-y-3 ">
                    {adminRouter.map((router) => (
                        <Link
                            key={router.path}
                            href={router.path}
                            className={`border px-4 py-2 rounded-md font-bold text-xl ${pathname === router.path ? "text-white bg-blue-400" : "hover:bg-gray-50 bg-white"
                                }`}
                        >
                            {router.name}
                        </Link>
                    ))}
                    <div className="bg-red-500 hover:bg-red-600 text-center py-2 px-4 font-bold text-white rounded-md"
                        onClick={() => {
                            setUser(null)
                            localStorage.removeItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_NAME);
                        }
                        }
                    >
                        Đăng xuất
                    </div>
                </div>

                <div className="col-span-4">{children}</div>
            </div>
        </div>
    );
}
