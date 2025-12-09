import axiosClient from "./axiosClient";
import type { LoanItem } from "../types/loan.types";

export const loanService = {
  createLoan: async (copyId: number, dueDate?: string): Promise<LoanItem> => {
    const payload: { copyId: number; dueDate?: string } = { copyId };
    if (dueDate) {
      payload.dueDate = dueDate;
    }
    const response = await axiosClient.post<LoanItem>("/loans/borrow", payload);
    return response as unknown as LoanItem;
  },

  getMyLoans: async (): Promise<LoanItem[]> => {
    const response = await axiosClient.get<LoanItem[]>("/loans");
    return response as unknown as LoanItem[];
  },

  getLoanById: async (id: number): Promise<LoanItem> => {
    const response = await axiosClient.get<LoanItem>(
      `/loans/${id}?include=copy.book.authors,member.user`
    );
    return response as unknown as LoanItem;
  },

  renewLoan: async (loanId: number): Promise<LoanItem> => {
    const response = await axiosClient.post<LoanItem>(`/loans/${loanId}/renew`);
    return response as unknown as LoanItem;
  },

  returnBook: async (loanId: number): Promise<LoanItem> => {
    const response = await axiosClient.post<LoanItem>(
      `/loans/${loanId}/return`
    );
    return response as unknown as LoanItem;
  },

  returnLoan: async (
    id: number,
    handledByAdminId?: number
  ): Promise<LoanItem> => {
    const payload = handledByAdminId ? { handledByAdminId } : {};
    const response = await axiosClient.post<LoanItem>(
      `/loans/${id}/return`,
      payload
    );
    return response as unknown as LoanItem;
  },
};
