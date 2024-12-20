<template>
  <div
    class="p-3 bg-white rounded-xl flex gap-2 notification-hover-card transition-300 cursor-pointer"
  >
    <div
      v-if="notification.notification_type === 'review_complaint_accepted'"
      class="flex-center w-8 h-8 shrink-0 rounded-full bg-green-50"
    >
      <div class="w-5 h-5 rounded-full flex-center bg-blue-50">
        <i class="icon-warning text-xl text-blue" />
      </div>
    </div>
    <div
      v-if="notification.notification_type === 'review_complaint_rejected'"
      class="flex-center w-8 h-8 shrink-0 rounded-full bg-green-50"
    >
      <div class="w-5 h-5 rounded-full flex-center bg-red-50">
        <i class="icon-warning text-xl text-red-850" />
      </div>
    </div>
    <div
      v-if="notification.notification_type === 'review_company_new_rating'"
      class="flex-center w-8 h-8 shrink-0 rounded-full bg-green-50"
    >
      <div class="w-5 h-5 rounded-full flex-center bg-green-200">
        <i class="icon-filled-star text-xs text-white" />
      </div>
    </div>
    <div
      v-if="notification.notification_type === 'review_business_reminder'"
      class="flex-center w-8 h-8 shrink-0 rounded-full bg-blue-50"
    >
      <div class="w-5 h-5 rounded-full flex-center">
        <i class="icon-message text-xl text-blue" />
      </div>
    </div>
    <div
      v-if="notification.notification_type === 'review_system_notification'"
      class="flex-center w-8 h-8 shrink-0 rounded-full bg-green-50"
    >
      <div class="w-5 h-5 rounded-full flex-center bg-green-200">
        <i class="icon-filled-star text-xs text-white" />
      </div>
    </div>
    <div>
      <div class="flex-y-center">
        <CollapseTransition dimension="width">
          <div v-if="!notification?.read_at" class="pr-1">
            <div class="w-2 h-2 rounded-full bg-red-850" />
          </div>
        </CollapseTransition>
        <p class="text-base leading-130 text-dark font-medium">
          {{ notification?.notification?.title }}
        </p>
      </div>
      <p
        class="text-sm leading-130 text-gray-700 mt-1"
        v-html="notification?.notification?.short_description"
      />

      <p class="mt-2 text-xs leading-130 text-gray">
        {{ dayjs(notification.created_date).format("HH:ss") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import dayjs from "dayjs";

import { INotification } from "@/types/notification";

interface Props {
  notification: INotification;
}

defineProps<Props>();
</script>

<style scoped>
.notification-hover-card:hover {
  box-shadow: 0 0 10px 0 rgba(18, 28, 37, 0.15);
}
</style>
