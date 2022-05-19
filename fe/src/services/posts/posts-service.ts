import axios from "axios";
import { IPost, IPostAndComments } from "../../types/posts";
import httpService from "../http-service";
import { GetPostResponse, GetPostResponseSuccess } from "./posts-service.types";

// https://github.com/typicode/json-server#paginate
interface IPaginationProperties {
  _page: number;
  _limit: number;
}

class PostsService {
  httpService: typeof httpService;
  baseUrl: string;

  constructor() {
    this.httpService = httpService;
    this.baseUrl = "http://localhost:3000";
  }

  async getAll(
    { _page, _limit }: IPaginationProperties = {
      _page: 1,
      _limit: 10,
    }
  ): Promise<IPost[] | void> {
    try {
      const response = await this.httpService.get<IPost[]>(
        `${this.baseUrl}/posts?&_limit=${_limit}&_page=${_page}`
      );
      return response.data;
    } catch (e) {
      // TODO: error handling
      console.log(e);
    }
  }

  async get(id: string): Promise<GetPostResponse> {
    try {
      const { data } = await this.httpService.get<
        GetPostResponseSuccess["data"]
      >(`${this.baseUrl}/posts/${id}?_embed=comments`);

      return { data, state: "success" };
    } catch (e) {
      const error = e as Error;

      if (axios.isAxiosError(error)) {
        return {
          state: "failed",
          code: error.response?.status as number,
          message: error.response?.data.message as string,
        };
      }

      return {
        state: "failed",
        code: 500,
        message: "Something went wrong!",
      };
    }
  }

  async update(id: string, body: any) {
    return await this.httpService.put(`${this.baseUrl}/posts/${id}`, body);
  }

  async delete(id: string, body: any) {
    return await this.httpService.delete(`${this.baseUrl}/posts/${id}`);
  }

  async create(id: string, body: any) {
    return await this.httpService.post(`${this.baseUrl}/posts/${id}`, body);
  }
}

export default new PostsService();
