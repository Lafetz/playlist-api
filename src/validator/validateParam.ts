import { param,query } from "express-validator";

export const validateParam=[param('id').isMongoId().withMessage('Invalid Id'),]
const validateQueryParams = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
  ];
  export const validateQuerySong = [
   ...validateQueryParams,
    query('sort').optional().isIn(['name', 'createdAt']).withMessage('Sort must be either "name" or "createdAt"'),
  ];  
  export const validateQueryPlay = [
    ...validateQueryParams,
    query('sort').optional().isIn([ 'title','createdAt']).withMessage('Sort must be either "title" or "createdAt"'),
  ];  