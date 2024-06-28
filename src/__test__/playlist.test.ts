import supertest from "supertest";
import createServer from "../web/server";
import InitDB from "../repository/init";
import mongoose from "mongoose";
import { signJWT } from "../web/utils/jwt";
const app = createServer();
describe('Playlist API', () => {

    const id = new mongoose.Types.ObjectId().toString();
    const user = {
        id: id,
    };
    const jwt = signJWT(user, '1d');

    const testPlaylist = {
        title: "Test Playlist",
        description: "This is a test playlist",
    };

    beforeAll(async () => {
         await InitDB();
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    describe('POST /api/playlists', () => {

        it('should create a new playlist', async () => {
            const response = await supertest(app)
                .post('/api/playlists')
                .set("Authorization", `Bearer ${jwt}`)
                .send(testPlaylist)
                .expect(201);
            
            expect(response.body.title).toBe(testPlaylist.title);
            expect(response.body.description).toBe(testPlaylist.description);
        });
        it('should return 422 if title is missing', async () => {
            const { title, ...playlistWithoutName } = testPlaylist;
            await supertest(app)
                .post('/api/playlists')
                .set("Authorization", `Bearer ${jwt}`)
                .send(playlistWithoutName)
                .expect(422);
        });
        it('should return 403 if not logged in', async () => {
            await supertest(app)
                .post('/api/playlists')
                .send(testPlaylist)
                .expect(403);
        });
       
    });

    describe('GET /api/playlists', () => {

        it('should return a list of playlists', async () => {
            const response = await supertest(app)
                .get('/api/playlists')
                .set("Authorization", `Bearer ${jwt}`)
                .expect(200);
            
            expect(Array.isArray(response.body)).toBe(true);
        });

    });

    describe('GET /api/playlists/:id', () => {

        it('should return a 404 if the playlist does not exist', async () => {
            await supertest(app)
                .get('/api/playlists/4edd40c86762e0fb12000003')
                .set("Authorization", `Bearer ${jwt}`)
                .expect(404);
        });

        it('should return the playlist if it exists', async () => {
            const createResponse = await supertest(app)
                .post('/api/playlists')
                .set("Authorization", `Bearer ${jwt}`)
                .send(testPlaylist)
                .expect(201);
            
            const playlistId = createResponse.body._id;

            const getResponse = await supertest(app)
                .get(`/api/playlists/${playlistId}`)
                .set("Authorization", `Bearer ${jwt}`)
                .expect(200);

            expect(getResponse.body.title).toBe(testPlaylist.title);
            expect(getResponse.body.description).toBe(testPlaylist.description);
        });

    });

    describe('PUT /api/playlists/:id', () => {

        it('should update the playlist if it exists', async () => {
            const createResponse = await supertest(app)
                .post('/api/playlists')
                .set("Authorization", `Bearer ${jwt}`)
                .send(testPlaylist)
                .expect(201);
            
            const playlistId = createResponse.body._id;

            const updatedData = {
                title: "Updated Test Playlist",
                description: "Updated description",
            };

            const updateResponse = await supertest(app)
                .put(`/api/playlists/${playlistId}`)
                .set("Authorization", `Bearer ${jwt}`)
                .send(updatedData)
                .expect(200);

            expect(updateResponse.body.title).toBe(updatedData.title);
            expect(updateResponse.body.description).toBe(updatedData.description);
        });
  
        it('should return a 404 if the playlist does not exist', async () => {
            const updatedData = {
                name: "Updated Test Playlist",
                description: "Updated description",
            };

            await supertest(app)
                .put('/api/playlists/4edd40c86762e0fb12000003')
                .set("Authorization", `Bearer ${jwt}`)
                .send(updatedData)
                .expect(404);
        });

    });

    describe('DELETE /api/playlists/:id', () => {

        it('should delete the playlist if it exists', async () => {
            const createResponse = await supertest(app)
                .post('/api/playlists')
                .set("Authorization", `Bearer ${jwt}`)
                .send(testPlaylist)
                .expect(201);
            
            const playlistId = createResponse.body._id;

            await supertest(app)
                .delete(`/api/playlists/${playlistId}`)
                .set("Authorization", `Bearer ${jwt}`)
                .expect(200);

            await supertest(app)
                .get(`/api/playlists/${playlistId}`)
                .set("Authorization", `Bearer ${jwt}`)
                .expect(404);
        });

        it('should return a 404 if the playlist does not exist', async () => {
            const playlistId = new mongoose.Types.ObjectId().toString();
            await supertest(app)
                .delete(`/api/playlists/${playlistId}`)
                .set("Authorization", `Bearer ${jwt}`)
                .expect(404);
        });

    });

});