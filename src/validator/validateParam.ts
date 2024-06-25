
import { param,query } from "express-validator";

export const validateParam=[param('id').isMongoId().withMessage('Invalid Id'),]
export const validateQueryParams = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sort').optional().isIn(['name', 'createdAt',"title"]).withMessage('invalid sort parameter'),
  ];