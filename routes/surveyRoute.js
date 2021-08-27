// const _ = require("lodash");
// const { Path } = require("path-parser");
// const { URL } = require("url");
// const mongoose = require("mongoose");
// const requireLogin = require("../middlewares/requireLogin");
// const requireCredits = require("../middlewares/requireCredits");
// const Mailer = require("../services/Mailer");
// const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
// // val thanksTemplate = require("../services/emailTemplates/thanksTemplate");

// const Survey = mongoose.model("surveys");

// module.exports = (app) => {
//   app.get("/api/surveys", requireLogin, async (req, res) => {
//     const surveys = await Survey.find({
//       _user: req.user.id,
//     }).select({ recipients: false });
//     res.send(surveys);
//   });

//   app.get("/api/surveys/:surveyId/:choice", (req, res) => {
//     res.sendFile("thanksTemplate.html", { root: __dirname });
//   });
//   // app.get("/api/surveys/thanks", (req, res) => {
//   //   res.send("Thanks for voting!");
//   // });

//   app.post("/api/surveys/webhooks", (req, res) => {
//     const p = new Path("/api/surveys/:surveyId/:choice");

//     const event = _.chain(req.body)
//       .map(({ email, url }) => {
//         const match = p.test(new URL(url).pathname);
//         if (match) {
//           return {
//             email,
//             surveyId: match.surveyId,
//             choice: match.choice,
//           };
//         }
//       })
//       .compact()
//       .uniqBy("email", "surveyId")
//       .each(({ email, surveyId, choice }) => {
//         Survey.updateMany(
//           {
//             _id: surveyId,
//             recipients: {
//               $elemMatch: { email: email, responded: { $ne: true } },
//             },
//           },
//           {
//             $inc: { [choice]: 1 },
//             //Mongo operator inc:increment
//             $set: { "recipients.$.responded": true },
//             lastResponded: new Date(),
//           }
//         ).exec();
//       })
//       .value();
//     console.log(event);
//     res.send({});
//   });

//   app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
//     const { title, subject, body, recipients } = req.body;

//     const survey = new Survey({
//       title,
//       subject,
//       body,
//       recipients: recipients
//         .split(",")
//         .map((email) => ({ email: email.trim(), responded: false })),
//       _user: req.user.id, //property that is available to us on any Mangus model
//       dateSent: Date.now(),
//     });
//     //send an email
//     const mailer = new Mailer(survey, surveyTemplate(survey));
//     try {
//       await mailer.send();
//       await survey.save();
//       req.user.credits -= 1;
//       const user = await req.user.save();

//       res.send(user);
//     } catch (err) {
//       res.status(422).send(err);
//     }
//   });
// };
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose"); // requiring Mongoose to access Mongoose model classes
const requireLogin = require("../middlewares/requireLogin.js"); // to make sure user is logged in
const requireCredits = require("../middlewares/requireCredits.js"); // to make sure that user has enough credits

// Importing mailer and email templates
const Mailer = require("../services/mailer.js");
// const template = require("../services/templates/template.js");
const template = require("../services/emailTemplates/template");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  // Loading properties available in user dashboard
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    }); // find all surveys by user
    res.send(surveys);
  });

  // Redirect user to new route with new message after feedback is submitted
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for the feedback!");
  });

  // Getting feedback from SendGrid via webhooks
  app.post("/api/surveys/webhooks", (req, res) => {
    // const events = _.map(req.body, (event) => {
    //   const pathname = new URL(event.url).pathname; // retrieves path of URL that has been clicked
    //   const pathHelper = new Path("/api/surveys/:surveyId/:choice"); // extracts survey ID and choice (ie. yes/no)
    //   const match = pathHelper.test(pathname);
    //   if (match) {
    //     return { email: event.email, surveyId: match.surveyId, choice: match.choice };
    //   };
    // });

    // refactoring with Lodash chain helper
    const pathHelper = new Path("/api/surveys/:surveyId/:choice"); // extracts survey ID and choice (ie. yes/no)

    const uniqueEvent = _.chain(req.body)
      .map((event) => {
        const match = pathHelper.test(new URL(event.url).pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact() // "compact" - takes an array and removes any elements within the array that is undefined
      .uniqBy("email", "surveyId") // "uniqBy" - removes duplicates in the "email" and "surveyId" properties
      .each((event) => {
        Survey.updateOne(
          {
            _id: surveyId, // MongoDB assigns "_id" instead of "id"
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 }, // $inc = increment (MongoDB syntax) / increment "choice" property by 1
            $set: { "recipients.$.responded": true }, // $set = update (MongoDB syntax) / recipients.$ = specific recipient
            lastResponded: new Date(),
          }
        );
      })
      .exec() // executes the function and sends it to the database
      .value();

    console.log(uniqueEvent);
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title, // ES2016 - title: title
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim(), responded: false })), // email is now an array of objects instead of an array of strings
      _user: req.user.id, // autogenerated by Mongoose in MongoDB
      dateSent: Date.now(),
    });

    // Send email after survey has been created
    const mailer = new Mailer(survey, template(survey));

    try {
      // try block: catches any requests and sends back a response
      await mailer.send();
      await survey.save();
      req.user.credits -= 1; // deduct credits after email has been sent
      const user = await req.user.save();
      res.send(user); // send back user model with updated number of credits
    } catch (error) {
      res.status(422).send(error); // error 422: user request is incorrect
    }
  });
};
