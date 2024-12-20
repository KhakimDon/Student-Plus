<template>
  <div class="w-full">
    <FormGroup
      :label="inputLabel"
      for-text="search"
      label-class="text-sm text-gray-700 font-normal leading-130"
    >
      <Input
        id="search"
        :model-value="search"
        :placeholder="inputPlaceholder"
        prefix-class="leading-130"
        suffix-class="relative inline-block px-3"
        input-class="leading-130 text-sm font-medium pr-3 placeholder:font-normal"
        @focus="$emit('focus')"
        @focusout="$emit('removeFocus')"
        @update:model-value="handleUpdateSearch"
      >
        <template #prefix>
          <span
            class="icon-magnifer text-base text-blue-200 dark:text-blue-100"
          />
        </template>
        <template #suffix>
          <Transition mode="out-in" name="fade">
            <template v-if="withSelected">
              <template v-if="hasSelectedValue">
                <span
                  v-if="showSelectionSuffix"
                  class="icon-filled-tick-circle text-blue text-lg transition-200 leading-18"
                />
              </template>
              <template v-else>
                <template v-if="loading">
                  <div class="spinner" />
                </template>
                <template v-else>
                  <button
                    :class="{ '!opacity-100 !visible': search?.length }"
                    class="icon-xmark text-lg transition-200 leading-22 opacity-0 invisible"
                    @click="clear"
                  />
                </template>
              </template>
            </template>
            <template v-else>
              <template v-if="loading">
                <div class="spinner" />
              </template>
              <template v-else>
                <button
                  :class="{ '!opacity-100 !visible': search?.length }"
                  class="icon-xmark text-lg transition-200 leading-22 opacity-0 invisible"
                  @click="clear"
                />
              </template>
            </template>
          </Transition>
        </template>
      </Input>
    </FormGroup>
    <template v-if="type === 'search'">
      <Transition mode="out-in" name="dropdown">
        <div
          v-if="search && !hasSelectedValue && !loading"
          class="lg:relative w-full"
          @focusout.prevent.stop
        >
          <WrapperContent
            :loading="loading"
            :search-content="searchContent"
            :see-all="seeAll"
            @see-all="$emit('seeAll')"
          >
            <template #empty>
              <slot name="empty" />
            </template>
            <template #value>
              <slot name="value" />
            </template>
          </WrapperContent>
        </div>
      </Transition>
    </template>
    <template v-if="type === 'focus'">
      <Transition mode="out-in" name="dropdown">
        <div v-if="isFocused" class="lg:relative w-full" @focusout.prevent.stop>
          <WrapperContent
            :loading="loading"
            :search-content="searchContent"
            :see-all="seeAll"
            @see-all="$emit('seeAll')"
          >
            <template #empty>
              <slot name="empty" />
            </template>
            <template #value>
              <slot name="value" />
            </template>
          </WrapperContent>
        </div>
      </Transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from "vue";

import Input from "@/components/Base/Form/Input/FormInput.vue";
import WrapperContent from "@/components/Base/Form/Select/Search/WrapperContent.vue";
import FormGroup from "@/components/Form/Group/Group.vue";
import { ICompany } from "@/types/company";
import { debounce } from "@/utils/functions/common";

interface Props {
  search?: string;
  inputLabel: string;
  inputPlaceholder: string;
  hasSelectedValue?: boolean;
  showSelectionSuffix?: boolean;
  withSelected?: boolean;
  seeAll?: boolean;
  isFocused?: boolean;
  loading?: boolean;
  searchContent?: ICompany;
  wrapperClass?: string;
  type?: "focus" | "search";
}
const props = defineProps<Props>();
interface Emits {
  (e: "handleUpdateSearch", value: string): void;
  (e: "clear"): void;
  (e: "keyPressed"): void;
  (e: "seeAll"): void;
  (e: "focus"): void;
  (e: "removeFocus"): void;
}
const emit = defineEmits<Emits>();

function clear() {
  emit("clear");
}
const handleUpdateSearch = (value: string) => {
  debounce("search", () => {
    emit("handleUpdateSearch", value);
  });
};

onMounted(() => {
  document.getElementById("search")?.addEventListener("keypress", (e) => {
    if (e.code === "Enter" && props?.search?.length) {
      emit("keyPressed");
    }
  });
});

defineComponent({
  name: "SearchWrapper",
});
</script>

<style>
.list {
  max-height: 225px;
  overflow-y: auto;
}
.list li {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
}
.list li a {
  padding: 10px 10px 10px 0 !important;
}
.list li:first-child {
  border-radius: 4px 4px 0 0;
}

.list li:last-child {
  border-radius: 0 0 12px 12px;
}

.list li:hover {
  background-color: rgba(118, 129, 148, 0.11);
}
.list::-webkit-scrollbar {
  width: 3px;
  background-color: #ecf3fa;
}

.list::-moz-scrollbar {
  height: 1px;
  background-color: #c6cfd7;
}

.list::-ms-scrollbar {
  height: 1px;
  background-color: #c6cfd7;
}

.list::-o-scrollbar {
  height: 1px;
  background-color: #c6cfd7;
}

.list::-webkit-scrollbar-thumb {
  background-color: #c6cfd7;
  border-radius: 4px;
}

.list::-moz-scrollbar-thumb {
  background-color: #c6cfd7;
  border-radius: 4px;
}

.list::-ms-scrollbar-thumb {
  background-color: #c6cfd7;
  border-radius: 4px;
}

.list::-o-scrollbar-thumb {
  background-color: #c6cfd7;
  border-radius: 4px;
}

.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #4489f7 94%, #0000) top/3.8px 3.8px
      no-repeat,
    conic-gradient(#0000 30%, #4489f7);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 3.8px),
    #000 0
  );
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
