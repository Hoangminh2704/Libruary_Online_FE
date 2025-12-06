export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "Active" | "Deactivated";
  joinDate: string;
}
