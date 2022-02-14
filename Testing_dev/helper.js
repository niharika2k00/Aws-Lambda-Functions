const getUsingQuery = (event) => {
  var name = event.queryStringParameters?.name;
  if (!name) throw new Error("Error Detected...oops!!");

  var obj = {
    message: "success",
    author_name: name,
    city: event.queryStringParameters?.city,
  };

  return obj;
};

const getUsingParams = (event) => {
  let id = event.pathParameters.id;

  if (!id) throw new Error("Error Detected...oops!!");

  if (id) {
    var obj = {
      message: "success",
      ID: id,
      httpMethod: event.httpMethod,
      path: event.path,
      resource: event.resource,
    };
  }
  return obj;
};

module.exports = { getUsingQuery, getUsingParams };
// export { getUsingQuery };
