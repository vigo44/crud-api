import { ServerResponse } from "node:http";
import { HTTP_CODES, HTTP_CONTENT_TYPE, RESPONSE_ERROR_MESSAGE } from "../constants/http";

export const responseErrorHandler = (error: Error, res: ServerResponse) => {
  const writeHeadHandler = (code: number) => {
    res.writeHead(code, HTTP_CONTENT_TYPE.TEXT).end(error.message);
  };
  switch (error.message) {
    case RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND:
      writeHeadHandler(HTTP_CODES.NOT_FOUND);
      break;
    case RESPONSE_ERROR_MESSAGE.USER_ID_IS_NOT_CORRECT:
      writeHeadHandler(HTTP_CODES.BAD_REQUEST);
      break;
    case RESPONSE_ERROR_MESSAGE.METHOD_NOT_SUPPORTED:
      writeHeadHandler(HTTP_CODES.BAD_REQUEST);
      break;
    case RESPONSE_ERROR_MESSAGE.USER_NOT_FOUND:
      writeHeadHandler(HTTP_CODES.NOT_FOUND);
      break;
    default:
      console.log(error.message);
      res
        .writeHead(HTTP_CODES.INTERNAL_SERVER_ERROR, HTTP_CONTENT_TYPE.TEXT)
        .end(RESPONSE_ERROR_MESSAGE.INTERNAL_SERVER_ERROR);

      break;
  }
};
