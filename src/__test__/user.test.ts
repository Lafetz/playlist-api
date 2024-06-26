import supertest from "supertest";
import mongoose from "mongoose";
import InitDB from "../repository/init";
import User from "../repository/models/user.model";
import createServer from "../web/server";

const app = createServer();
describe("User API", () => {
  beforeAll(async () => {
    await InitDB();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/signup", () => {
    it("should create a new user and return a message", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123"
      };

      const response = await supertest(app)
        .post("/api/signup")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("msg", "account Created");
    });

    it("should return a 422 if email is taken", async () => {
      const userData = {
        email: "test2@example.com",
        password: "password123"
      };
      await supertest(app).post("/api/signup").send(userData);
      await supertest(app).post("/api/signup").send(userData).expect(422);
    });
    it("should return a 422 if email is missing", async () => {
      const userData = {
        password: "password123"
      };

      await supertest(app).post("/api/signup").send(userData).expect(422);
    });

    it("should return a 422 if password is missing", async () => {
      const userData = {
        email: "test@example.com"
      };

      await supertest(app).post("/api/signup").send(userData).expect(422);
    });
  });

  describe("POST /api/signin", () => {
    it("should return a token if the credentials are correct", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123"
      };
      await supertest(app).post("/api/signin").send(userData).expect(200);
      const response = await supertest(app)
        .post("/api/signin")
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });
    it("should return a 422 if password is missing", async () => {
      const userData = {
        email: "test@example.com"
      };
      await supertest(app).post("/api/signin").send(userData).expect(422);
    });
    it("should return a 422 if email is missing", async () => {
      const userData = {
        password: "password123"
      };

      await supertest(app).post("/api/signin").send(userData).expect(422);
    });

    it("should return a 422 if password is missing", async () => {
      const userData = {
        email: "test@example.com"
      };

      await supertest(app).post("/api/signup").send(userData).expect(422);
    });
    it("should return a 401 if the credentials are incorrect", async () => {
      const userData = {
        email: "nonexistent@example.com",
        password: "wrongpassword"
      };

      await supertest(app).post("/api/signin").send(userData).expect(401);
    });
  });
});
