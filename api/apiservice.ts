import { IApiPage } from "./Models/iapipage";

export class ApiService {
  //prop
  private BaseUrl = "https://content.vertigodigital.se/wp-json/wp/v2";
  private InfoPageId = 138;

  //constructor
  constructor() {}

  async getInfoPage() {
    const page = await this.getPage(this.InfoPageId);
    return page;
  }

  private async getPage(pageId: number) {
    const pageUrl = "/Pages/";
    const request = await fetch(this.BaseUrl + pageUrl + pageId);
    const response: IApiPage = await request.json();
    // response.content.rendered = this.cleanFromHtml(response.content.rendered);
    // response.title.rendered = this.cleanFromHtml(response.title.rendered);
    return response;
  }
}
