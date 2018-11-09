import * as dynamoDbLib from "../projects-app-api/libs/dynamodb-lib";
import { success, failure } from "../projects-app-api/libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    
    TableName: "users",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      emailId: data.emailId,
      permRole: data.permRole,
      content: data.content,
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}