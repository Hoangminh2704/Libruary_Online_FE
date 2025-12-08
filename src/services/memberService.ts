import axiosClient from "./axiosClient";
import type { Member } from "../types/member.types";

export const memberService = {
  getAllMembers: async (): Promise<Member[]> => {
    const response = await axiosClient.get<Member[]>("/members");
    return response as unknown as Member[];
  },

  getMemberById: async (id: number): Promise<Member> => {
    const response = await axiosClient.get<Member>(`/members/${id}`);
    return response as unknown as Member;
  },

  updateStatus: async (id: number, status: string): Promise<Member> => {
    const response = await axiosClient.patch<Member>(`/members/${id}/status`, {
      status,
    });
    return response as unknown as Member;
  },

  deleteMember: async (id: number): Promise<void> => {
    await axiosClient.delete(`/members/${id}`);
  },
};
