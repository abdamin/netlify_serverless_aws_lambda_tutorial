exports.handler = function(event, context, callback) {
  //import sendgrid mail npm package
  const sgMail = require("@sendgrid/mail");

  //only listen to POST requests
  if (event.httpMethod === "POST") {
    //set sendgrid API Key which you created on the dashboard under settings
    sgMail.setApiKey(process.env.API_KEY);

    //get arguments from event body
    const { to, subject, message } = JSON.parse(event.body);

    //configure email
    const email = {
      to: to,
      from: "test@example.com",
      subject: subject,
      text: message,
      html: `<strong>${message}.</strong>`
    };
    sgMail
      .send(email)
      .then(response => {
        console.log(response);

        //return successful response
        callback(null, {
          statusCode: 200,
          //to enable cors on local development when we test our client
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept"
          },
          body: JSON.stringify({ result: "success" })
        });
      })
      .catch(error => {
        console.log(error);

        //return error object with status 400
        callback(null, {
          statusCode: 400,
          //to enable cors on local development when we test our client
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept"
          },
          body: JSON.stringify(error)
        });
      });
  } else {
    callback(null, {
      statusCode: 400,
      //to enable cors on local development when we test our client
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: {}
    });
  }
};
