export const PACKAGE_LABELS: Record<string, string> = {
  basic: "Basic Fun",
  premium: "Premium Joy",
  vip: "VIP Utopia",
};

export function packageLabel(packageType: string) {
  return PACKAGE_LABELS[packageType] ?? packageType;
}
