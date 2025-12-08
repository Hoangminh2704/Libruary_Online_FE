export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string | null;
}

export interface Member {
  id: number;
  membershipCode: string;
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  maxBorrow: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}
