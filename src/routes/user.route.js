import express from "express";
import * as userController from '../controllers/user.controller.js'

const router = express.Router();


router.get('/login', userController.renderLogin);
router.get('/signup', userController.renderSignup);
router.get('/', userController.renderHome);
router.get('/logout', userController.renderLogout);

router.post('/signup', userController.signup);
router.post('/login', userController.logIn);

export default router;