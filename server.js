const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
require('dotenv').config()

const app = express();


const PORT = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));


app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected");
});

// routesapp.use(require("./routes/api-routes.js"));app.use(require("./routes/html-routes.js"));
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}! Visit http://localhost:${PORT}/ in your browser`);
});