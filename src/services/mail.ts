const sendgrid = require('@sendgrid/mail');
const fs = require('fs');
const template = require('../utils/template');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

interface IMailParams {
  to: string;
  subject: string;
  from: string;
  text: string;
  templateFile: string;
  templateData: object;
  attachments: Array<string>;
}

export default {
  sendMail: async (params: IMailParams) => {
    const msg = {
      to: params.to,
      from: 'jeque.developer@gmailcom',
      subject: params.subject,
      text: params.text,
      html: template.compileHtmlData(
        fs.readFileSync(`./resources/templates/mail/${params.templateFile}`, 'utf-8'),
        params.templateData
      ),
      attachments: params.attachments,
    };

    return await sendgrid.send(msg);
  },
};
