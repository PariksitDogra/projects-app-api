import * as dynamoDbLib from "../projects-app-api/libs/dynamodb-lib";
import { success, failure } from "../projects-app-api/libs/response-lib";
import uuid from "uuid";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: "projects",
    Item: {
      projectId: uuid.v1(),
      title: data.title,
      mgmtId: data.mgmtId, 
      content: data.content,
      createdAt: Date.now(),
      projectStatus: data.projectStatus,
      developers:[]
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