import { auth, currentUser } from "@clerk/nextjs/server";

function parseAllowlist(value?: string, lowercase = false) {
  return new Set(
    (value ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => (lowercase ? entry.toLowerCase() : entry)),
  );
}

function getAdminAllowlist() {
  return {
    userIds: parseAllowlist(process.env.WHITELISTED_USERS),
    emails: parseAllowlist(process.env.CLERK_ADMIN_EMAILS, true),
  };
}

export async function getAdminAccessState() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return {
      status: "signed-out" as const,
      redirectToSignIn,
    };
  }

  const { userIds, emails } = getAdminAllowlist();
  const user = await currentUser();
  const userEmails = (user?.emailAddresses ?? []).map((entry) =>
    entry.emailAddress.toLowerCase(),
  );
  const primaryEmail =
    user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null;
  const isAllowed =
    userIds.has(userId) || userEmails.some((email) => emails.has(email));

  if (!isAllowed) {
    return {
      status: "forbidden" as const,
      userId,
      email: primaryEmail,
    };
  }

  return {
    status: "allowed" as const,
    userId,
    email: primaryEmail,
  };
}

export async function requireAdminAccess() {
  const access = await getAdminAccessState();
  if (access.status !== "allowed") {
    throw new Error("Unauthorized admin access.");
  }

  return access;
}
