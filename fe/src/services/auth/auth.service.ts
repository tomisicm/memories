import axios from "axios";
import httpService from "../http-service";

interface SigninResponse {
  error?: string;
  accessToken?: string;
}

interface SignupResponse {
  error?: string;
  accessToken?: string;
}

// TODO
type SigninResponseError = {
  error: string;
};

// TODO
type SigninResponseSuccess = {
  accessToken: string;
};

interface SigninBody {
  username: string;
  password: string;
}

interface SignUpBody {
  email: string;
  username: string;
  password: string;
}

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
  }: SigninBody): Promise<SigninResponse> {
    try {
      const { data } = await this.httpService.post<SigninBody, SigninResponse>(
        `${this.baseUrl}/auth/signin`,
        {
          username: username,
          password: password,
        }
      );

      return data;
    } catch (e) {
      const error = e as Error;

      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message };
      }

      return { error: "Something went wrong!" };
    }
  }

  // TODO
  public async signup({ username, password, email }: SignUpBody) {
    try {
      const { data } = await this.httpService.post<SignUpBody, SignupResponse>(
        `${this.baseUrl}/auth/signin`,
        {
          email: email,
          username: username,
          password: password,
        }
      );

      return data;
    } catch (e) {
      const error = e as Error;

      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message };
      }

      return { error: "Something went wrong!" };
    }
  }
}

export default new AuthService();
