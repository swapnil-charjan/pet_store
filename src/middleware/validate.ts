import { plainToInstance } from 'class-transformer';
import { validate as classValidate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DtoClass, req.body);
    const errors = await classValidate(dtoObject);

    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    next();
  };
};
