export function getUserFullName(user?: {
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
}) {
  if (!user || typeof user !== "object") return "";

  const firstName = user.first_name ?? "";
  const lastName = user.last_name ?? "";
  const middleName = user.middle_name ?? "";
  return `${firstName} ${lastName} ${middleName}`.trim();
}
