import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminBookings } from "@/data/admin/bookings";
import type { AdminBooking, BookingStatus, CreateBookingInput, PaymentStatus } from "@/types/admin/booking";

let mockStore = [...adminBookings];

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface BookingApiResponse {
  id: number;
  booking_ref: string;
  experience: { id: number; title: string } | null;
  guest_name: string;
  room_number: string;
  mobile: string;
  email: string | null;
  visit_date: string;
  preferred_time: string;
  adults: number;
  children: number;
  guests: number;
  amount: number | null;
  payment_status: PaymentStatus;
  status: BookingStatus;
  special_request: string | null;
  created_at: string;
  updated_at: string;
}

function mapBooking(raw: BookingApiResponse): AdminBooking {
  return {
    id: raw.id,
    bookingRef: raw.booking_ref,
    experience: raw.experience,
    guestName: raw.guest_name,
    roomNumber: raw.room_number,
    mobile: raw.mobile,
    email: raw.email ?? "",
    visitDate: raw.visit_date,
    preferredTime: raw.preferred_time,
    adults: raw.adults,
    children: raw.children,
    guests: raw.guests,
    amount: raw.amount,
    paymentStatus: raw.payment_status,
    status: raw.status,
    specialRequest: raw.special_request ?? "",
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

function todayIso() {
  return new Date().toISOString();
}

export async function getBookings(): Promise<AdminBooking[]> {
  if (!isApiConfigured()) return mockStore;

  const result = await apiClient.get<ApiEnvelope<BookingApiResponse[]>>("/api/v1/admin/booking", {
    headers: authHeaders(),
  });
  if (!result.ok) return [];
  return result.data.data.map(mapBooking);
}

export async function getBookingById(id: number): Promise<AdminBooking | undefined> {
  if (!isApiConfigured()) return mockStore.find((item) => item.id === id);

  const result = await apiClient.get<ApiEnvelope<BookingApiResponse>>(`/api/v1/admin/booking/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) return undefined;
  return mapBooking(result.data.data);
}

/** Manual/front-desk entry — there's no separate admin-only create endpoint, so this posts to the same public `POST /api/v1/booking` the guest form uses. */
export async function createBooking(input: CreateBookingInput): Promise<AdminBooking> {
  if (!isApiConfigured()) {
    const now = todayIso();
    const created: AdminBooking = {
      id: Date.now(),
      bookingRef: `AYB-${Math.floor(1000 + Math.random() * 9000)}`,
      experience: null,
      guestName: input.guestName,
      roomNumber: input.roomNumber ?? "",
      mobile: input.mobile,
      email: input.email ?? "",
      visitDate: input.visitDate,
      preferredTime: input.preferredTime,
      adults: input.adults,
      children: input.children ?? 0,
      guests: input.adults + (input.children ?? 0),
      amount: null,
      paymentStatus: "Unpaid",
      status: "Pending",
      specialRequest: input.specialRequest ?? "",
      createdAt: now,
      updatedAt: now,
    };
    mockStore = [created, ...mockStore];
    return created;
  }

  const result = await apiClient.post<ApiEnvelope<BookingApiResponse>>("/api/v1/booking", {
    experience_id: input.experienceId,
    guest_name: input.guestName,
    room_number: input.roomNumber,
    mobile: input.mobile,
    email: input.email,
    visit_date: input.visitDate,
    preferred_time: input.preferredTime,
    adults: input.adults,
    children: input.children,
    special_request: input.specialRequest,
  });
  if (!result.ok) throw new Error(result.message);
  return mapBooking(result.data.data);
}

interface UpdateBookingInput {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  amount?: number;
}

async function updateBooking(id: number, input: UpdateBookingInput): Promise<AdminBooking | undefined> {
  if (!isApiConfigured()) {
    let updated: AdminBooking | undefined;
    mockStore = mockStore.map((item) => {
      if (item.id !== id) return item;
      updated = {
        ...item,
        status: input.status ?? item.status,
        paymentStatus: input.paymentStatus ?? item.paymentStatus,
        amount: input.amount ?? item.amount,
        updatedAt: todayIso(),
      };
      return updated;
    });
    return updated;
  }

  const body: Record<string, unknown> = {};
  if (input.status !== undefined) body.status = input.status;
  if (input.paymentStatus !== undefined) body.payment_status = input.paymentStatus;
  if (input.amount !== undefined) body.amount = input.amount;

  const result = await apiClient.patch<ApiEnvelope<BookingApiResponse>>(`/api/v1/admin/booking/${id}`, body, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
  return mapBooking(result.data.data);
}

export async function setBookingStatus(id: number, status: BookingStatus): Promise<void> {
  await updateBooking(id, { status });
}

export async function setBookingPaymentStatus(id: number, paymentStatus: PaymentStatus): Promise<void> {
  await updateBooking(id, { paymentStatus });
}

export async function setBookingAmount(id: number, amount: number): Promise<void> {
  await updateBooking(id, { amount });
}

export async function deleteBooking(id: number): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.filter((item) => item.id !== id);
    return;
  }

  const result = await apiClient.delete<ApiEnvelope<null>>(`/api/v1/admin/booking/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
}
