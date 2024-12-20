<template>
  <div
    class="border py-2 px-3 rounded-md border-dashed border-gray-2 group flex-y-center gap-2.5"
  >
    <i v-if="iconClass" :class="iconClass" />
    <div class="flex flex-col">
      <slot>
        <p
          :class="[activeClass, titleClass]"
          class="text-sm font-bold text-black leading-130 transition-300 block line-clamp-1"
        >
          {{ title }}
        </p>
      </slot>
      <p
        class="text-gray-1 text-xs leading-130 font-medium"
        :class="descriptionClass"
      >
        {{ t(description ?? "") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  title?: string;
  description: string;
  descriptionClass?: string;
  loading?: boolean;
  iconClass?: string;
  actionValue?: string;
  titleClass?: string;
}

const { t } = useI18n();

const props = withDefaults(defineProps<Props>(), {
  title: "-",
  description: "-",
});

const activeClass = computed(() => {
  return props.actionValue ? "hover:text-blue" : "pointer-events-none";
});
</script>
