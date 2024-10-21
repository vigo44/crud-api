import { IncomingMessage } from "node:http";
import { validate } from "uuid";

import { HTTP_METHODS, RESPONSE_ERROR_MESSAGE } from "../constants/http";
import { BASE_URL } from "../constants/server";

const UUID_LENGTH = 36;

export const parseUrl = ({ url, method }: IncomingMessage): string => {
  if (!url?.startsWith(BASE_URL)) throw new Error(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
  let userId = url.slice(BASE_URL.length + 1);
  if (method === HTTP_METHODS.GET && ["", "/"].includes(userId)) return "";
  if (method === HTTP_METHODS.POST && !["", "/"].includes(userId))
    throw new Error(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
  const arrMetodsWithId: string[] = [HTTP_METHODS.GET, HTTP_METHODS.PUT, HTTP_METHODS.DELETE];
  if (method && arrMetodsWithId.includes(method)) {
    if (userId.includes("/")) {
      if (userId.length > UUID_LENGTH + 1 || userId.length < UUID_LENGTH) {
        throw new Error(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
      } else {
        if (userId.length === UUID_LENGTH + 1) userId = userId.slice(0, UUID_LENGTH);
      }
    }
    if (!validate(userId)) {
      throw new Error(RESPONSE_ERROR_MESSAGE.USER_ID_IS_NOT_CORRECT);
    }
    return userId;
  }
  return "";
};
