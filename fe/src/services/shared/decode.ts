export interface DecodedJwt {
  exp: number;
  iat: number;
  id: string;
  username: string;
  email: string;
}

export const decode = (jwt: string) => JSON.parse(atob(jwt.split(".")[1]));
