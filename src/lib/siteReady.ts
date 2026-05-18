/** Site is live when READY=1; READY=0 shows the under-construction page. */
export function isSiteReady(): boolean {
  return process.env.READY === "1";
}
