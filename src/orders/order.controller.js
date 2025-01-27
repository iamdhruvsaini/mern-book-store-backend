const  order  = require("./order.model");

const createAOrder=async(req,res)=>{
    try {
        const newOrder=await order(req.body)
        const savedOrder=await newOrder.save(); 
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error Creating A order ",error);
        res.status(500).json({msg:"Failed to create order"});
    }

}
const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        // Validate email
        if (!email) {
            return res.status(400).json({ msg: "Email parameter is required" });
        }

        // Fetch orders by email
        const orders = await order.find({ email }).sort({ createdAt: -1 });

        // Check if any orders were found
        if (orders.length === 0) {
            return res.status(404).json({ msg: "Order Not Found" });
        }

        // Respond with the orders
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error Fetching the order ", error);
        res.status(500).json({ msg: "Failed to Fetch order" });
    }
};

const cancelOrder=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({ msg: "Id parameter is required" });
        }
        const deleteResult=await order.deleteOne({_id:id});
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ msg: "Order not found or already deleted" });
          }
      
          // Respond with success
        return res.status(200).json({ msg: "Order deleted successfully" });
    }catch(error){
        console.error("Error Deleting the order", error);
        res.status(500).json({ msg: "Failed to Delete order" });

    }

}




module.exports={createAOrder,getOrderByEmail,cancelOrder};