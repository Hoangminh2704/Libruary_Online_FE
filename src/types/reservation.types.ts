export interface ReservationItem {
  id: number;
  memberId: number;
  bookId: number;
  status: "PENDING" | "FULFILLED" | "CANCELLED" | "EXPIRED";
  reservedAt: string;
  expiresAt: string;
  fulfilledAt?: string | null;
  cancelledAt?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;

  book?: {
    id: number;
    title: string;
    subtitle?: string | null;
    coverUrl?: string | null;
    authors?: Array<{
      author: {
        id: number;
        name: string;
      };
    }>;
  };

  member?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateReservationRequest {
  bookId: number;
  startDate?: string;
  endDate?: string;
}
