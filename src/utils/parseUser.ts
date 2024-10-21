import { RESPONSE_ERROR_MESSAGE } from "../constants/http";
import { NewUserType } from "../types/user";

export const userParseJson = (userJson: string) => {
  try {
    const user = JSON.parse(userJson);
    if (
      typeof user === "object" &&
      typeof user.username === "string" &&
      user.username.length > 0 &&
      typeof user.age === "number" &&
      Array.isArray(user.hobbies)
    )
      return user as NewUserType;
    throw new Error(RESPONSE_ERROR_MESSAGE.USER_FORMAT_IS_NOT_CORRECT);
  } catch {
    throw new Error(RESPONSE_ERROR_MESSAGE.USER_FORMAT_IS_NOT_CORRECT);
  }
};
