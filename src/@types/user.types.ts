export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: "ahtlete" | "company" | "ATHLETE" | "COMPANY" | "admin";
  cnpj?: string;
  profileImg?: string;
  bannerImg?: string;
  // Campos de moderação
  isBanned?: boolean;
  bannedAt?: string;
  bannedReason?: string;
  bannedByAdminId?: number;
  isSuspended?: boolean;
  suspendedUntil?: string;
  suspensionReason?: string;
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
