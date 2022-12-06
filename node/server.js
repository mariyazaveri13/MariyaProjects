const express =require("express");
//we use path to specify the path in app.get
const path = require('path');
const routes =require('./routes');
const cookieSession = require('cookie-session');
//we re creating an instance here, express is a function
const app = express();

//usually ports start from 3000 in express
const port = 3000;

//below code is for cookie session
//trust proxy is necessary because on prod cookie wont work
app.set('trust proxy',1);

//we installed cookie-session package for tracking the specific 
app.use(cookieSession({
    name:'session',
    keys:['ghvasd756','hhgs789b']
}));

const FeedbackService = require("./services/FeedbackService");
const SpeakerService = require("./services/SpeakerService");

const feedbackService = new FeedbackService("./data/feedback.json");
const speakerService = new SpeakerService("./data/speakers.json");
//here app.set is specifically used for using template engine. 
//for this course we're using ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

//whenever we have a use function that means its a middleware
//here it points to the static folder
app.use(express.static(path.join(__dirname,'./static')));

//routes is a function that we defined in index.js hence we put in the paranthesis
//what we did below is called mounting
app.use('/',routes({
    feedbackService,
    speakerService
}));


//start server
app.listen(port,()=>{
    console.log(`express running on port ${3000}`);
});