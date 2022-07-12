import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

interface Options {
  model: Model<unknown>;
}

declare global {
  namespace Express {
    interface Request {
      model: object;
    }
  }
}

function searchModel(options: Options) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const searchModelById = await options.model.findById(req.params.id);

      if (!searchModelById) {
        return res
          .status(404)
          .json({ msg: `${options.model.modelName} not found` });
      }

      req.model = searchModelById;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
}

export default searchModel;
