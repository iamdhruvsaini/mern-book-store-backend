const express=require("express");
const { createAOrder, getOrderByEmail, cancelOrder } = require("./order.controller");
const router=express.Router();

//create order endpoints

router.post("/",createAOrder);


//get order by user email
router.get("/email/:email",getOrderByEmail);


//cancel order by orderid
router.delete("/order/:id",cancelOrder);

module.exports = router;
