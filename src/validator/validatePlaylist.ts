
import { body } from "express-validator";

const validatePlaylist = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Playlist name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export default validatePlaylist;