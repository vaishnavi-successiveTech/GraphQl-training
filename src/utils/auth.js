import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const generateToken = (user) => {
    // console.log("user role", user);
  const token = jwt.sign(
    { id: user._id, email: user.email ,role: user.role},
    "MY_SECRET_KEY",
    { expiresIn: "1h" }
  );
  console.log("user token", token.role);
  return token;
};

// export const verifyToken = async (token) => {
//   try {
//     const decoded = jwt.verify(token, "MY_SECRET_KEY");
//     const user = await User.findById(decoded.id);
//     return user;
//   } catch (err) {
//     return null;
//   }
// };