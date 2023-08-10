const express = require("express");
const { validateBody, authenticate, validateSubscription } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)

router.patch("/", authenticate, validateSubscription(schemas.subscriptionSchema), ctrl.changeSubscription);

module.exports = router;
