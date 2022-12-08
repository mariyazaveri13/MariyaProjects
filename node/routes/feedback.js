const express = require("express");
const {check,validationResult} = require("express-validator");

const router = express.Router();
const validations = [
    check('name')
    .trim()
    .isLength({min:3})
    .escape()
    .withMessage('A name is required'),

    check('email')
    .trim()
    .isEmail()
    .escape()
    .normalizeEmail()
    .withMessage('Mail is required'),

    check('title')
    .trim()
    .isLength({min:3})
    .escape()
    .withMessage('Title required'),
];

module.exports = (params) =>{

    const {feedbackService} = params;

    router.get('/',async (request,response)=>{
        const feedback = await feedbackService.getList();
        const errors = request.session.feedback ? request.session.feedback.errors : false;
        const successMessage = request.session.feedback ? request.session.feedback.message : false;

        request.session.feedback ={};
        return response.render('layout',{
            pageTitle:'Feedback',
            template:'feedback',
            feedback,
            errors,
            successMessage,
        });
    });




    router.post('/',validations,
    async(request,response)=>{

        const errors = validationResult(request);

        if(!errors.isEmpty()){
            request.session.feedback ={
                errors: errors.array(),
            };
            return response.redirect('/feedback');
        }

        const { name,email,title,message } =request.body;
        await feedbackService.addEntry(name,email,title,message );
        request.session.feedback = {
            message : 'Thank you for your message'
        }
        return response.redirect('/feedback');
    });


    router.post('/api',validations,async (request,response) =>{

        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.json({errors:errors.array()});
        }
        const { name,email,title,message } =request.body;
        await feedbackService.addEntry(name,email,title,message );

        const feedback = await feedbackService.getList();
        return response.json({feedback});
    });

    return router;
}
