import Navbar from "@/app/components/Navbar";
import { prisma } from "../../../lib/prisma";
import { packageLabel } from "@/lib/packageLabels";
import { formatBucharestDate, formatBucharestTime } from "../../../lib/bucharestTime";
import { getServerLang, getServerT } from "@/i18n/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const lang = await getServerLang();
  const t = await getServerT(lang);
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      packageType: true,
      startTime: true,
      durationHours: true,
      numberOfGuests: true,
      status: true,
      paymentStatus: true,
      depositPaid: true,
      depositAmount: true,
      fullAmount: true,
      createdAt: true,
    },
    take: 200,
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-24 pt-8 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-headline font-bold uppercase tracking-widest text-on-surface-variant">
                {t("admin.title")}
              </p>
              <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-primary">
                {t("admin.reservations")}
              </h1>
              <p className="text-on-surface-variant mt-2">
                {t("admin.tzNote")}
              </p>
            </div>
            <div className="bg-secondary-container text-on-secondary-container px-5 py-3 rounded-full font-headline font-bold">
              {bookings.length} {t("admin.latest")}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-outline-variant/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-left">
                <thead className="bg-surface-container">
                  <tr className="text-xs font-headline font-extrabold uppercase tracking-widest text-on-surface-variant">
                    <th className="px-6 py-4">{t("admin.when")}</th>
                    <th className="px-6 py-4">{t("admin.package")}</th>
                    <th className="px-6 py-4">{t("admin.guests")}</th>
                    <th className="px-6 py-4">{t("admin.email")}</th>
                    <th className="px-6 py-4">{t("admin.status")}</th>
                    <th className="px-6 py-4">{t("admin.payment")}</th>
                    <th className="px-6 py-4">{t("admin.deposit")}</th>
                    <th className="px-6 py-4">{t("admin.bookingId")}</th>
                    <th className="px-6 py-4">{t("admin.created")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {bookings.map((b) => {
                    const end = new Date(
                      b.startTime.getTime() + b.durationHours * 60 * 60_000,
                    );
                    const timeLine =
                      b.packageType === "vip"
                        ? t("reservation.wholeDay")
                        : `${formatBucharestTime(b.startTime)}–${formatBucharestTime(end)}`;

                    return (
                      <tr key={b.id} className="text-sm">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-headline font-bold text-primary">
                            {formatBucharestDate(b.startTime)}
                          </div>
                          <div className="text-on-surface-variant font-medium">
                            {timeLine}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex bg-primary text-on-primary px-4 py-2 rounded-full font-headline font-extrabold">
                            {packageLabel({ packageType: b.packageType, lang })}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-headline font-bold">
                          {b.numberOfGuests}
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {b.email ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-headline font-bold text-on-surface">
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-headline font-bold text-on-surface">
                            {b.paymentStatus}
                          </span>
                          {b.depositPaid ? (
                            <div className="text-green-700 font-semibold">
                              {t("admin.paid")}
                            </div>
                          ) : (
                            <div className="text-on-surface-variant">
                              {t("admin.notPaid")}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-headline font-bold text-primary">
                          {(b.depositAmount / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-on-surface-variant break-all">
                          {b.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-on-surface-variant">
                          {formatBucharestDate(b.createdAt)}{" "}
                          {formatBucharestTime(b.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                  {bookings.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-10 text-on-surface-variant"
                        colSpan={9}
                      >
                        {t("admin.noReservations")}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

