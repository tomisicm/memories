import axios from "axios";
import httpService from "../http-service";
import {
  CreateCommentBody,
  CreateCommentResponse,
  CreateCommentResponseSuccess,
} from "./coments.service.types";

class CommentsService {
  httpService: typeof httpService;
  baseUrl: string;

  constructor() {
    this.httpService = httpService;
    this.baseUrl = "http://localhost:3000/comments";
  }

  async update(id: string, body: any): Promise<any> {
    return await this.httpService.put(`${this.baseUrl}/${id}`, body);
  }

  async delete(id: string, body: any): Promise<any> {
    return await this.httpService.delete(`${this.baseUrl}/${id}`);
  }

  // COMPLETED
  async create({
    postId,
    body,
  }: CreateCommentBody): Promise<CreateCommentResponse> {
    try {
      const { data } = await this.httpService.post<
        CreateCommentBody,
        CreateCommentResponseSuccess["data"]
      >(`${this.baseUrl}`, { postId, body, status: "public" });

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

export default new CommentsService();
