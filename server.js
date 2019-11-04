var express=require("express");
var PORT = process.env.PORT || 9000;
var app = express();

//serve the static content for the app from "public" directory
// in the application directory

app.use(express.static("public"));

// Parse Application body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

//Import routes and give the server access to them
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

//Start our server so that it can begin listening to client requests
app.listen(PORT, function(){
    console.log("Server listening on: https://localhost:" + PORT);
});