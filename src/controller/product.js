import Joi from "joi";
import Product from "../model/product";


const productsChema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number()
})

export const getAll = async (req, res) => {
    // const { data } = await axios.get("http://localhost:3000/products");
    const data = await Product.find();
    return res.json(data);
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        // const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        const data = await Product.findOne({ _id: id });
        if (data.length === 0) {
            return res.status(400).json({
                message: "Không có sản phẩm",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const creat = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productsChema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            })
        }
        // const { data } = await axios.post("http://localhost:3000/products", body);
        const data = await Product.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            })
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công!",
            data,
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
        // await axios.delete(`http://localhost:3000/products/${id}`);
        const data = await Product.findByIdAndDelete(id);
        return res.status(400).json({
            message: "Xoá sản phẩm thành công!"
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
        const { error } = productsChema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }
        // const { data } = await axios.patch(`http://localhost:3000/products/${id}`, body);
        const data = await Product.findOneAndUpdate({ _id: id }, body, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            })
        }
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công!",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }

};


