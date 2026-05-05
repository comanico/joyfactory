"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "funfactory_gdpr_consent";
const SESSION_SEEN_KEY = "funfactory_gdpr_seen_this_session";
const VERSION = "1.0";

export default function GdprConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const hasStoredConsent = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.localStorage.getItem(CONSENT_KEY));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(CONSENT_KEY)) return;

    // Only show once per session (no re-popups on route changes).
    if (window.sessionStorage.getItem(SESSION_SEEN_KEY)) return;
    window.sessionStorage.setItem(SESSION_SEEN_KEY, "1");

    setIsVisible(true);
  }, []);

  const logConsentToServer = async (prefs: Preferences) => {
    await fetch("/api/gdpr-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: null,
        preferences: prefs,
        timestamp: new Date().toISOString(),
        version: VERSION,
      }),
    });
  };

  const saveConsent = async (prefs: Preferences) => {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        ...prefs,
        timestamp: new Date().toISOString(),
        version: VERSION,
      }),
    );

    // Fire-and-forget logging (UX first); errors shouldn't block closing.
    try {
      await logConsentToServer(prefs);
    } catch {
      // ignore
    }

    setIsVisible(false);
  };

  const accept = () => saveConsent(preferences);
  const rejectAll = () =>
    saveConsent({ necessary: true, analytics: false, marketing: false });

  const togglePreference = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (hasStoredConsent || !isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[9999] md:hidden" />

      <div className="fixed bottom-0 left-0 right-0 z-[10000] bg-[#efffd9] border-t-4 border-[#63367c] shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-md rounded-3xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#63367c] text-3xl">
              cookie
            </span>
            <h2 className="font-headline font-black text-[#63367c] text-2xl tracking-tighter">
              {t("gdpr.title")}
            </h2>
          </div>

          <p className="text-[#0e2000] text-sm leading-relaxed mb-6">
            {t("gdpr.body")}{" "}
            <Link href="/privacy" className="underline hover:text-[#63367c]">
              {t("gdpr.fullPolicy")}
            </Link>
            .
          </p>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 mb-6 space-y-5 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#63367c]">
                  shield
                </span>
                <div>
                  <span className="font-headline font-bold">{t("gdpr.necessary")}</span>
                  <p className="text-xs text-on-surface-variant">
                    {t("gdpr.necessaryDesc")}
                  </p>
                </div>
              </div>
              <span className="px-4 py-1 bg-[#63367c] text-white text-xs rounded-full font-medium">
                {t("gdpr.alwaysOn")}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#63367c]">
                  bar_chart
                </span>
                <div>
                  <span className="font-headline font-bold">{t("gdpr.analytics")}</span>
                  <p className="text-xs text-on-surface-variant">
                    {t("gdpr.analyticsDesc")}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference("analytics")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#63367c]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#63367c]"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#63367c]">
                  campaign
                </span>
                <div>
                  <span className="font-headline font-bold">{t("gdpr.marketing")}</span>
                  <p className="text-xs text-on-surface-variant">
                    {t("gdpr.marketingDesc")}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference("marketing")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#63367c]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#63367c]"></div>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={rejectAll}
              className="flex-1 py-4 rounded-2xl border-2 border-[#63367c] text-[#63367c] font-headline font-bold hover:bg-[#63367c]/10 transition-colors"
            >
              {t("gdpr.onlyNecessary")}
            </button>
            <button
              onClick={accept}
              className="flex-1 py-4 rounded-2xl bg-[#63367c] text-white font-headline font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              {t("gdpr.accept")}
            </button>
          </div>

          <p className="text-[#0e2000]/60 text-xs text-center mt-4">
            {t("gdpr.changeLater")}
          </p>
        </div>
      </div>
    </>
  );
}

