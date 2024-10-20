import { v4 as uuidv4 } from "uuid";
import { NewUserType, UserType } from "../types/user";
import { RESPONSE_ERROR_MESSAGE } from "../constants/http";

class Users {
  private users: UserType[] = [];

  private isUserExists(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    if (user) return userId;
    throw new Error(RESPONSE_ERROR_MESSAGE.USER_NOT_FOUND);
  }

  public addUser(newUser: NewUserType) {
    const user = { ...newUser, id: uuidv4() };
    return (this.users = [...this.users, user]);
  }

  public getUsers(): UserType[] {
    return this.users;
  }

  public getUserById(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    if (user) return user;
    throw new Error(RESPONSE_ERROR_MESSAGE.USER_NOT_FOUND);
  }

  public deleteUserById(userId: string) {
    const id = this.isUserExists(userId);
    return (this.users = this.users.filter((item) => item.id !== id));
  }

  public updateUserById(userId: string, newUser: NewUserType) {
    const id = this.isUserExists(userId);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = { id, ...newUser };
    return this.users;
  }
}

export const userDB = new Users();
