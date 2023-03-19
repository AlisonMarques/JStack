import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  // 478fb3a3-e6df-48f5-9950-9a2335101a25
  async listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesService();
