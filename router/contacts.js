const express = require("express");

//컨트롤러에 작성한 api함수 가져오기
const {
  Allcontacts,
  createContact,
  updateContact,
  deleteContact,
  searchContact,
} = require("../controllers/contacts");

const router = express.Router();

router
  .route("/")
  .get(Allcontacts)
  .post(createContact)
  .put(updateContact)
  .delete(deleteContact);

router.route("/search").get(searchContact);
module.exports = router;
