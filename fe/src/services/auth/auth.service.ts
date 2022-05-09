import axios from "axios";

import httpService from "../http-service";
import {
  SignInBody,
  SignInResponse,
  SignInResponseSuccess,
} from "./signin.auth.types";
import {
  SignUpBody,
  SignupResponse,
  SignupResponseSuccess,
} from "./signup.auth.types";

class AuthService {
  private readonly httpService: typeof httpService;
  private readonly baseUrl: string;

  constructor() {
    this.httpService = httpService;
    this.baseUrl = "http://localhost:3000";
  }

  public async signin({
    username,
    password,
  }: SignInBody): Promise<SignInResponse> {
    try {
      const { data } = await this.httpService.post<
        SignInBody,
        SignInResponseSuccess["data"]
      >(`${this.baseUrl}/auth/signin`, {
        username: username,
        password: password,
      });

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

  public async signup({
    username,
    password,
    email,
  }: SignUpBody): Promise<SignupResponse> {
    try {
      const { data } = await this.httpService.post<
        SignUpBody,
        SignupResponseSuccess["data"]
      >(`${this.baseUrl}/auth/signup`, {
        email: email,
        username: username,
        password: password,
      });

      return { state: "success", data };
    } catch (e) {
      const error = e as Error;
      // construct error objects based on code

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

export default new AuthService();
