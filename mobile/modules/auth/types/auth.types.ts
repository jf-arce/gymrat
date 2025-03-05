export type UserLogin = {
  role: string;
  id: string;
  name: string;
  username: string;
  email: string;
};

export type SessionAuth = {
  accessToken: string;
  refreshToken: string;
  user: UserLogin;
};
