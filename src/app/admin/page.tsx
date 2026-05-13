import Navbar from "@/app/components/Navbar";
import { prisma } from "../../../lib/prisma";
import { packageLabel } from "@/lib/packageLabels";
import { formatBucharestDate, formatBucharestTime } from "../../../lib/bucharestTime";
import { getServerLang, getServerT } from "@/i18n/server";
import { getAdminAccessState } from "@/lib/adminAuth";
import { deleteReservationAction } from "./actions";
import DeleteReservationButton from "./DeleteReservationButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const lang = await getServerLang();
  const t = await getServerT(lang);
  const access = await getAdminAccessState();

  if (access.status === "signed-out") {
    return access.redirectToSignIn({ returnBackUrl: "/admin" });
  }

  if (access.status === "forbidden") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-surface px-6 pb-24 pt-8 md:px-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-outline-variant/30 bg-white p-8 shadow-xl">
            <p className="text-sm font-headline font-bold uppercase tracking-widest text-on-surface-variant">
              {t("admin.title")}
            </p>
            <h1 className="mt-2 text-3xl font-headline font-extrabold text-primary">
              {t("admin.unauthorized")}
            </h1>
            <p className="mt-4 text-on-surface-variant">
              {t("admin.signedInAs")}: {access.email ?? access.userId}
            </p>
          </div>
        </main>
      </>
    );
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      packageType: true,
      zone: true,
      startTime: true,
      durationHours: true,
      numberOfGuests: true,
      status: true,
      paymentStatus: true,
      stripeSessionId: true,
      stripePaymentIntentId: true,
      depositPaid: true,
      depositAmount: true,
      fullAmount: true,
      createdAt: true,
    },
    take: 200,
  });
  const currencyFormatter = new Intl.NumberFormat(
    lang === "en" ? "en-US" : "ro-RO",
    {
      style: "currency",
      currency: "RON",
    },
  );

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
              <table className="min-w-[1800px] w-full text-left">
                <thead className="bg-surface-container">
                  <tr className="text-xs font-headline font-extrabold uppercase tracking-widest text-on-surface-variant">
                    <th className="px-6 py-4">{t("admin.when")}</th>
                    <th className="px-6 py-4">{t("admin.name")}</th>
                    <th className="px-6 py-4">{t("admin.phone")}</th>
                    <th className="px-6 py-4">{t("admin.email")}</th>
                    <th className="px-6 py-4">{t("admin.package")}</th>
                    <th className="px-6 py-4">{t("admin.zone")}</th>
                    <th className="px-6 py-4">{t("admin.guests")}</th>
                    <th className="px-6 py-4">{t("admin.status")}</th>
                    <th className="px-6 py-4">{t("admin.payment")}</th>
                    <th className="px-6 py-4">{t("admin.amounts")}</th>
                    <th className="px-6 py-4">{t("admin.stripe")}</th>
                    <th className="px-6 py-4">{t("admin.bookingId")}</th>
                    <th className="px-6 py-4">{t("admin.created")}</th>
                    <th className="px-6 py-4 text-center">{t("admin.actions")}</th>
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
                    const fullName =
                      [b.firstName, b.lastName].filter(Boolean).join(" ") || "—";

                    return (
                      <tr key={b.id} className="text-sm">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-headline font-bold text-primary">
                            {formatBucharestDate(b.startTime)}
                          </div>
                          <div className="text-on-surface-variant font-medium">
                            {timeLine}
                          </div>
                          <div className="text-xs text-on-surface-variant mt-1">
                            {b.durationHours}
                            {t("admin.hoursShort")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-headline font-bold text-on-surface">
                            {fullName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                          {b.phone ?? "—"}
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {b.email ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex bg-primary text-on-primary px-4 py-2 rounded-full font-headline font-extrabold">
                            {packageLabel({ packageType: b.packageType, lang })}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                          {b.zone}
                        </td>
                        <td className="px-6 py-4 font-headline font-bold whitespace-nowrap">
                          {b.numberOfGuests}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-headline font-bold text-on-surface">
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-headline font-bold text-primary">
                            {t("admin.deposit")}:{" "}
                            {currencyFormatter.format(b.depositAmount / 100)}
                          </div>
                          <div className="text-on-surface-variant">
                            {t("admin.total")}:{" "}
                            {currencyFormatter.format(b.fullAmount / 100)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant">
                          <div className="font-headline font-bold text-on-surface">
                            {t("admin.paymentIntent")}
                          </div>
                          <div className="mt-1 break-all font-mono">
                            {b.stripePaymentIntentId ?? "—"}
                          </div>
                          <div className="mt-3 font-headline font-bold text-on-surface">
                            {t("admin.session")}
                          </div>
                          <div className="mt-1 break-all font-mono">
                            {b.stripeSessionId ?? "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-on-surface-variant break-all">
                          {b.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-on-surface-variant">
                          {formatBucharestDate(b.createdAt)}{" "}
                          {formatBucharestTime(b.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <form action={deleteReservationAction}>
                            <input type="hidden" name="bookingId" value={b.id} />
                            <DeleteReservationButton
                              label={t("admin.delete")}
                              confirmMessage={t("admin.deleteConfirm")}
                              pendingLabel={t("admin.deleting")}
                            />
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                  {bookings.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-10 text-on-surface-variant"
                        colSpan={14}
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

