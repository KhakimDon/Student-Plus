<template>
  <SearchWrapper
    :search="searchText"
    :has-selected-value="hasSelectedValue"
    :show-selection-suffix="showSelectionSuffix"
    :search-content="searchContent"
    :input-label="inputLabel"
    :input-placeholder="inputPlaceholder"
    :loading="loading"
    :is-focused="isFocused"
    :with-selected="withSelected"
    :type="type"
    :see-all="seeAll"
    @handle-update-search="$emit('update:searchValue', $event)"
    @clear="$emit('clear')"
    @see-all="$emit('seeAll')"
    @focus="$emit('focus')"
    @remove-focus="$emit('removeFocus')"
    @key-pressed="$emit('keyPressed')"
  >
    <template #value>
      <slot v-if="searchContent?.length" name="value" />
    </template>
    <template #empty>
      <slot name="empty" />
    </template>
  </SearchWrapper>
</template>

<script setup lang="ts">
import SearchWrapper from "@/components/Base/Form/Select/Search/Wrapper.vue";
import { ICompany } from "@/types/company";

interface Props {
  searchText?: string;
  inputLabel: string;
  inputPlaceholder: string;
  hasSelectedValue?: boolean;
  withSelected?: boolean;
  isFocused?: boolean;
  loading?: boolean;
  showSelectionSuffix?: boolean;
  seeAll?: boolean;
  searchContent: ICompany[];
  type?: "focus" | "search";
}

defineProps<Props>();

defineEmits<{
  (e: "update:searchValue", value: string): void;
  (e: "clear"): void;
  (e: "seeAll"): void;
  (e: "focus"): void;
  (e: "removeFocus"): void;
  (e: "keyPressed"): void;
}>();
</script>

<style scoped>
.fade-enter-active {
  animation: Fade 0.2s ease;
}
.fade-leave-active {
  animation: Fade 0.2s ease reverse;
}

@keyframes Fade {
  from {
    transform: translateY(-5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.slideDown-enter-active {
  animation: slideDown 0.2s linear;
}
.slideDown-leave-active {
  animation: slideDown 0.2s linear reverse;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* slightly transparent fallback */
.backdrop-blur {
  background-color: rgba(7, 9, 28, 0.12);
}

/* if backdrop support: very transparent and blurred */
@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .backdrop-blur {
    background-color: rgba(7, 9, 28, 0.12);
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
  }
}
</style>
