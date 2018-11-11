import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import uuid from "uuid";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: "projects",
    Key: {
        projectId: event.pathParameters.id    
    },
    
    UpdateExpression: "SET content = :content, title = :title, projectStatus = :projectStatus, developers = :developers",
    ExpressionAttributeValues: {
      ":content": data.content || null,
      ":title": data.title || null,
      ":projectStatus": data.projectStatus || null,
      ":developers": data.developers || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}