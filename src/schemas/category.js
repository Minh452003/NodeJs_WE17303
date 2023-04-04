import Joi from "joi";
export const CategorySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Tên danh mục không được để trống",
        "any.required": "Trường tên danh mục là bắt buộc",
    }),
})