export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: "AHTLETE" | "COMPANY";
  cnpj?: string;
  profileImg?: string;
  bannerImg?: string;
}

export interface GetUserByUsername {
  username: string;
}

export interface UpdateUser {
  name?: string;
  username?: string;
  email?: string;
  profileImg?: File;
  bannerImg?: File;
}
