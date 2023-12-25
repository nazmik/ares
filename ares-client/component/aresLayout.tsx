"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Spin } from "antd";
import dotenv from "dotenv";
import { jwtVerify } from "jose";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const secretToken = process.env.ACCESS_SECRET_TOKEN || "default_secret";

  console.log("process.env.ACCESS_SECRET_TOKEN", secretToken);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = await jwtVerify(
            token,
            new TextEncoder().encode(secretToken)
          );
          console.log("Token verified successfully:", decodedToken);
          setIsLoading(false);
        } catch (error) {
          console.error("Token verification failed:", error);
          router.push("/login");
        }
      } else {
        console.log("No token found");
      }
    };

    verifyToken();
  }, [router, secretToken]);

  return isLoading ? <Spin fullscreen /> : children;
};
