const express = require("express");
const router = express.Router();

module.exports = (params)=>{

    const {speakerService} = params;

    router.get('/',async (request,response) =>{
        const speakers = await speakerService.getList();
        const artworks = await speakerService.getAllArtwork();
        response.render('layout',{pageTitle:'welcome',template:'speakers',speakers,artworks})
    });

    router.get(`/:shortname`,async (request,response) =>{
        const speakerDetails = await speakerService.getSpeaker(request.params.shortname)
        const speakerArtwork = await speakerService.getArtworkForSpeaker(request.params.shortname);
        console.log(speakerArtwork);
        response.render('layout',{pageTitle:'welcome',template:'speaker-detail',speakerDetails,speakerArtwork})
    });

    return router;
}