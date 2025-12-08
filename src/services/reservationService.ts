import axiosClient from "./axiosClient";
import type { ReservationItem } from "../types/reservation.types";

export const reservationService = {
  createReservation: async (
    bookId: number,
    startDate?: string,
    endDate?: string
  ): Promise<ReservationItem> => {
    const payload: { bookId: number; startDate?: string; endDate?: string } = {
      bookId,
    };
    if (startDate) payload.startDate = startDate;
    if (endDate) payload.endDate = endDate;

    const response = await axiosClient.post("/reservations", payload);
    return response as unknown as ReservationItem;
  },

  getMyReservations: async (): Promise<ReservationItem[]> => {
    const response = await axiosClient.get("/reservations");
    return response as unknown as ReservationItem[];
  },

  getReservationById: async (id: number): Promise<ReservationItem> => {
    const response = await axiosClient.get(`/reservations/${id}`);
    return response as unknown as ReservationItem;
  },

  cancelReservation: async (
    reservationId: number
  ): Promise<ReservationItem> => {
    const response = await axiosClient.post(
      `/reservations/${reservationId}/cancel`
    );
    return response as unknown as ReservationItem;
  },
};
