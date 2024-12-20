import { useI18n } from "vue-i18n";
import { LocationQueryValue } from "vue-router";

import router from "@/router";
import { ERole, IMedia, IMediaData, TRole } from "@/types/common";
import { IDistrict, IRegion } from "@/types/company";

export const changeNumberFormat = (number: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export function formatMoneyDecimal(number: number, fix = 2, useUnits = false) {
  if (isNaN(number) || number == 0) {
    return 0;
  }

  // Handle large number formatting if useUnits is true
  if (useUnits && number >= 1000) {
    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;

    while (number >= 1000 && unitIndex < units.length - 1) {
      number /= 1000;
      unitIndex++;
    }

    return `${parseFloat(number.toFixed(1))}${units[unitIndex]}`;
  }

  // Convert to a number and fix to the specified decimal places
  const formattedAmount = Number(number).toFixed(fix);

  // Split the integer and decimal parts
  const [integerPart, decimalPart] = formattedAmount.split(".");

  // Add spaces as thousand separators to the integer part
  const spacedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Return the result without the decimal part if it's '00'
  return decimalPart === "00" || !decimalPart
    ? spacedIntegerPart
    : `${spacedIntegerPart}.${decimalPart}`;
}

export async function updateQueryParams(
  key: string,
  value: string | undefined | LocationQueryValue[]
) {
  const route = router.currentRoute.value;
  const queryParams = { ...route.query };
  if (queryParams[key]) {
    queryParams[key] = value;
  } else {
    queryParams[key] = value;
  }
  await router.replace({ name: route.name || "Dashboard", query: queryParams });
}

export function convertBytes(bytes: number) {
  const sizes = ["B", "Kb", "Mb", "Gb", "Tb"];

  if (bytes === 0) return "0 B";

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

export const getFullAddress = (region: IRegion, district: IDistrict) => {
  if (!region && !district) return "-";
  else if (!region && district) return `${district?.name}`;
  else if (region && !district) return `${region?.name}`;
  else return `${region?.name}, ${district?.name}`;
};

export function getRoleText(role: TRole) {
  const { t } = useI18n();
  const roleNames: Record<TRole, string> = {
    [ERole.OWNER]: t("owner"),
    [ERole.ADMIN]: t("review_business_admin"),
    [ERole.MODERATOR]: t("review_business_moderator"),
    [ERole.OBSERVER]: t("viewer"),
  };
  return roleNames[role];
}

export function getMediaList(data: IMediaData) {
  return data?.medias?.map((el: IMedia) => {
    return {
      ...el,
      media: el,
    };
  });
}

export function getPercentage(value: number, total: number): string | number {
  const percentage = (value / total) * 100;
  return percentage.toFixed(1);
}

function base64ToFile(base64Data: string, name?: string) {
  const base64File = base64Data.split(",")[1];
  const fileName = `${name ?? "image"}.png`;
  const byteCharacters = atob(base64File);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArrays], { type: "image/png" });

  return new File([blob], fileName, { type: "image/png" });
}

export function isValidSlug(slug: string) {
  // Define a regular expression for a valid slug
  const slugRegex = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;

  // Test the input slug against the regular expression
  return slugRegex.test(slug);
}

export function getTimeText(minutes: number) {
  const { t } = useI18n();
  if (minutes < 60) {
    return t("minutes", { count: minutes });
  } else if (minutes < 3600) {
    return t("hours", { count: Math.floor(minutes / 60) });
  } else {
    return t("days", { count: Math.floor(minutes / 3600) });
  }
}

export function getStockPrefix(type: "buy" | "sell") {
  return type === "buy" ? "+" : "-";
}

export const downloadFile = (file: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = file;
  link.target = "_blank";
  link.download = fileName;

  // Simulate a click on the element <a>
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function getFileNameFromUrl(url: string) {
  try {
    // Create a new URL object to safely parse the URL
    const parsedUrl = new URL(url);

    // Get the pathname and split it to extract the last segment
    const pathname = parsedUrl.pathname;
    const segments = pathname.split("/");

    // Return the last segment as the file name
    return segments.pop() || null;
  } catch (error) {
    console.error("Invalid URL:", error.message);
    return null; // Return null if the URL is invalid
  }
}

export function getObjectKeys(obj: Record<string, unknown>) {
  if (typeof obj !== "object" || obj === null) {
    // console.error("Object is not an object or is null");
    return;
  }
  return Object.keys(obj);
}
