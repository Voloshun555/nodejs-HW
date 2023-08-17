
// =============================UKR.NET==================================
//  require("dotenv").config();
//  const nodemailer = require("nodemailer");
//  const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env
//  const nodemalerCofig = {
//     host: "smtp.ukr.net",
//     port: 465, //25, 465, 2525
//     secure: true,
//     auth: {
//         user: UKR_NET_EMAIL,
//         pass: UKR_NET_PASSWORD
//     }
//  }

//  const transport = nodemailer.createTransport(nodemalerCofig);
//  const email = {
//     from: UKR_NET_EMAIL,
//     to: "demakoj866@chodyi.com",
//     subject: "Verify email",
//     html: "<p>Hello Ihor</p>"
//  }
//  transport.sendMail(email).then(() => console.log("Email send success")).catch(error => console.log(error.massage))
// =====================================================================



// const ElasticEmail = require('@elasticemail/elasticemail-client');
//  const {ELASTIC_EMAIL_API_KEY} = process.env

// const defaultClient = ElasticEmail.ApiClient.instance;
 
// const {apikey} = defaultClient.authentications;
// apikey.apiKey = ELASTIC_EMAIL_API_KEY
 
// const api = new ElasticEmail.EmailsApi()
 
// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [
//     new ElasticEmail.EmailRecipient("rehin10264@chodyi.com")
//   ],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<p>Verify email</p>"
//       })
//     ],
//     Subject: "Verify email",
//     From: "Voloshunihor@gmail.com"
//   }
// });
 
// const callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };
// api.emailsPost(email, callback);
