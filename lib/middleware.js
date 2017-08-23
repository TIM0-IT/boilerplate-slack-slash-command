'use strict';
import { slackParser, slackFormatter }  from './slack'
import colors from '../config/colors'
import constants from '../config/constants'

/*
 * @desc Check if the request is come from Slack with the right token
 * @see config/constants.json
 * @param object req - Is the request object
 * @param object res - Is the response object
 * @param func next - The function to continue on the next middleware or route
 */
function isAuth(req, res, next) {
    const data = slackParser(req.body);
    const format = new slackFormatter();

    if (data.token !== constants.slack.token) {
        format.setText(`Sorry ${data.userName} you cannot access the service`);
        format.isTemporary(true);
        format.addAttachment(colors.red, null, 'Bad token', null);
        res.status(200).json(format.getPayload()); // Return 200 instead 401 because Slack won't display the response to te user
    }
    else {
        next(); // Allow the request to continue to the next middleware or the ain route
    }
}

export {
    isAuth
}