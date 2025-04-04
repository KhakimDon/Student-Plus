<script lang="ts" setup>
import {cn} from '@/lib/utils'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import {computed, type HTMLAttributes} from 'vue'
import {useI18n} from "vue-i18n";

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const {t} = useI18n()
</script>

<template>
  <DialogPortal>
    <DialogOverlay
        class="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
        :class="
        cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 ',
          props.class,
        )"
        v-bind="forwarded"
    >
      <slot/>

      <DialogClose
          class="absolute right-4 top-4 rounded-sm  ring-offset-gray-1 focus:outline-none focus:ring-2 focus:ring-bg-white-1 focus:ring-offset disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-gray-1 transition-300"
      >
        <i class="text-xl icon-x-mark hover:text-red transition-300"/>
        <span class="sr-only">{{ t('button.close') }}</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
