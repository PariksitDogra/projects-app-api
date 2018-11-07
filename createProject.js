import * as dynamoDbLib from "../cloudapp-dev/libs/dynamodb-lib";
import { success, failure } from "../cloudapp-dev/libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: "projects",
    Item: {
      projectId: data.title,
      mgmtId: data.mgmtId, 
      content: data.content,
      createdAt: Date.now(),
      projectStatus: data.projectStatus
      
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}