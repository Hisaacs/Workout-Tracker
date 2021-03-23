const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
require('dotenv').config()
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// morgon logs each action we take on server
app.use(logger("dev"));

// allow access to public folder when it runs on server(localhost)
app.use(express.static("public"));

// htmlroutes
app.use(require("./routes/htmlRoutes"));

// api routes
app.use(require("./routes/apiRoutes.js"));

mongoose.connect(process.env.MONGODB_DSN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
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