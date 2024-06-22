
import { body } from "express-validator";

const validateAcccount = [
body("email")
.not()
.isEmpty()
.withMessage("email is required")
.bail()
.isEmail()
.withMessage("invalid email"),
body("password")
.not()
.isEmpty()
.withMessage("password can't be empty")
.bail()
.isLength({ min: 6, max: 20 })
.withMessage("You must supply password of minimum 6 character")
]
export default validateAcccount