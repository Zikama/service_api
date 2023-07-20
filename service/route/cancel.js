const { asyncWrapper } = require("../middleware");


router.post('/', asyncWrapper(async(req,res)=> {
    const { title, body } = req.body;
    console.log(body);

    // check for session cookies 
    // check if website is supported 
    // if website is not supported send a response 
    // if website is suported carry out tested actions
    // if scheduled set eventbridge for actions

}))