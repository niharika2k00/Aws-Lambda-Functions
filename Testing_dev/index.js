
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });
const { getUsingQuery, getUsingParams } = require("./helper");
const BASE_URL = "https://c6mnjtr663.execute-api.eu-west-1.amazonaws.com";


exports.handler = async (event) => {
  // TODO implement
  console.log("EVENT = ", event);

  var obj = {
    message: "Happy Coding!",
    author: "Niharika Dutta",
    gender: "Female",
    // event: event
  };

  const response = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ message: 'Happy Coding!', author: 'Niharika Dutta' }),
    body: JSON.stringify(obj),
  };

  console.log(event.num1);
  var res = event.num1 + event.num2;
  console.log("Summation of both the number : ", res);
  console.log("LAMBDA ==> ", lambda.endpoint);

  // ====================================================================================
  /* aws-sdk supports promises through a promise() property on the object returned from most API methods
       let res=await lambda.invoke(params).promise();           
            Syntax : invoke(params = {}, callback) ⇒ AWS.Request */
  var name = "Niharika";
  const params = {
    FunctionName: "createUserFunction", // Lambda func to invoke
    Payload: JSON.stringify({ name: name }),
  };

  try {
    let response = await lambda.invoke(params).promise();
  } catch {
    console.log("Error Spotted");
  }


  // ============================
  //  /dev/author?name=Henry&city=Switzerland
  // ============================
  if (event.path?.includes("/author") && event.httpMethod == "GET") {
    try {
      const res = getUsingQuery(event);
      var result = {
        statusCode: 200,
        body: JSON.stringify(res),
      };
      return result;
    } catch (err) {
      var errObj = {
        statusCode: 500,
        body: JSON.stringify({ "Error Message:": err.message }),
      };
      return errObj;
    }
  }

  // =======================
  //  /dev/id/125485
  // =======================
  if (event.path?.includes("/id") && event.httpMethod == "GET") {
    try {
      const res = getUsingParams(event);
      var result = {
        statusCode: 200,
        body: JSON.stringify(res),
      };
      return result;
    } catch (err) {
      var errObj = {
        statusCode: 500,
        body: JSON.stringify({ "Error Message:": err.message }),
      };
      return errObj;
    }
  }




  return response;
};



/* 
{
  "num1" : 4,
  "num2" : 10
 }
*/
