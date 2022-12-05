const express =require("express");
//we use path to specify the path in app.get
const path = require('path');
//we re creating an instance here, express is a function
const app = express();

//usually ports start from 3000 in express
const port = 3000;

//whenever we have a use function that means its a middleware
//here it points to the static folder
app.use(express.static(path.join(__dirname,'./static')));

//routes that can open in browser 
app.get('/',(request,response) =>{
    response.sendFile(path.join(__dirname,'./static/index.html'));
});

app.get('/speakers',(request,response) =>{
    response.sendFile(path.join(__dirname,'./static/speakers.html'));
});

//start server
app.listen(port,()=>{
    console.log(`express running on port ${3000}`);
});