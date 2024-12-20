interface IUserInfo {
  FULL_NAME: string;
  INN: string;
  BUSINESS: string;
  PINFL: string;
  CERTIFICATE_NUMBER: string;
  VALID_DATE: string;
}

export function extractInfo(data: IUserInfo[]) {
  return data.map((item) => {
    const FILE_NAME = item.name;

    const { alias } = item;

    const cnMatch = /cn=([^,]+)/i.exec(alias);
    const FULL_NAME = cnMatch && cnMatch[1] ? cnMatch[1].toUpperCase() : null;

    const uidMatch = /uid=([^,]+)/i.exec(alias);
    const INN = uidMatch && uidMatch[1] ? uidMatch[1] : null;

    // VALID To
    const validToMatch = /validto=([^,]+)/i.exec(alias);
    const VALID_DATE = (validToMatch && validToMatch[1]) ?? null;

    // CERTIFICATE NUMBER
    const certificateNumberMatch = /serialNumber=([^,]+)/i.exec(alias);
    const CERTIFICATE_NUMBER =
      certificateNumberMatch && certificateNumberMatch[1]
        ? certificateNumberMatch[1].toUpperCase()
        : null;

    // Business
    const businessMatch = /o=([^,]+)/i.exec(alias);
    const BUSINESS =
      businessMatch && businessMatch[1] ? businessMatch[1].toUpperCase() : null;

    // PINFL
    const pinflMatch = /1\.2\.860\.3\.16\.1\.2=([a-fA-F\d]+)/i.exec(alias);
    const PINFL = pinflMatch && pinflMatch[1] ? pinflMatch[1] : null;

    // Returning the extracted values
    return {
      FILE_NAME,
      FULL_NAME,
      INN,
      BUSINESS,
      PINFL,
      CERTIFICATE_NUMBER,
      VALID_DATE,
    };
  });
}
