import express from "express";
import {registerController, loginController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';


const router = express.Router();

//routing
//REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

//forgot password
router.post('/forgot-password', forgotPasswordController)

//Protected route user-auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
//Protected route admin-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update user profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all-orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


export default router