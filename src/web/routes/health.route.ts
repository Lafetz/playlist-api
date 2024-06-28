import express, { Request, Response } from "express";
const router = express.Router();
/**
 * @openapi
 * /api/healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     summary: Check the app's status
 *     description: Returns a response to indicate the application is operational
 *     responses:
 *       200:
 *         description: The application is running smoothly
 */
router.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(200)
);
export default router;
