"use client";

import { register, registerAdmin } from "@/apis/auth";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function RegisterForm(props) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdminRegister, setIsAdminRegister] = useState(false);

    const handleRegister = async () => {
        try {
            if (isAdminRegister) {
                await registerAdmin({ email, password });
                alert("Đăng ký admin thành công!");
            } else {
                await register({ email, password });
                alert("Đăng ký thành công!");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Đăng ký thất bại, vui lòng thử lại.");
        }
    };

    return (
        <div className="border rounded p-3 w-64">
            <p className="text-2xl mb-4">Welcome to Beamin 👋</p>
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
                <Checkbox
                    isSelected={isAdminRegister}
                    onValueChange={setIsAdminRegister}
                >
                    Đăng ký admin
                </Checkbox>
                <Button color="primary" className="w-full" onPress={handleRegister}>
                    Đăng ký
                </Button>

                <p>
                    Quay lại trang{" "}
                    <Link href={"/login"} className="text-primary hover:underline">
                        đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
