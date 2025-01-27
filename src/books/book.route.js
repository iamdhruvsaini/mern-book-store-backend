const express=require("express");
const { postBook, getBook, getSingleBook,updateBookData,deleteBook} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdmin");
const router=express.Router();
const path=require('path')


//MULTER 
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null,  path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      return cb(null,uniqueSuffix + '-' + file.originalname)
    }
  })

  const upload = multer({ storage: storage })


// Add books
router.post("/create-book",verifyAdminToken, upload.single("coverImage"),postBook).get("/",getBook).get("/:id",getSingleBook).put("/edit/:id",verifyAdminToken,updateBookData).delete("/:id",verifyAdminToken,deleteBook);


// Get all books
module.exports=router;
