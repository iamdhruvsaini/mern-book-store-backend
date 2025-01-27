const express=require("express");
require('dotenv').config()
const cors=require("cors");
const app=express();
const port=process.env.PORT||3000;
const mongoose=require("mongoose")
const bookRoutes=require("./src/books/book.route")
const orderRoutes = require("./src/orders/order.route");
const userRoutes=require("./src/user/user.route")
const adminRoutes=require("./src/stats/admin.stats")
const path=require('path')

app.use(cors({
    origin: ["http://localhost:5173","https://mern-book-store-frontend-eight.vercel.app"],
    credentials: true,
  }));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'src', 'books','uploads')));
app.use("/api/books/", bookRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/auth/", userRoutes);
app.use("/api/admin/", adminRoutes);


async function main(){
   await mongoose.connect(process.env.DB_CONNECTION);
   app.use("/",(req,res)=>{
    res.send("Books Store Server is Running !")
   })
}

app.listen(port,()=>{
    console.log("App is listening on port",port);
    main()
    .then(()=>console.log("Mongoose connected sucessfully"))
    .catch(()=>console.log("Some Error Occured"));  
})
