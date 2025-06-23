import Apiresponse from '../utils/Apiresponse.js';
import {Router} from 'express';
import asynchandler from '../utils/asynchandler.js';
//import asynchandler from '../utils/asynchandler';

const checkhealth = asynchandler (async(req, res) => {
    return res.status(200).json(new Apiresponse(200, 'Server is running', {status: 'OK'}));

})
export {checkhealth};