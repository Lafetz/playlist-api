import { body } from "express-validator";

export const validateSongCreate= [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Song name is required"),
  body("url")
    .not()
    .isEmpty()
    .withMessage("Song URL is required")
    .bail()
    .isURL()
    .withMessage("Invalid URL"),
  body("playlistId")
    .not()
    .isEmpty()
    .withMessage("Playlist ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Playlist ID")
];
export const validateSongUpdate = [
  body("name")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Song name cannot be empty"),
  body("url")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Song URL cannot be empty")
    .bail()
    .isURL()
    .withMessage("Invalid URL"),
];
