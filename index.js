import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import router from "./src/routes/products.js";
import routerUser from "./src/routes/users.js";
import routerCategory from "./src/routes/categories.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", routerUser);
app.use("/api", routerCategory);

app.listen(8080, async () => {
    await mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Server is running 8080");
});


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import router from "./routes/products";
// import routerUser from "./routes/users";
// import routerCategory from "./routes/categories"
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api", router);
// app.use("/api", routerUser);
// app.use("/api", routerCategory);
// mongoose.connect("mongodb://127.0.0.1:27017/Ass_Type");

// export const viteNodeApp = app;