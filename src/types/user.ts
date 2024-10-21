export type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type NewUserType = Omit<UserType, "id">;
