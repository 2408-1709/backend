const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const setRoute = require("./Routes/users1");
const ProductsRoute = require("./Routes/Products");
const CartRoute = require("./Routes/cart");
const EnquiryRoute = require("./Routes/enquries");
const FeedbackRoute = require("./Routes/feedbacks");
const ReplyRoute = require("./Routes/Reply");
const OrderRoute = require("./Routes/orderss");
const AdminRoute = require("./Routes/admin");
const WishRouter = require("./Routes/wishList");
require("./MongoDb/mongo")

const Server = express();

Server.use(cors({origin:"*"}));
Server.use(bodyParser.json());
Server.use(express.json());

Server.use("/sendUsers",setRoute)
Server.use("/ProductDetails",ProductsRoute)
Server.use("/Carts",CartRoute)
Server.use("/EnquiryDetails",EnquiryRoute)
Server.use("/FeedbackDetails",FeedbackRoute)
Server.use("/RelyDetails",ReplyRoute)
Server.use("/OrderDetails",OrderRoute)
Server.use("/AdminDetails",AdminRoute)
Server.use("/WishlistDetails",WishRouter)
const port = 7000;
Server.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
