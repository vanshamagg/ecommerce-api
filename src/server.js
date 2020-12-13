const express = require("express");
const { logger } = require("./controllers/primary");
const db = require("./models/database");
const homeRouter = require("./routes/home");
const productRouter = require("./routes/product");
const authRouter = require('./routes/auth');
const userRouter = require("./routes/user");
const path = require("path");
require("colors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "products.html"));
});
// Mounted Routes
app.use("/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/", homeRouter);

app.listen(PORT, () => console.log(`Sever Started At Port ${PORT}`.bold.blue));
