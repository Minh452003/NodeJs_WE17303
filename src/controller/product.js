import Product from "../model/product";
import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
})

export const getAll = async (req, res) => {
    try {
        const data = await Product.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findById(id);
        if (data === 0) {
            return res.status(400).json({
                message: "Hiện sản phẩm thất bại",
            })
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productSchema.validate(body);
        if (error) {
            return res.status(200).json({
                message: error.details[0].message,
            })
        }
        const data = await Product.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại"
            })
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xoá sản phẩm thành công",
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { error } = productSchema.validate(body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const data = await Product.findByIdAndUpdate({ _id: id }, body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            })
        }
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}