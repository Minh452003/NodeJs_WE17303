import User from "../model/user";
import { userSchema, signInSchema } from "../schemas/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signInSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại!",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không khớp"
            });
        }
        const token = jwt.sign({ id: user._id }, "minh", { expiresIn: "1d" });
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        })
    } catch (error) {
    }
};