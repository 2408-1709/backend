const express = require("express")
const ProductData = require("../Schema/productsapi")
const ProductsRoute = express.Router()
ProductsRoute.post("/SendProducts", async (req, res) => {
    try {
        const usersss = new ProductData(req.body);
        console.log("New User Data:", usersss);

        const saveddata = await usersss.save();

        res.status(201).json({
            message: "User signup successfully",
            user: saveddata,
        });
    } catch (error) {
        console.error("Error while saving user:", error);
        res.status(500).json({
            message: "Error while saving user data",
            error: error.message,
        });
    }
});
ProductsRoute.get("/getProducts", async (req, res) => {
    try {
        const alldata = await ProductData.find({});
        res.status(200).json({
            count: alldata.length,
            users: alldata,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "Error fetching users data",
            error: error.message,
        });
    }
});
ProductsRoute.get("/getProducts/:productname", async (req, res) => {
    try {
        const { productname } = req.params;
        const product = await ProductData.findOne({ productname: productname });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product by name",
            error: error.message,
        });
    }
});



module.exports = ProductsRoute