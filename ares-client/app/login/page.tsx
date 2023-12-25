"use client";

import { User, login } from "@/helpers/auth/login";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const About = () => {
  const router = useRouter();
  const handleLogin = async () => {
    await login("Rinor", "rkas").then((user) => {
      localStorage.setItem("token", user.tokens.accessToken);
    });
  };
  const user = useContext(User);

  console.log("haha");
  return (
    <div
      onClick={async () => {
        await handleLogin();
        router.push("/");
      }}
    >
      clickme
    </div>
  );
};

export default About;
