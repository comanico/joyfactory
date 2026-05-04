import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { getPublicReservationById } from "@/lib/bookings";
import { packageLabel } from "@/lib/packageLabels";
import { formatBucharestDate, formatBucharestTime } from "../../../../lib/bucharestTime";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const b = await getPublicReservationById(id);
  if (!b) return { title: "Reservation | JoyFactory" };
  return {
    title: `${packageLabel(b.packageType)} · ${formatBucharestDate(b.startTime)} | JoyFactory`,
    description: "Your party reservation details at JoyFactory.",
  };
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getPublicReservationById(id);
  if (!booking) notFound();

  const end = new Date(
    booking.startTime.getTime() + booking.durationHours * 60 * 60_000,
  );
  const isVip = booking.packageType === "vip";
  const timeLine = isVip
    ? "Whole day (VIP access)"
    : `${formatBucharestTime(booking.startTime)} – ${formatBucharestTime(end)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-24 pt-8 px-6 md:px-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Reservation confirmed
            </p>
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-primary">
              See you at JoyFactory
            </h1>
            <p className="text-on-surface-variant mt-3 text-base">
              Save this page — you can open it anytime before your party.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-outline-variant/30 p-8 md:p-10 space-y-8">
            <div>
              <p className="text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Package
              </p>
              <p className="inline-block bg-primary text-on-primary font-headline font-extrabold text-lg px-6 py-3 rounded-full shadow-sm">
                {packageLabel(booking.packageType)}
              </p>
            </div>

            <div>
              <p className="text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Date
              </p>
              <p className="text-xl font-headline font-bold text-primary">
                {formatBucharestDate(booking.startTime)}
              </p>
            </div>

            <div>
              <p className="text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Time
              </p>
              <p
                className={
                  isVip
                    ? "text-xl font-headline font-bold text-on-secondary-container bg-secondary-container/40 inline-block px-5 py-3 rounded-3xl"
                    : "text-xl font-headline font-bold text-primary border-2 border-primary inline-block px-5 py-3 rounded-3xl"
                }
              >
                {timeLine}
              </p>
            </div>

            <div>
              <p className="text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Guests included
              </p>
              <p className="text-lg font-headline font-bold text-on-surface">
                {booking.numberOfGuests}
              </p>
            </div>

            <div className="pt-4 border-t border-outline-variant/40">
              <p className="text-xs text-on-surface-variant mb-1">Zone</p>
              <p className="font-medium text-on-surface">{booking.zone}</p>
              <p className="text-xs text-on-surface-variant mt-4 font-mono break-all">
                Ref. {booking.id}
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary text-on-primary px-10 py-4 rounded-full font-headline font-bold text-lg hover:scale-[1.02] transition-transform shadow-md"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
