import { IncomingMessage, ServerResponse } from "http";

import { responseErrorHandler } from "./responseErrorHandler";
import { parseUrl } from "../utils/parseUrl";
import { HTTP_CODES, HTTP_METHODS, RESPONSE_ERROR_MESSAGE, RESPONSE_MESSAGE } from "../constants/http";
import { responseHandler, simpleResponseHandler } from "./responseHandler";
import { userDB } from "../database/users";
import { userParseJson } from "../utils/parseUser";

export const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = parseUrl(req);
    switch (req.method) {
      case HTTP_METHODS.GET:
        if (userId === "") {
          responseHandler({ res, statusCode: HTTP_CODES.OK, data: userDB.getUsers() });
        } else {
          responseHandler({ res, statusCode: HTTP_CODES.OK, data: userDB.getUser(userId) });
        }
        break;
      case HTTP_METHODS.POST:
        let body = "";
        req.on("data", (chunk) => {
          body = chunk.toString();
        });
        req.on("end", () => {
          try {
            const user = userParseJson(body);
            userDB.addUser(user);
            simpleResponseHandler({ res, statusCode: HTTP_CODES.CREATE, data: RESPONSE_MESSAGE.USER_CREATE });
          } catch (error) {
            if (error instanceof Error) responseErrorHandler(error, res);
          }
        });
        break;
      case HTTP_METHODS.PUT:
        let bodyPut = "";
        req.on("data", (chunk) => {
          bodyPut = chunk.toString();
        });
        req.on("end", () => {
          try {
            const user = userParseJson(bodyPut);
            userDB.updateUser(userId, user);
            simpleResponseHandler({ res, statusCode: HTTP_CODES.OK, data: RESPONSE_MESSAGE.USER_UPDATE });
          } catch (error) {
            if (error instanceof Error) responseErrorHandler(error, res);
          }
        });
        break;
      case HTTP_METHODS.DELETE:
        userDB.deleteUser(userId);
        simpleResponseHandler({ res, statusCode: HTTP_CODES.NO_CONTENT, data: RESPONSE_MESSAGE.USER_DELETE });
        break;
      default:
        throw new Error(RESPONSE_ERROR_MESSAGE.METHOD_NOT_SUPPORTED);
    }
  } catch (error) {
    if (error instanceof Error) responseErrorHandler(error, res);
  }
};
