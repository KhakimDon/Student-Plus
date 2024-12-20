<template>
  <div>
    <div
      class="avatar-upload w-max hover:bg-gray-2 rounded-lg duration-300 relative group !cursor-pointer overflow-hidden"
    >
      <input
        ref="fileInput"
        accept=".jpg, .jpeg, .png"
        class="absolute top-0 right-0 w-[148px] left-0 bottom-0 z-20 opacity-0 cursor-pointer"
        type="file"
        @change="previewImage"
        @dragenter="dragStart = true"
        @dragleave="dragStart = false"
      />

      <div class="avatar-upload__blur absolute-center w-full h-full"></div>

      <div class="relative">
        <UIAvatar
          :key="image"
          :class="{ 'bg-gray-2': dragStart }"
          :size="'lg'"
          class="absolute duration-300 inset-0 w-full h-full cursor-pointer !border-0"
          image-class="!rounded-[12px]"
          v-bind="{ image }"
        />
        <div
          v-if="image"
          class="bg-dark-blue/20 absolute gap-2 inset-0 flex flex-col items-end p-2 opacity-0 group-hover:opacity-100 transition-300 transition-all cursor-pointer"
        >
          <button class="rounded-md border border-dark-5 bg-dark-4 px-1">
            <i class="icon-edit text-white text-sm leading-6"></i>
          </button>
          <button class="rounded-md border border-dark-5 bg-dark-4 px-1">
            <i class="icon-trash text-white text-sm leading-6"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="flex gap-2 mt-3">
      <div
        class="px-2 py-1 bg-gray-3 rounded-2xl font-normal text-dark-black text-sm"
      >
        {{ $t("max_photo_size") }}
      </div>
      <div
        class="px-2 py-1 bg-gray-3 rounded-2xl font-normal text-dark-black text-sm"
      >
        {{ $t("format_photo") }}
      </div>
    </div>
    <!--    <div>-->
    <!--      <button-->
    <!--        v-if="image && !hidden"-->
    <!--        class="text-[#E94720] mt-2 hover:text-red transition-all transition-300 text-xs font-medium leading-5"-->
    <!--        @click="removeImage"-->
    <!--      >-->
    <!--        {{ $t("delete_avatar_image") }}-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import UIAvatar from "@/components/Common/Avatar/UIAvatar.vue";

interface Props {
  defaultImage?: string;
  hidden: boolean;
}

const dragStart = ref(false);

const props = defineProps<Props>();

interface Emits {
  (event: "update:image", image?: Blob | string): void;

  (event: "remove-image"): void;
}

const emit = defineEmits<Emits>();

const image = ref<string | undefined>(props.defaultImage);

const previewImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];

  const reader = new FileReader();

  reader.onload = (e) => {
    image.value = e?.target?.result as string;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
  emit("update:image", file);
};
const removeImage = () => {
  image.value = undefined;
  emit("remove-image");
};

watch(
  () => props.defaultImage,
  (newValue) => {
    if (newValue !== image.value) {
      image.value = newValue;
    }
  }
);
const fileInput = ref();
</script>
