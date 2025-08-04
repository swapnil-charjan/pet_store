import { body, ValidationChain } from 'express-validator';

const petValidate: ValidationChain[] = [
    body('name')
        .notEmpty().withMessage('Name is required').bail()
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    body('age')
        .notEmpty().withMessage('Age is required').bail()
        .isInt({ min: 0 }).withMessage('Age must be a positive number'),

    body('type')
        .notEmpty().withMessage('Type is required').bail(),    

    body('breed')
        .notEmpty().withMessage('Breed is required'),

    body('owner')
        .notEmpty().withMessage('Owner is required').bail()
        .isLength({ min: 2 }).withMessage('Owner must be at least 2 characters'),

    body('color')
        .notEmpty().withMessage('Color is required'),

    body('image')
        .notEmpty().withMessage('Image is required'),
];

export default petValidate;
