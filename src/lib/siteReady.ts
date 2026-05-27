/** Whole site is live when READY=1; READY=0 redirects visitors to /under-construction. */
export function isSiteReady(): boolean {
  return process.env.READY === "1";
}

/** Café menu is published when MENU_READY=1; otherwise only the menu section on /cafe shows under construction. */
export function isMenuReady(): boolean {
  return process.env.MENU_READY === "1";
}
