import { useI18n } from "vue-i18n";

export const nonClearableKeys = ["limit", "search"];

export const useUsersPOTableKeys = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("users"),
      key: "full_name",
      hasSort: true,
    },
    {
      title: t("email"),
      key: "email",
      hasSort: true,
    },
    {
      title: t("group"),
      key: "backoffice_role",
      hasSort: true,
    },
    {
      title: t("create_date"),
      key: "date_joined",
      hasSort: true,
    },
    {
      title: t("action"),
      key: "action",
    },
  ];
};

export const useTagsTableKeys = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("tags_page.table_header.title"),
      key: "title",
      hasSort: true,
    },
    {
      title: t("tags_page.table_header.date"),
      key: "created_at",
      hasSort: true,
    },
    {
      title: t("tags_page.table_header.news_count"),
      key: "news_count",
      hasSort: true,
    },
    {
      title: t("tags_page.table_header.actions"),
      key: "actions",
    },
  ];
};

export const useHistorySettingsKeys = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("settings_page.table_headers.mediafile"),
      key: "cover_image",
      hasSort: true,
    },
    {
      title: t("settings_page.table_headers.title"),
      key: "title",
      hasSort: true,
    },
    {
      title: t("settings_page.table_headers.elements"),
      key: "items",
      hasSort: true,
    },
    {
      title: t("settings_page.table_headers.date"),
      key: "created_at",
      hasSort: true,
    },
    {
      title: t("settings_page.table_headers.actions"),
      key: "actions",
    },
  ];
};

export const useTagsTableSingleKeys = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("tags_single.title"),
      key: "media",
    },
    {
      title: t("tags_single.title"),
      key: "title",
      hasSort: true,
      sortValue: "title",
    },
    {
      title: t("tags_single.views"),
      key: "views",
    },
    {
      title: t("tags_single.date"),
      key: "date",
    },
    {
      title: t("tags_single.actions"),
      key: "actions",
    },
  ];
};

export const useNewsTableKeys = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: t("tags_single.title"),
      key: "cover_image",
      hasSort: true,
    },
    {
      title: t("tags_single.title"),
      key: "title",
      hasSort: true,
    },
    {
      title: t("tags"),
      key: "tag",
      hasSort: true,
    },
    {
      title: t("tags_single.date"),
      key: "created_at",
      hasSort: true,
    },
    {
      title: t("tags_single.views"),
      key: "views_count",
      hasSort: true,
    },
    {
      title: t("tags_single.actions"),
      key: "actions",
    },
  ];
};
