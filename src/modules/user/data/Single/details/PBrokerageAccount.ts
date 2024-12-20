import { useI18n } from "vue-i18n";

export const tableSettings = () => {
  const { t } = useI18n();
  return {
    indicator: {
      show: true,
      key: "is_active",
      colors: [
        { label: t("active"), color: "green", value: true },
        { label: t("inactive"), color: "gray", value: false },
      ],
    },
    noData: {
      image: "/images/no-data/brokerage-account.svg",
      title: t("brokerage_account_not_created"),
      subtitle: t("here_show_brokerage_accounts"),
    },
  };
};

export const tableHead = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("brokerage_account"),
      key: "account_number",
      hasSort: true,
    },
    {
      title: t("today_profit"),
      key: "profit",
      hasSort: true,
    },
    {
      title: t("account_created_date"),
      key: "created_at",
      hasSort: true,
    },
    {
      title: t("action"),
      key: "action",
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
