"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";
import { requireAdminAccess } from "@/lib/adminAuth";

export async function deleteReservationAction(formData: FormData) {
  await requireAdminAccess();

  const bookingId = formData.get("bookingId");
  if (typeof bookingId !== "string" || !bookingId.trim()) {
    throw new Error("Missing booking id.");
  }

  await prisma.booking.deleteMany({
    where: { id: bookingId.trim() },
  });

  revalidatePath("/admin");
}
