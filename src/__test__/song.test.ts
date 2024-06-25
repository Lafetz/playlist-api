import supertest from "supertest";
import createServer from "../server";
import InitDB from "../db/init";
import mongoose from "mongoose";
import { signJWT } from "../util/jwt";
import { createPlaylist } from "../db/repository/playlist.repository";

const app = createServer();
const id = new mongoose.Types.ObjectId().toString();
 const user = {
    id: id,
  };
  const jwt = signJWT(user,'1d');
describe('Song API', () => {
    const testSong = {
        name: "Test Song",
        url: "http://example.com/test.mp3",
        playlistId:"",
    };
    beforeAll(async () => {
    await InitDB();
    const play= await createPlaylist("ts","ts",id)
    testSong.playlistId=play._id as string
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
   
    describe('POST /api/songs', () => {

        it('should create a new song', async () => {
            const response = await supertest(app)
                .post('/api/songs')
                .set("authorization", `Bearer ${jwt}`)
                .send(testSong)
                .expect(201);
            
            expect(response.body.name).toBe(testSong.name);
            expect(response.body.url).toBe(testSong.url);
        });

    });

    describe('GET /api/songs', () => {

        it('should return a list of songs', async () => {
            const response = await supertest(app)
                .get('/api/songs')
                .set("authorization", `Bearer ${jwt}`)
                .expect(200);
            
            expect(Array.isArray(response.body)).toBe(true);
        });

    });

    describe('GET /api/songs/:id', () => {

        it('should return a 404 if the song does not exist', async () => {
            await supertest(app)
                .get('/api/songs/4edd40c86762e0fb12000003')
                .set("authorization", `Bearer ${jwt}`)
                .expect(404);
        });

        it('should return the song if it exists', async () => {
            const createResponse = await supertest(app)
                .post('/api/songs')
                .set("authorization", `Bearer ${jwt}`)
                .send(testSong)
                .expect(201);
            
            const songId = createResponse.body._id;

            const getResponse = await supertest(app)
                .get(`/api/songs/${songId}`)
                .set("authorization", `Bearer ${jwt}`)
                .expect(200);

            expect(getResponse.body.name).toBe(testSong.name);
            expect(getResponse.body.url).toBe(testSong.url);
        });

    });

    describe('PUT /api/songs/:id', () => {

        it('should update the song if it exists', async () => {
            const createResponse = await supertest(app)
                .post('/api/songs')
                .set("authorization", `Bearer ${jwt}`)
                .send(testSong)
                .expect(201);
            
            const songId = createResponse.body._id;
//
            const updatedData = {
                name: "Updated Test Song",
                url: "http://example.com/updated.mp3",
            };

            const updateResponse = await supertest(app)
                .put(`/api/songs/${songId}`)
                .set("authorization", `Bearer ${jwt}`)
                .send(updatedData)
                .expect(200);

            expect(updateResponse.body.name).toBe(updatedData.name);
            expect(updateResponse.body.url).toBe(updatedData.url);
        });

        it('should return a 404 if the song does not exist', async () => {
            const updatedData = {
                name: "Updated Test Song",
                url: "http://example.com/updated.mp3",
            };

            await supertest(app)
                .put('/api/songs/4edd40c86762e0fb12000003')
                .set("authorization", `Bearer ${jwt}`)
                .send(updatedData)
                .expect(404);
        });

    });

    describe('DELETE /api/songs/:id', () => {
       

        it('should delete the song if it exists', async () => {
            const createResponse = await supertest(app)
                .post('/api/songs')
                .set("authorization", `Bearer ${jwt}`)
                .send(testSong)
                .expect(201);
            
            const songId = createResponse.body._id;

            await supertest(app)
                .delete(`/api/songs/${songId}`)
                .set("authorization", `Bearer ${jwt}`)
                .expect(200);

            await supertest(app)
                .get(`/api/songs/${songId}`)
                .set("authorization", `Bearer ${jwt}`)
                .expect(404);
        });

        it('should return a 404 if the song does not exist', async () => {
            const songId = new mongoose.Types.ObjectId().toString();
            await supertest(app)
                .delete(`/api/songs/${songId}`)
                .set("Authorization", `Bearer ${jwt}`)
                .expect(404);
        });

    });

});