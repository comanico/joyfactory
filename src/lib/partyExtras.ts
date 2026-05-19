export const PARTY_EXTRA_IDS = [
  "customDecor",
  "photoMagnets",
  "heliumBalloons",
  "pinata",
  "vr",
  "extraChild",
] as const;

export type PartyExtraId = (typeof PARTY_EXTRA_IDS)[number];

/** Material Symbols icon per add-on */
export const PARTY_EXTRA_ICONS: Record<PartyExtraId, string> = {
  customDecor: "palette",
  photoMagnets: "photo_camera",
  heliumBalloons: "celebration",
  pinata: "cake",
  vr: "sports_esports",
  extraChild: "child_care",
};
