export class ConfigService {
  private urlService: string;

  constructor() {
    this.urlService = 'https://receitas-back-vfs.herokuapp.com/api/v1';
  }

  getUrlService(): string {
    return this.urlService;
  }
}
