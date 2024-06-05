import { SessionOptions as IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export interface IronSessionData {
  user?: {
    id: number;
    username: string;
    email: string;
  };
}


