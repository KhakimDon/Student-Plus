<template>
  <main>
    <Teleport v-if="mounted" to="#header-breadcrumbs">
      <BaseBreadcrumb v-bind="{ routes}"/>
    </Teleport>

    <h1>Dashboard</h1>
    <BaseTab v-model="currentTab" :list="list"/>

    <ExampleDropdown/>
    <ExampleModal/>

    <BaseTooltip text="hello,  this is the example of tooltip">
      <p>show tooltip</p>
    </BaseTooltip>
  </main>
</template>
<script lang="ts" setup>
import {BaseBreadcrumb, BaseTab, BaseTooltip} from "@/components/Base";
import {ref} from "vue";
import {useMounted} from "@vueuse/core";
import type {IRoute} from "@/types/components";
import ExampleDropdown from "@/modules/dashboard/components/ExampleDropdown.vue";
import ExampleModal from "@/modules/dashboard/components/ExampleModal.vue";

const mounted = useMounted()

const currentTab = ref('tab-1');

const list = [
  {
    value: 'tab-1',
    label: 'Tab 1',
  },
  {
    value: 'tab-2',
    label: 'Tab 2',
  },
  {
    value: 'tab-3',
    label: 'Tab 3',
  }
]

const routes: IRoute[] = [
  {
    name: 'home 2',
    route: {name: 'Dashboard'}
  },
  {
    name: 'some other route',
    route: {name: 'Dashboard'}
  },
  {
    name: 'other route',
    route: {name: 'Dashboard'}
  },
  {
    name: 'Route other 1',
    route: {name: 'Dashboard'}
  }
]

</script>