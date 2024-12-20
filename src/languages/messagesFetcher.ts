import { CONFIG } from "@/config";

export default async (locale: string) => {
  const data = await fetch(
    `${CONFIG.COMMON_URL}/FrontendTranslation/${locale}/?source=backoffice`
  );
  return await data.json();
};
