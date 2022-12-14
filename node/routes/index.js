const express = require("express");
const router = express.Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params)=>{

    const {speakerService} = params;
//routes that can open in browser 
    router.get('/',async (request,response) =>{

        //the below code was added to test weather the cookie session is working
        if(!request.session.visitcount){
            request.session.visitcount = 0;
        }
        request.session.visitcount +=1;
        console.log(`visitors : ${request.session.visitcount}`);

        const topSpeakers = await speakerService.getList();
        const artworks = await speakerService.getAllArtwork();
        console.log(topSpeakers);
        response.render('layout',{pageTitle:'welcome',template:'index',topSpeakers,artworks});
    });

    router.use('/speakers',speakersRoute(params));
    router.use('/feedback',feedbackRoute(params));

    return router;
}