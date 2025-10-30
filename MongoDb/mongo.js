const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://vikasshekhawat7778_db_user:OYGFc4tR2ABZkhKS@cluster12.k8c2gnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12",{
    family:4,
})
.then(()=>console.log("Mongo DB Connected Successfully"))
.catch((err)=>console.log("Mongo Db not Connected",err))
// OYGFc4tR2ABZkhKS
// vikasshekhawat7778_db_user