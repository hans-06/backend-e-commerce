import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getKeyController, getProductController, getSingleProductController, paymentCheckoutController, paymentVerificationController, productCategoryController, productCountController, productFiltterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from './../controllers/productController.js';
import formidable from "express-formidable";

const router = express.Router();

// Routes

//create product
router.post(
  "/create-product",
  requireSignIn,
    isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all products
router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:slug", getSingleProductController);

//get photo
router.get("/get-photo/:id", productPhotoController)

//delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//product filter
router.post("/product-filters", productFiltterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//product search
router.get("/search/:keyword", searchProductController);

//similar Products
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise Product
router.get("/product-category/:slug", productCategoryController);

//razorpay payment checkout
router.post("/checkout", requireSignIn, paymentCheckoutController);

//razorpay payment verifiacation
router.post("/verification", paymentVerificationController);

//getting dashboard key
router.get("/getKey", getKeyController);

export default router;
