const express = require("express");
const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  favoriteValidateStatus,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", authenticate, isValidId, ctrl.remove);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  favoriteValidateStatus,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
// 583bacb0-293e-42fb-9675-f4fb63444354
// 956154
// CFE2439427E8B0D1086D293FEF578E74DFCAC76B2E4DD394CA94947EB694A5805B86F0C0657502E4779557E65DD3026F