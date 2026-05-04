import { prisma } from "../../lib/prisma";

export type PublicReservation = {
  id: string;
  packageType: string;
  startTime: Date;
  durationHours: number;
  numberOfGuests: number;
  zone: string;
};

export async function getPublicReservationById(
  id: string,
): Promise<PublicReservation | null> {
  const booking = await prisma.booking.findFirst({
    where: {
      id,
      depositPaid: true,
      paymentStatus: "paid",
      status: { not: "cancelled" },
    },
    select: {
      id: true,
      packageType: true,
      startTime: true,
      durationHours: true,
      numberOfGuests: true,
      zone: true,
    },
  });
  return booking;
}
