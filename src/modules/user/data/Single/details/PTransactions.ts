import { useI18n } from "vue-i18n";

export const filterVerificationStatus = () => {
  const { t } = useI18n();
  return [
    {
      name: t("all"),
      key: "all",
    },
    {
      name: t("user_status.verified"),
      key: "true",
    },
    {
      name: t("user_status.unverified"),
      key: "false",
    },
  ];
};

export const filterActivityStatus = () => {
  const { t } = useI18n();
  return [
    {
      name: t("all"),
      key: "all",
    },
    {
      name: t("active"),
      key: "true",
    },
    {
      name: t("inactive"),
      key: "false",
    },
  ];
};

export const filterNationalityStatus = () => {
  const { t } = useI18n();
  return [
    {
      name: t("all"),
      key: "all",
    },
    {
      name: t("uzbekistan_citizenship"),
      key: "true",
    },
    {
      name: t("foreign_citizenship"),
      key: "false",
    },
  ];
};

export const tableHead = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("finance_tool"),
      key: "stock",
      hasSort: true,
    },
    {
      title: t("trade"),
      key: "type",
      hasSort: true,
    },
    {
      title: t("piece_of_stock"),
      key: "quantity",
      hasSort: true,
    },
    {
      title: t("brokerage_account"),
      key: "account_number",
      hasSort: true,
    },
    {
      title: t("for_sale"),
      key: "price",
      hasSort: true,
    },
    {
      title: t("sum"),
      key: "total_amount",
      hasSort: true,
    },
    {
      title: t("deal_date"),
      key: "order_draw_date",
      hasSort: true,
    },
  ];
};

export const tableActions = () => {
  const { t } = useI18n();

  return [
    {
      label: t("look"),
      icon: "icon-eye text-yellow-dark",
      event: "open-user",
    },
    {
      label: t("edit"),
      icon: "icon-edit text-yellow-dark",
      event: "edit",
    },
    {
      label: t("delete"),
      icon: "icon-trash text-red-3",
      event: "delete",
    },
  ];
};
