const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(__dirname));

const storage = multer.diskStorage({

destination: function(req, file, cb){

if(file.mimetype.startsWith("image")){
cb(null, "images/");
}else{
cb(null, "videos/");
}

},

filename: function(req, file, cb){

let folder = file.mimetype.startsWith("image")
? "images"
: "videos";

let ext = path.extname(file.originalname);

let files = fs.readdirSync(folder);

let numbers = files.map(file => parseInt(file));

numbers = numbers.filter(n => !isNaN(n));

let next = 1;

if(numbers.length > 0){
next = Math.max(...numbers) + 1;
}

cb(null, next + ext);

}

});

const upload = multer({storage});

app.post("/upload", upload.single("file"), (req,res)=>{
res.send("OK");
});

app.listen(3000, ()=>{
console.log("SERVER STARTED");
});