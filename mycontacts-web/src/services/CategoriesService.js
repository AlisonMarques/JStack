import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  // 478fb3a3-e6df-48f5-9950-9a2335101a25
  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map(CategoryMapper.todomain);
  }
}

export default new CategoriesService();
