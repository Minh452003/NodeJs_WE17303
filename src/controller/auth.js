import User from "../model/user";
import { userSchema } from "../schemas/auth";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const body = req.body;
        const { error } = userSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        };
        const userExit = await User.findOne({ email });
        if (userExit) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        data.password = undefined;

        return res.status(200).json({
            message: "Đăng ký thành công!",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}