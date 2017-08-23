'use strict';
import Constants from '../config/constants'

/*
 * @desc Parse the body received from Slack and return selected data
 * @param object body - The body received
 */
function slackParser(body){
    return {
        token: body.token !== undefined ? body.token : undefined,
        teamID: body.team_id !== undefined ? body.team_id : undefined,
        channelID: body.channel_id !== undefined ? body.channel_id : undefined,
        channelName: body.channel_name !== undefined ? body.channel_name : undefined,
        userID: body.user_id !== undefined ? body.user_id : undefined,
        userName: body.user_name !== undefined ? body.user_name : undefined,
        text: body.text !== undefined ? body.text.replace(/(?:\r\n|\r|\n)/g, ' ').split(' ') : undefined,
        responseUrl: body.response_url !== undefined ? body.response_url : undefined
    };
}

/*
 * @desc This class is used to format message following slack style
 * @see https://api.slack.com/docs/message-formatting
 */
class slackFormatter{
    constructor() {
        this.payload = {
            text: '',
            response_type: '',
            attachments: []
        };
    }

    /*
     * @desc Set the main text of the payload
     * @param String text - The text to send
     */
    setText(text) {
        this.payload.text = text;
    }

    /*
     * @desc Set if the message is temporary display into slack or permanently
     * @see https://api.slack.com/slash-commands#responding_to_a_command
     * @see /config/constants.json
     * @param String text - The text to send
     */
    isTemporary(bool) {
            this.payload.response_type = bool ? Constants.slack.temporaryType : 'in_channel';
    }

    /*
     * @desc Add a new attachment in the payload
     * @param String color - The color of the attachment
     * @param String title - The title of the attachment
     * @param String text - The text of the attachment
     * @param Object fields - The fields of ths attachment
     */
    addAttachment(color, title, text, fields){
        let attach = {
            color: title !== undefined && color != null ? color : '',
            title: title !== undefined && title != null ? title : '',
            text: text !== undefined && text != null ? text : '',
            fields: fields !== undefined && fields != null ? fields : {},
        };

        this.payload.attachments.push(attach)
    }

    /*
     * @desc Return the payload formatted
     * @return Object
     */
    getPayload() {
        return this.payload;
    }
}

export {
    slackParser,
    slackFormatter
}