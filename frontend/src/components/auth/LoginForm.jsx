"use client";

import { login } from "@/apis/auth";
import { useUser } from "@/contexts/UserContext";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

function LoginForm(props) {
    const { setUser } = useUser()

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState("admin@gamil.com");
    const [password, setPassword] = useState("admin");

    const handleRegister = async () => {
        try {
            const response = await login({ email, password });
            const { token, user } = response.data;

            localStorage.setItem(process.env.LOCAL_STORAGE_TOKEN_NAME || "BEAMIN", token);
            setUser(user);
            toast.success("Đăng nhập thành công!");
        } catch (error) {
            console.error(error);
            toast.error("Đăng nhập thất bại, vui lòng thử lại.");
        }
    };

    return (
        <div className="border rounded p-3 w-64">
            <p className="text-2xl mb-4">Welcome back 👋</p>
            <div className="space-y-4">
                <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    value={email}
                    onValueChange={setEmail}
                    placeholder="Enter your email"
                />
                <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                        >
                            {isVisible ? (
                                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <Eye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onValueChange={setPassword}
                />

                <Button color="primary" className="w-full" onPress={handleRegister}>
                    Đăng nhập
                </Button>

                <p>
                    BẠn chưa có tài khoản{" "}
                    <Link href={"/register"} className="text-primary hover:underline">
                        đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
