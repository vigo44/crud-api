import { ServerResponse } from "http";
import { UserType } from "../types/user";
import { HTTP_CONTENT_TYPE } from "../constants/http";

type responseHandlerProps = {
  res: ServerResponse;
  statusCode: number;
  data: UserType | UserType[];
};

type simpleResponseHandlerProps = {
  res: ServerResponse;
  statusCode: number;
  data: string;
};

export const responseHandler = ({ res, statusCode, data }: responseHandlerProps) => {
  res.writeHead(statusCode, HTTP_CONTENT_TYPE.JSON);
  res.end(JSON.stringify(data));
};

export const simpleResponseHandler = ({ res, statusCode, data }: simpleResponseHandlerProps) => {
  res.writeHead(statusCode, HTTP_CONTENT_TYPE.TEXT);
  res.end(data);
};
