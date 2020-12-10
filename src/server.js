const express = require("express");
const { logger } = require("./controllers/primary");
const db = require("./models/database");
const productRouter = require("./routes/product");
const path = require("path");

require("colors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "products.html"));
});
// routes
app.use("/api/product", productRouter);

app.listen(PORT, () => console.log(`Sever Started At Port ${PORT}`.bold.blue));
