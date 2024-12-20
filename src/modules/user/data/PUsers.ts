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

export const tableHead = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("users"),
      key: "first_name",
      hasSort: true,
    },
    {
      title: t("count_of_transactions"),
      key: "deals_count",
      hasSort: true,
    },
    {
      title: t("last_enter_date"),
      key: "last_login",
      hasSort: true,
    },
    {
      title: t("source"),
      key: "devices",
      hasSort: true,
    },
    {
      title: t("registered_date"),
      key: "date_joined",
      hasSort: true,
    },
    {
      title: t("status"),
      key: "status",
      hasSort: true,
    },
    {
      title: t("action"),
      key: "action",
    },
  ];
};

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
      title: t("there_is_no_responses_for_your_request"),
    },
  };
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
      label: t("delete"),
      icon: "icon-trash text-red-3",
      event: "delete",
    },
  ];
};
