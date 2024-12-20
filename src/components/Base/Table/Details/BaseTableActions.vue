<template>
  <BaseDropdown
    :show="showActions"
    head-class="cursor-pointer w-6 h-6 ml-auto flex items-center justify-center outline-hidden rounded transition-300 hover:bg-white-100"
    @focusout="showActions = false"
  >
    <template #head>
      <span
        class="icon-dots text-2xl text-gray-11 transition-300 outline-none block ml-auto rounded-md"
        :class="{ 'bg-gray-3 !text-dark-black': showActions }"
        @click.stop="toggleAction"
      ></span>
    </template>

    <template #body>
      <template v-for="(action, index) in actions" :key="index">
        <hr
          v-if="index !== 0"
          class="border-none h-px rounded-md bg-gray-3 w-full ml-10"
        />
        <div
          :class="action?.class"
          class="transition-300 hover:bg-gray-3 pl-3 cursor-pointer overflow-hidden py-3 pr-3 flex items-center"
          @click.stop="handleAction(action.event)"
        >
          <span :class="action?.icon" class="text-xl leading-5"></span>
          <div class="ml-2 text-sm font-medium leading-normal text-gray-0">
            {{ action?.label }}
          </div>
        </div>
      </template>
    </template>
  </BaseDropdown>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";
import { TableAction } from "@/components/Base/Table/BaseTable";

interface Props {
  actions?: TableAction[];
  userRole?: number;
}
withDefaults(defineProps<Props>(), {
  actions: () => [],
});

const emit = defineEmits<{
  (e: string): void;
}>();

const showActions = ref(false);
const handleAction = (value: string) => {
  emit(value);
  toggleAction();
};

const toggleAction = () => {
  showActions.value = !showActions.value;
};
</script>
