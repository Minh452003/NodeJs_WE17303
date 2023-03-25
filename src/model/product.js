import { string } from "joi";
import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: Number,
});
export default mongoose.model("Product", productsSchema);