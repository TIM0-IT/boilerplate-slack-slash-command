'use strict';
import express from 'express'
import { isAuth } from '../lib/middleware'
import { slackParser, slackFormatter }  from '../lib/slack'
import colors from '../config/colors'

const router =  express.Router();

/*
 * @desc The post route of the default route
 */
router.post('/', isAuth, function(req, res) {

    // This is where the magic happens

    const data = slackParser(req.body);
    const format = new slackFormatter();

    // Format the message
    format.setText(`${data.userName} this is a working test`);
    format.isTemporary(true);
    format.addAttachment(colors.green, "title", "text", {});

    // Return the message with the code status 200
    res.status(200).json(format.getPayload());
});

export default router;