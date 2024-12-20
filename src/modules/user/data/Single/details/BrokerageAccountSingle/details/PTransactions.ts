import { useI18n } from "vue-i18n";

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
      title: t("for_sale"),
      key: "price",
      hasSort: true,
    },
    {
      title: t("commission"),
      key: "commission",
      hasSort: true,
    },
    {
      title: t("sum"),
      key: "amount_with_commission",
      hasSort: true,
    },
    {
      title: t("status"),
      key: "status",
      hasSort: true,
    },
    {
      title: t("date_transactions"),
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
  ];
};
