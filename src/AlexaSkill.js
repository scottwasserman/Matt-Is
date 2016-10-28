/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: ""
 *  Alexa: ""
 */

 /**
  * This was hacked from part of the sample alexa skills
  */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleHelpRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "RecordBloodPressureReadingIntent": function (intent, session, response) {
        handleRecordBloodPressureReadingRequest(intent,response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        handleHelpRequest(response);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleHelpRequest(response) {
    //response.ask("I need two blood pressure readings, systolic and diastolic, please tell me your blood pressure with both numbers.?", "What can I help you with?");
    response.ask("I need two blood pressure readings, systolic and diastolic, please tell me your blood pressure with both numbers.");
}

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleRecordBloodPressureReadingRequest(intent,response) {
    // Get a random space fact from the space facts list


    if ((intent.slots && intent.slots.Systolic && intent.slots.Systolic.value) && (intent.slots && intent.slots.Diastolic && intent.slots.Diastolic.value)) {
       console.log("Found " + intent.slots.Systolic.value + " over " + intent.slots.Diastolic.value);
       
    var http = require('http');
var querystring = require('querystring');
    
    var post_data = querystring.stringify({
      'systolic' : intent.slots.Systolic.value,
      'diastolic': intent.slots.Diastolic
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'alexaphillyhack.herokuapp.com',
      port: '80',
      path: '/api/readings',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          var speechOutput;
          
          if (intent.slots.Systolic.value > 180) {
              speechOutput = "if you're reading was " + intent.slots.Systolic.value + " over " + intent.slots.Diastolic.value + " you should go to the emergency room. Can I call you an ambulance?"
          }
          else {
              if (intent.slots.Systolic.value < 120) {
              //speechOutput = "got " + intent.slots.Systolic.value + " over " + intent.slots.Diastolic.value;
              speechOutput = "you're reading of " + intent.slots.Systolic.value + " over " + intent.slots.Diastolic.value + " is Normal";
              }
              else {
                speechOutput = "you're reading of " + intent.slots.Systolic.value + " over " + intent.slots.Diastolic.value + " is Prehypertensive";
                
              }
          }
          
          
        response.tell(speechOutput);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();


    
        
    }
    else {
        console.log("Couldn't find both numbers");
        handleHelpRequest(response);
    }

   
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

