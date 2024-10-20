import { ServerResponse } from "node:http";
import { HTTP_CODES, RESPONSE_ERROR_MESSAGE } from "../constants/http";

export const responseErrorHandler = (error: Error, res: ServerResponse) => {
  switch (error.message) {
    case RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND:
      res
        .writeHead(HTTP_CODES.NOT_FOUND, {
          "Content-Type": "text/plain",
        })
        .end(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
      break;
    case RESPONSE_ERROR_MESSAGE.USER_ID_IS_NOT_CORRECT:
      res
        .writeHead(HTTP_CODES.BAD_REQUEST, {
          "Content-Type": "text/plain",
        })
        .end(RESPONSE_ERROR_MESSAGE.USER_ID_IS_NOT_CORRECT);
      break;
    case RESPONSE_ERROR_MESSAGE.METHOD_NOT_SUPPORTED:
      res
        .writeHead(HTTP_CODES.BAD_REQUEST, {
          "Content-Type": "text/plain",
        })
        .end(RESPONSE_ERROR_MESSAGE.METHOD_NOT_SUPPORTED);
      break;
    default:
      console.log(error.message);
      res
        .writeHead(HTTP_CODES.INTERNAL_SERVER_ERROR, {
          "Content-Type": "text/plain",
        })
        .end(RESPONSE_ERROR_MESSAGE.INTERNAL_SERVER_ERROR);

      break;
  }
};
