import express from "express";
import {addProducts, deleteProducts, getProducts, updateProducts} from "../controllers/products.js";

const router = express.Router()

router.get("/", getProducts)

router.post("/add", addProducts)

router.post("/update/:id", updateProducts)

router.delete("/delete/:id", deleteProducts)

export default router