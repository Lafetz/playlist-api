import supertest from "supertest";
import mongoose from "mongoose";
import createServer from "../web/server";
import InitDB from "../repository/init";
import { signJWT } from "../web/utils/jwt";
import { createPlaylist } from "../core/services/playlist.service";

const app = createServer();
const id = new mongoose.Types.ObjectId().toString();
const user = {
  id
};
const jwt = signJWT(user, "1d");
describe("Song API", () => {
  const testSong = {
    name: "Test Song",
    url: "http://example.com/test.mp3",
    playlistId: ""
  };
  beforeAll(async () => {
    await InitDB();
    const play = await createPlaylist(id.toString(), {
      title: "ss",
      description: "ss"
    });
    testSong.playlistId = play._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/songs", () => {
    it("should create a new song", async () => {
      const response = await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(testSong)
        .expect(201);

      expect(response.body.name).toBe(testSong.name);
      expect(response.body.url).toBe(testSong.url);
    });
    it("should return 422 if name is missing", async () => {
      const songWithoutName = { ...testSong };
      songWithoutName.name = "";
      await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(songWithoutName)
        .expect(422);
    });

    it("should return 422 if url is missing", async () => {
      const songWithoutUrl = { ...testSong };
      songWithoutUrl.url = "";
      await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(songWithoutUrl)
        .expect(422);
    });

    it("should return 422 if playlistId is missing", async () => {
      const songWithoutPlaylistId = { ...testSong };
      songWithoutPlaylistId.playlistId = "";
      await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(songWithoutPlaylistId)
        .expect(422);
    });
  });

  describe("GET /api/songs", () => {
    it("should return a list of songs", async () => {
      const response = await supertest(app)
        .get(`/api/songs?playlistId=${id}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
    it("GET /api/songs should return 403 if user is not logged in", async () => {
      await supertest(app).get("/api/songs").expect(403);
    });
  });

  describe("GET /api/songs/:id", () => {
    it("should return a 404 if the song does not exist", async () => {
      await supertest(app)
        .get("/api/songs/4edd40c86762e0fb12000003")
        .set("Authorization", `Bearer ${jwt}`)
        .expect(404);
    });

    it("should return the song if it exists", async () => {
      const createResponse = await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(testSong)
        .expect(201);

      const songId = createResponse.body._id;

      const getResponse = await supertest(app)
        .get(`/api/songs/${songId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(200);

      expect(getResponse.body.name).toBe(testSong.name);
      expect(getResponse.body.url).toBe(testSong.url);
    });
  });

  describe("PUT /api/songs/:id", () => {
    it("should update the song if it exists", async () => {
      const createResponse = await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(testSong)
        .expect(201);

      const songId = createResponse.body._id;

      const updatedData = {
        name: "Updated Test Song",
        url: "http://example.com/updated.mp3"
      };

      const updateResponse = await supertest(app)
        .put(`/api/songs/${songId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .send(updatedData)
        .expect(200);

      expect(updateResponse.body.name).toBe(updatedData.name);
      expect(updateResponse.body.url).toBe(updatedData.url);
    });

    it("should return a 404 if the song does not exist", async () => {
      const updatedData = {
        name: "Updated Test Song",
        url: "http://example.com/updated.mp3"
      };

      await supertest(app)
        .put("/api/songs/4edd40c86762e0fb12000003")
        .set("Authorization", `Bearer ${jwt}`)
        .send(updatedData)
        .expect(404);
    });
  });

  describe("DELETE /api/songs/:id", () => {
    it("should delete the song if it exists", async () => {
      const createResponse = await supertest(app)
        .post("/api/songs")
        .set("Authorization", `Bearer ${jwt}`)
        .send(testSong)
        .expect(201);

      const songId = createResponse.body._id;

      await supertest(app)
        .delete(`/api/songs/${songId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(200);

      await supertest(app)
        .get(`/api/songs/${songId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(404);
    });

    it("should return a 404 if the song does not exist", async () => {
      const songId = new mongoose.Types.ObjectId().toString();
      await supertest(app)
        .delete(`/api/songs/${songId}`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(404);
    });
  });
});
