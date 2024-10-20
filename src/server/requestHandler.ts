import { IncomingMessage, ServerResponse } from "http";

import { responseErrorHandler } from "./responseErrorHandler";
import { parseUrl } from "../utils/parseUrl";
import { HTTP_METHODS, RESPONSE_ERROR_MESSAGE } from "../constants/http";

export const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = parseUrl(req);
    switch (req.method) {
      case HTTP_METHODS.GET:
        //
        break;
      case HTTP_METHODS.POST:
        //
        break;
      case HTTP_METHODS.PUT:
        //
        break;
      case HTTP_METHODS.DELETE:
        //
        break;
      default:
        throw new Error(RESPONSE_ERROR_MESSAGE.METHOD_NOT_SUPPORTED);
    }
  } catch (error) {
    if (error instanceof Error) responseErrorHandler(error, res);
  }
};
