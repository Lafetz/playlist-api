import { body } from "express-validator";

export const validatePlaylistCreate = [
  body("title").not().isEmpty().withMessage("Playlist name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
];

export const validatePlaylistUpdate = [
  body("title")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Playlist name cannot be empty"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
];
