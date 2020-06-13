import { Response, Request } from 'express';
import Category from '../models/ReportCategory';
import { getRepository } from 'typeorm';

class CategoriesController {
  async index(req: Request, res: Response) {
    const categoryRepo = getRepository(Category);

    const categories = await categoryRepo.find({ select: ['id', 'name'] });

    return res.json(categories);
  }
}
export default new CategoriesController();
