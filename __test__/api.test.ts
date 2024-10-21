import supertest from "supertest";
import { app } from "../src";
import { BASE_URL } from "../src/constants/server";
import { RESPONSE_ERROR_MESSAGE, RESPONSE_MESSAGE } from "../src/constants/http";
import { validate } from "uuid";
import TestAgent from "supertest/lib/agent";
import { userDB } from "../src/database/users";

let request: TestAgent;

const fakeUser1 = {
  username: "Gomer",
  age: 42,
  hobbies: ["beer", "tv"],
};

const fakeUser2 = {
  username: "Bart",
  age: 10,
  hobbies: ["skateboard"],
};

const fakeUser3 = {
  username: "Maggi",
  age: 1,
  hobbies: [],
};

const fakeUser4 = {
  username: "Liza",
  age: 8,
  hobbies: ["saxophone"],
};

const invalidFakeUser1 = {
  username: "Empty",
  age: 100,
};

const invalidFakeUser2 = {
  username: null,
  age: 100,
  hobbies: ["infinity"],
};

const invalidFakeUser3 = {
  username: "Cthulhu",
  age: "very old",
  hobbies: ["kill"],
};

const invalidFakeUser4 = {
  username: "witch",
  age: 999,
  hobbies: "",
};

const fakeValidUuid = "df80f9f9-97b0-4da6-8afb-fbb1845d1d9f";
const fakeInvalidUuid = "df80f9f9-1111-aaaa-8888-fbb1845d1d9f";

describe("base operations pasitive branch", () => {
  beforeAll(() => {
    request = supertest(app);
  });

  afterAll(() => {
    app.close();
    userDB.clear();
  });
  let userId = "";

  test("should return empty database", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("should create user", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(fakeUser1));
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_CREATE);
  });

  test("should return fakeUser1", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    const [responseUser] = response.body;
    userId = responseUser?.id;
    expect(validate(userId)).toBe(true);
    delete responseUser.id;
    expect(responseUser).toEqual(fakeUser1);
  });

  test("should update user", async () => {
    const response = await request.put(BASE_URL + "/" + userId).send(JSON.stringify(fakeUser2));
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_UPDATE);
  });

  test("should return fakeUser2", async () => {
    const response = await request.get(BASE_URL + "/" + userId);
    expect(response.statusCode).toBe(200);
    const responseUser = response.body;
    delete responseUser.id;
    expect(responseUser).toEqual(fakeUser2);
  });

  test("should delete user", async () => {
    const response = await request.delete(BASE_URL + "/" + userId);
    expect(response.statusCode).toBe(204);
  });

  test("should return empty database", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("find users", () => {
  beforeAll(() => {
    request = supertest(app);
  });

  afterAll(() => {
    app.close();
    userDB.clear();
  });
  let userId1 = "";
  let userId2 = "";
  let userId3 = "";

  const fakeUsers = [fakeUser1, fakeUser2, fakeUser3];

  test("should return empty database", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("should create user1", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(fakeUser1));
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_CREATE);
  });

  test("should create user2", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(fakeUser2));
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_CREATE);
  });
  test("should create user3", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(fakeUser3));
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_CREATE);
  });

  test("should return users", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    const [responseUser1, responseUser2, responseUser3] = response.body;
    userId1 = responseUser1?.id;
    userId2 = responseUser2?.id;
    userId3 = responseUser3?.id;
    expect(validate(userId1)).toBe(true);
    expect(validate(userId2)).toBe(true);
    expect(validate(userId3)).toBe(true);
    delete responseUser1.id;
    delete responseUser2.id;
    delete responseUser3.id;
    expect(fakeUsers).toContainEqual(responseUser1);
    expect(fakeUsers).toContainEqual(responseUser2);
    expect(fakeUsers).toContainEqual(responseUser3);
  });

  test("should delete user2", async () => {
    const response = await request.delete(BASE_URL + "/" + userId2);
    expect(response.statusCode).toBe(204);
  });

  test("should return user2 not found", async () => {
    const response = await request.get(BASE_URL + "/" + userId2);
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual(RESPONSE_ERROR_MESSAGE.USER_NOT_FOUND);
  });

  test("should update user3", async () => {
    const response = await request.put(BASE_URL + "/" + userId3).send(JSON.stringify(fakeUser4));
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_UPDATE);
  });

  test("should return fakeUser4", async () => {
    const response = await request.get(BASE_URL + "/" + userId3);
    expect(response.statusCode).toBe(200);
    const responseUser = response.body;
    delete responseUser.id;
    expect(responseUser).toEqual(fakeUser4);
  });
});

describe("base operations negative branch", () => {
  beforeAll(() => {
    request = supertest(app);
  });

  afterAll(() => {
    app.close();
    userDB.clear();
  });
  test("should error non-existing endpoints(get)", async () => {
    const response = await request.put(BASE_URL + "/fake-path/");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
  });

  test("should error invalidUuid (get)", async () => {
    const response = await request.put(BASE_URL + "/" + fakeInvalidUuid);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.USER_ID_IS_NOT_CORRECT);
  });

  test("should error invalidUuid (post)", async () => {
    const response = await request.post(BASE_URL + "/" + fakeValidUuid);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
  });

  test("should error non-existing endpoints(get)", async () => {
    const response = await request.put(BASE_URL + "/fake-path/");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
  });

  test("should error invalidUuid (put)", async () => {
    const response = await request.put(BASE_URL + "/" + fakeInvalidUuid);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.USER_ID_IS_NOT_CORRECT);
  });

  test("should error non-existing endpoints(delete)", async () => {
    const response = await request.delete(BASE_URL + "/fake-path/bad");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.URL_NOT_FOUND);
  });

  test("should error non-existing method", async () => {
    const response = await request.patch(BASE_URL);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.METHOD_NOT_SUPPORTED);
  });
});

describe("invalid record", () => {
  beforeAll(() => {
    request = supertest(app);
  });

  afterAll(() => {
    app.close();
    userDB.clear();
  });
  let userId = "";

  test("should return empty database", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("should create user", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(fakeUser1));
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe(RESPONSE_MESSAGE.USER_CREATE);
  });

  test("should return fakeUser1", async () => {
    const response = await request.get(BASE_URL);
    expect(response.statusCode).toBe(200);
    const [responseUser] = response.body;
    userId = responseUser?.id;
    expect(validate(userId)).toBe(true);
    delete responseUser.id;
    expect(responseUser).toEqual(fakeUser1);
  });

  test("should error create user(not contain required fields)", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(invalidFakeUser1));
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.USER_FORMAT_IS_NOT_CORRECT);
  });

  test("should error update user(invalid name)", async () => {
    const response = await request.put(BASE_URL + "/" + userId).send(JSON.stringify(invalidFakeUser2));
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.USER_FORMAT_IS_NOT_CORRECT);
  });
  test("should error create user(invalid age)", async () => {
    const response = await request.post(BASE_URL).send(JSON.stringify(invalidFakeUser3));
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.USER_FORMAT_IS_NOT_CORRECT);
  });

  test("should error update user(invalid hobby)", async () => {
    const response = await request.put(BASE_URL + "/" + userId).send(JSON.stringify(invalidFakeUser4));
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(RESPONSE_ERROR_MESSAGE.USER_FORMAT_IS_NOT_CORRECT);
  });
});
