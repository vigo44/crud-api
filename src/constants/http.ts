import { IncomingMessage } from "http";

export const enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const HTTP_CONTENT_TYPE = {
  TEXT: {
    "Content-Type": "text/plain",
  },
  JSON: { "Content-Type": "application/json" },
};

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
  USER_NOT_FOUND = "User not found",
}
