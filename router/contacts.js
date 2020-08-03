const express = require("express");

const {
  getAllcontacts,
  createContact,
  updateContact,
  deleteContact,
  searchContact,
} = require("../controllers/contacts");

const router = express.Router();

router
  .route("/")
  .get(getAllcontacts)
  .post(createContact)
  .put(updateContact)
  .delete(deleteContact);

router.route("/search").get(searchContact);
module.exports = router;
