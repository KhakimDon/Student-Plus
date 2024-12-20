<template>
  <div
    class="company-card flex flex-col bg-white rounded-lg transition-300 border border-white-100"
  >
    <div class="flex justify-between items-start p-4">
      <div class="flex-y-center gap-4">
        <BaseShimmer
          width="60px"
          height="60px"
          border-radius="8px"
          :loading="loading"
        >
          <BaseAvatar
            :image="company?.brand_logo?.[EImageSize.MEDIUM]"
            class="!w-[60px] !h-[60px]"
          />
        </BaseShimmer>
        <div class="flex flex-col space-y-[6px]">
          <div class="flex-y-center gap-2">
            <BaseShimmer
              width="110px"
              height="32px"
              border-radius="8px"
              :loading="loading"
            >
              <h4
                class="font-semibold leading-6 leading-130 text-dark text-2xl line-clamp-1"
              >
                {{ company?.name }}
              </h4>
            </BaseShimmer>
            <BaseShimmer
              width="24px"
              height="24px"
              border-radius="8px"
              :loading="loading"
            >
              <BaseVerifiedIcon v-if="company?.verified" weight="md" />
            </BaseShimmer>
          </div>
          <div class="flex items-center">
            <div v-if="company?.old_review_rating" class="flex-y-center gap-2">
              <BaseShimmer
                width="110px"
                height="24px"
                border-radius="8px"
                :loading="loading"
              >
                <div class="flex-y-center gap-1">
                  <BaseRating :rate="company?.old_review_rating" size="sm" />

                  <p class="text-base leading-130 text-gray font-medium">
                    {{ company?.old_review_rating }}
                  </p>
                </div>
              </BaseShimmer>
            </div>
            <i
              v-if="company?.categories?.length && company?.old_review_rating"
              class="h-5 w-px mx-3 bg-gray-300 inline-block"
            />
            <BaseShimmer
              width="44px"
              height="24px"
              border-radius="8px"
              :loading="loading"
            >
              <div
                v-if="company?.categories?.length"
                class="inline py-1 px-1.5 rounded bg-gray-300 text-xs font-normal leading-130 text-gray-700"
              >
                {{ company?.categories[0]?.title }}
              </div>
            </BaseShimmer>
          </div>
        </div>
      </div>
      <BaseShimmer
        width="161px"
        height="36px"
        border-radius="8px"
        :loading="loading"
      >
        <BaseButton
          :text="$t('review_business_get_access')"
          size="sm"
          variant="secondary"
          class="flex-shrink-0"
          @click="handleGetAccess(company)"
        />
      </BaseShimmer>
    </div>
    <div
      v-if="company?.phone_number || company?.website || company?.address"
      class="border-t border-white-100 py-3 px-4 flex-center-between p-4"
    >
      <div class="flex gap-3">
        <BaseShimmer
          width="127px"
          height="18px"
          border-radius="8px"
          :loading="loading"
        >
          <a
            v-if="company?.phone_number"
            :href="`tel:${company?.phone_number}`"
            target="_blank"
            class="flex-y-center gap-1 group contact-info"
          >
            <i class="text-green contact-icon icon-call" />
            {{ formatPhoneNumber(company?.phone_number) }}
          </a>
        </BaseShimmer>
        <BaseShimmer
          width="127px"
          height="18px"
          border-radius="8px"
          :loading="loading"
        >
          <a
            v-if="company?.website"
            :href="`${company?.website}`"
            target="_blank"
            class="flex-y-center gap-1 group contact-info"
          >
            <i class="text-green contact-icon icon-global" />
            {{ company?.website }}
          </a>
        </BaseShimmer>
        <BaseShimmer
          width="127px"
          height="18px"
          border-radius="8px"
          :loading="loading"
        >
          <a
            v-if="company?.address"
            :href="`https://maps.yandex.com/?ll=${company?.longitude},${company?.latitude}&z=18&pt=${company?.longitude},${company?.latitude}`"
            target="_blank"
            class="flex-y-center gap-1 group contact-info"
          >
            <i class="text-green contact-icon icon-location" />
            {{ company?.address }}
          </a>
        </BaseShimmer>
      </div>
      <IconStar v-model="isFavorite" weight="sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseAvatar from "@/components/Base/Avatar/BaseAvatar.vue";
import BaseButton from "@/components/Base/Button/BaseButton.vue";
import BaseVerifiedIcon from "@/components/Base/Icon/BaseVerifiedIcon.vue";
import BaseRating from "@/components/Base/Rating/BaseRating.vue";
import BaseShimmer from "@/components/Base/Shimmer/BaseShimmer.vue";
import IconStar from "@/components/Common1/Icon/Star.vue";
import { EImageSize } from "@/types/common";
import { ICompany } from "@/types/company";
import { formatPhoneNumber } from "@/utils/functions/common";

const isFavorite = ref(false);

interface Props {
  company?: ICompany;
  loading?: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "getAccess", value: ICompany): void;
}>();

const handleGetAccess = (value: ICompany) => {
  emit("getAccess", value);
};
</script>

<style scoped>
.company-card .contact-icon {
  @apply text-lg leading-[18px] text-green;
}
.company-card .contact-info {
  font-size: 13px;
  line-height: 130%;
  @apply text-dark font-normal transition duration-300 hover:text-green;
}
</style>
