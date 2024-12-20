import { useRouteQuery } from "@vueuse/router";
import { onBeforeMount, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { useApi } from "@/composables/useApi";
import { useCustomToast } from "@/composables/useCustomToast";
import { usePagination } from "@/composables/usePagination";
import { IDefaultResponse } from "@/types/common";
import { updateQueryParams } from "@/utils";
import { debounce } from "@/utils/functions/common";

export function useTableFetch<TD = any>(
  url: string,
  params = {},
  itself?: boolean
) {
  const nonFilterQueries = ["showFilter"];

  const loading = ref(false);
  const { showToast } = useCustomToast();
  const { t } = useI18n();
  const route = useRoute();
  const filter = ref({});

  const paginationData = reactive({
    total: 0,
    limit: useRouteQuery<number>("limit", 10, { transform: Number }),
    page: useRouteQuery<number>("page", 1, { transform: Number }),
    offset: 0,
  });

  const { offset, changePage } = usePagination(
    ref(paginationData.limit),
    ref(paginationData.page)
  );

  const search = useRouteQuery<string>("search", "");

  const tableData = ref<TD[]>([]);
  const fetchTableData = () => {
    loading.value = true;
    useApi()
      .$get<IDefaultResponse>(url, {
        params: {
          ...route.query,
          ...params,
          page: undefined,
          search: search.value,
          limit: paginationData.limit,
          offset: (paginationData.page - 1) * paginationData.limit,
        },
      })
      .then((res) => {
        paginationData.total = res?.count;
        tableData.value = itself ? res : res?.results;
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          showToast(t("server_error"), "error");
        }
        // handleError(err?.response?.data);
      })
      .finally(() => (loading.value = false));
  };

  const filterTableData = async (obj: object) => {
    filter.value = obj;
    paginationData.offset = 0;
    paginationData.page = 1;
    if (route.query?.page) {
      await updateQueryParams("page", String(paginationData.page));
    }
    if (route.query?.offset) {
      await updateQueryParams("offset", String(paginationData.offset));
    }
    fetchTableData();
  };

  onBeforeMount(() => {
    const currentPage = Number(route.query.page);
    if (currentPage && +currentPage !== paginationData.page) {
      onPageChange(+currentPage);
    } else {
      fetchTableData();
    }
  });

  async function onSearch(text: string) {
    offset.value = 0;
    await onPageChange(1);
    search.value = text;
    debounce("search-merchant-search", () => fetchTableData(), 500);
  }

  const onPageChange = async (page: number) => {
    if (page && page !== paginationData.page) {
      paginationData.page = page;
      changePage(page);
      fetchTableData();
    }
  };

  const scrollToTop = () => {
    const tableEl = document.querySelector(".i-table");
    if (tableEl) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onChangeLimit = async (newLimit: number) => {
    paginationData.limit = newLimit;
    paginationData.page = 1;
    await onSearch(String(route.query.search || ""));
    scrollToTop();
  };

  const onSort = () => {
    fetchTableData();
  };

  watch(
    () => route.query,
    (newQuery, oldQuery) => {
      const allKeys = new Set([
        ...Object.keys(newQuery),
        ...Object.keys(oldQuery),
      ]);

      // Check if any relevant keys have been added, changed, or deleted
      const hasRelevantChanges = Array.from(allKeys).some((key) => {
        const isNonFilterQuery = nonFilterQueries.includes(key);

        // Ignore nonFilterQueries
        if (isNonFilterQuery) return false;

        // Check if the value has changed or the key has been removed
        return newQuery[key] !== oldQuery[key];
      });

      if (hasRelevantChanges) {
        fetchTableData();
      }
    },
    { deep: true }
  );

  return {
    offset,
    loading,
    tableData,
    paginationData,
    onSearch,
    onPageChange,
    onChangeLimit,
    fetchTableData,
    filterTableData,
    onSort,
  };
}
