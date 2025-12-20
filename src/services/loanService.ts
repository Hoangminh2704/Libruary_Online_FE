import axiosClient from "./axiosClient";
import type { LoanItem } from "../types/loan.types";

export const loanService = {
  createLoan: async (copyId: number, dueDate?: string): Promise<LoanItem> => {
    // Try different possible field names that backend might expect
    const payload: Record<string, number | string> = { copyId };
    if (dueDate) {
      // Convert YYYY-MM-DD to ISO 8601 format with time
      const dueDateObj = new Date(dueDate);
      dueDateObj.setHours(23, 59, 59, 999); // Set to end of day
      const isoDate = dueDateObj.toISOString();
      payload.dueDate = isoDate;
    }
    console.log("📤 Create loan payload:", payload);
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
    const payload = handledByAdminId ? { handledBy: handledByAdminId } : {};
    console.log("📤 Return loan payload:", { loanId: id, payload });
    const response = await axiosClient.post<LoanItem>(
      `/loans/${id}/return`,
      payload
    );
    return response as unknown as LoanItem;
  },
};
