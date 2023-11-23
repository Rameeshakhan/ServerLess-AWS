const AWS = require("aws-sdk")
const {v4} = require("uuid")

const addTodo = async (event) => {
  const {todo} = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const newTodo = {
    id,
    todo,
    createdAt,
    completed : false,
  }

  await dynamodb.put({
    Tablename: "TodoTable",
    Item: newTodo
  })

  return {
    statusCode: 200,
    body: JSON.stringify(
      newTodo
    ),
  };
};

module.exports = {
  handler : addTodo
}
