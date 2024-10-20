import { IncomingMessage } from "http";

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const enum HTTP_CODES {
  OK = 200,
  CREATE = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const enum RESPONSE_MESSAGE {}

export const enum RESPONSE_ERROR_MESSAGE {
  INTERNAL_SERVER_ERROR = "Internal server error",
  URL_NOT_FOUND = "URL not found",
  USER_ID_IS_NOT_CORRECT = "User ID is not correct",
  METHOD_NOT_SUPPORTED = "Method not supported",
}
