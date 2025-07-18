export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  cnpj?: string;
  profileImg?: string;
}

export interface GetUserByUsername {
  username: string;
}
