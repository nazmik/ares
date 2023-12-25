import jwt from "jsonwebtoken";

export const jwtToken = ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  const user = { name, password };
  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN!, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN!, {
    expiresIn: "6m",
  });
  return { accessToken, refreshToken };
};
