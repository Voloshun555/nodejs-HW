const express = require("express");
const { validateBody, authenticate, validateSubscription, upload} = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken",ctrl.verify)

router.post("/verify", validateBody(schemas.userEmailSchema), ctrl.resendVerify)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)

router.patch("/", authenticate, validateSubscription(schemas.subscriptionSchema), ctrl.changeSubscription);

router.patch("/avatar", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;
