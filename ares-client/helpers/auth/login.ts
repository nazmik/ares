import { UserContext } from "@/types/user/user";
import { createContext, useContext } from "react";

export const User = createContext<UserContext>({
  user: undefined,
  updateUser: () => {},
});

export const login = async (name: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8190/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      return data;
    } else {
      throw new Error("Failed to log in");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// export const userStore = useContext(User);
