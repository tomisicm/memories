import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class HttpService {
  private readonly baseUrl = `http://jsonplaceholder.typicode.com/`;
  private userJwt: string | undefined;

  // Requests to api-gateway with auth if signed in
  get<T>(url: string, options = {}): Promise<AxiosResponse<T>> {
    return Axios.get(url, this.injectAuthHeader(options));
  }

  post<R, T>(url: string, body: R, options = {}): Promise<AxiosResponse<T>> {
    return Axios.post(url, body, this.injectAuthHeader(options));
  }

  put<R, T>(url: string, body: R, options = {}): Promise<AxiosResponse<T>> {
    return Axios.put(url, body, this.injectAuthHeader(options));
  }

  patch<R, T>(url: string, body: R, options = {}): Promise<AxiosResponse<T>> {
    return Axios.patch(url, body, this.injectAuthHeader(options));
  }

  delete<T>(url: string, options = {}): Promise<AxiosResponse<T>> {
    return Axios.delete(url, this.injectAuthHeader(options));
  }

  private injectAuthHeader(options: AxiosRequestConfig) {
    if (!this.userJwt) {
      return options;
    }
    const headers = options?.headers || {};
    return {
      ...options,
      headers: { ...headers, Authorization: `Bearer ${this.userJwt}` },
    };
  }
}

const httpService = new HttpService();

export default httpService;
