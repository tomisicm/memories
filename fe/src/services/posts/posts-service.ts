import axios from "axios";
import { IPost, IPostAndComments } from "../../types/posts";
import httpService from "../http-service";
import {
  CreatePostResponse,
  CreatePostResponseSuccess,
  DeletePostResponse,
  DeletePostResponseSuccess,
  GetPostResponse,
  GetPostResponseSuccess,
  UpdatePostResponse,
  UpdatePostResponseSuccess,
} from "./posts-service.types";

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

  // TODO
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

  async update(id: string, body: any): Promise<UpdatePostResponse> {
    try {
      const { data } = await this.httpService.put<
        Omit<IPost, "id">,
        UpdatePostResponseSuccess["data"]
      >(`${this.baseUrl}/posts/${id}`, body);

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

  async create(body: Omit<IPost, "id">): Promise<CreatePostResponse> {
    try {
      const { data } = await this.httpService.post<
        Omit<IPost, "id">,
        CreatePostResponseSuccess["data"]
      >(`${this.baseUrl}/posts`, body);

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

  async delete(id: string): Promise<DeletePostResponse> {
    try {
      const { data } = await this.httpService.delete<
        DeletePostResponseSuccess["data"]
      >(`${this.baseUrl}/posts/${id}`);

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
}

export default new PostsService();
