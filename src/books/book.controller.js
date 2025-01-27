const Book = require("./book.model");

const postBook=async(req,res)=>{
    
    const { title, description, category, trending, oldPrice, newPrice } = req.body;
    const coverImage = req.file ? req.file.filename : null;  // Get the filename from Multer's req.file
    
    try{
        const newBook = new Book({
            title,
            description,
            category,
            trending,
            oldPrice,
            newPrice,
            coverImage, // Use the filename from req.file
          });
        await newBook.save();
        res.status(201).send({msg:"Book Created Successfully",book:newBook});      
    }catch(error){
       console.log("Error in Creating Book",error);
       res.status(500).send({message:"Failed to Create Book"});
    }
}

const getBook=async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1});
        res.status(201).send(books);      
    }catch(error){
       console.log("Error in Fetching Book",error);
       res.status(500).send({message:"Failed to Fetch Book"});
    }
}

const getSingleBook=async(req,res)=>{
    try{
        const id=req.params.id;
        const book=await Book.findById(id);
        if(!book){
            return res.status(404).send({message:"Book Not Found"});
        }
        else{
            res.status(201).send(book);      
        }
    }catch(error){
       console.log("Error in Fetching Book",error);
       res.status(500).send({message:"Failed to Fetch Book"});
    }

}

const updateBookData=async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedBook=await Book.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedBook){
            return res.status(404).send({message:"Book Not Found"});
        }
        res.status(201).send({msg:"Book Updated Successfully",book:updatedBook});
    }
    catch(error){
        console.log("Error Updating a Book",error);
        res.status(500).send({message:"Failed to Fetch Book"});
     }
}

const deleteBook=async(req,res)=>{
    try{
        const id=req.params.id;
        const deleteBook=await Book.findByIdAndDelete(id);
        if(!deleteBook){
            return res.status(404).send({message:"Book Not Found"});
        }
        res.status(201).send({msg:"Book Deleted Successfully",book:deleteBook});
    }
    catch(error){
        console.log("Error Deleting a Book",error);
        res.status(500).send({message:"Failed to Fetch Book"});
    }
}
module.exports={postBook,getBook,getSingleBook,updateBookData,deleteBook};