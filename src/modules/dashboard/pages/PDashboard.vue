<template>
  <main>
    <h1 v-if="step !== 6" class="text-center font-[800]">
      Rossiya universitetlariga o'qishga kirish uchun anketa 📑
    </h1>
    <Transition name="fade" mode="out-in">
      <div v-if="step == 1" class="mt-3">
        <FormGroup label="F.I.SH">
          <FormInput
            placeholder="Ism va Familiyangizni kiriting"
            v-model="form.values.name"
          />
        </FormGroup>
        <FormGroup label="Tug‘ilgan sanangiz">
          <BaseDatapicker
            placeholder="kun.oy.yil"
            :maxDate="new Date()"
            v-model="form.values.birthday"
          />
        </FormGroup>
        <FormGroup label="Aloqa telefon raqamingiz">
          <FormInput
            v-maska="'+### (##) ###-##-##'"
            placeholder="kun/oy/yil"
            v-model="form.values.phone"
          />
        </FormGroup>
        <BaseButton
          @click="changeStep(2)"
          class="w-full mt-5"
          text="Davom etish"
          icon="icon-arrow-right"
          :disabled="
            form.$v.value.name.$invalid ||
            form.$v.value.birthday.$invalid ||
            form.$v.value.phone.$invalid
          "
        />
      </div>
      <div v-else-if="step == 2" class="mt-3">
        <FormGroup label="Ta'lim muassasasini tugatgan yilingiz">
          <FormInput
            v-focus
            placeholder="Yilni kiriting"
            v-model="form.values.university_end"
            type="number"
            v-maska="'####'"
          />
        </FormGroup>
        <FormGroup
          labelClass="text-xs"
          label="Bakalavr yoki magistratura bosqichlaridan qaysi biriga topshirmoqchisiz"
        >
          <FormRadioGroup
            v-model="form.values.university_step"
            :items="university_step_values"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup
          label="Qaysi mutaxassislik (yo‘nalish) bo‘yicha tahsil olmoqchisiz"
        >
          <FormInput
            placeholder="Yo‘nalishni kiriting"
            v-model="form.values.university_direction"
          />
        </FormGroup>
        <BaseButton
          @click="changeStep(3)"
          class="w-full mt-5"
          text="Davom etish"
          icon="icon-arrow-right"
          :disabled="
            form.$v.value.university_end.$invalid ||
            form.$v.value.university_step.$invalid ||
            form.$v.value.university_direction.$invalid
          "
        />
      </div>
      <div v-else-if="step == 3" class="mt-3">
        <FormGroup label="Ta'lim turini tanlang">
          <FormRadioGroup
            v-model="form.values.type"
            :items="type_values"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup
          label="Rossiyadagi qaysi shaharda tahsil olishni rejalashtiryapsiz"
        >
          <FormInput
            placeholder="Shahar nomini kiriting"
            v-model="form.values.city"
          />
        </FormGroup>
        <FormGroup label="Kontrakt yoki grant asosida topshirmoqchisiz">
          <FormRadioGroup
            v-model="form.values.condition"
            :items="condition_values"
            class="mt-2"
          />
        </FormGroup>
        <BaseButton
          @click="changeStep(4)"
          class="w-full mt-5"
          text="Davom etish"
          icon="icon-arrow-right"
          :disabled="
            form.$v.value.type.$invalid ||
            form.$v.value.city.$invalid ||
            form.$v.value.condition.$invalid
          "
        />
      </div>
      <div v-else-if="step == 4" class="mt-3">
        <FormGroup
          label-class="text-xs"
          label="Muayyan universitetni tanlaganmisiz? Agar tanlagan bo‘lsangiz, universitet nomini yozing"
        >
          <FormInput
            placeholder="Universitet nomini kiriting"
            v-model="form.values.university"
          />
        </FormGroup>
        <FormGroup label="Rus tilini qanchalik bilasiz">
          <FormRadioGroup
            v-model="form.values.level"
            :items="level_values"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup
          label-class="text-xs"
          label=" Ilgari Rossiyada bo‘lganmisiz? Agar bo‘lgan bo‘lsangiz, qachon va qaysi maqsadda? (Ish, o'qish, boshqa)"
        >
          <FormInput
            placeholder="Ma'lumot kirting"
            v-model="form.values.be_here"
          />
        </FormGroup>
        <BaseButton
          @click="changeStep(5)"
          class="w-full mt-5"
          text="Davom etish"
          icon="icon-arrow-right"
          :disabled="form.$v.value.level.$invalid"
        />
      </div>
      <div v-else-if="step == 5" class="mt-3">
        <FormGroup label="Sizga Rossiyada yashash uchun yotoqxona kerakmi">
          <FormRadioGroup
            v-model="form.values.need_home"
            :items="confirmation"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup
          label-class="text-xs"
          label="Rossiyada qarindoshlaringiz yoki yaqin insonlaringiz bormi"
        >
          <FormRadioGroup
            v-model="form.values.has_natives"
            :items="confirmation"
            class="mt-2"
          />
        </FormGroup>
        <BaseButton
          @click="(changeStep(6), submit)"
          class="w-full mt-5"
          text="Ariza qoldirish"
          icon="icon-check"
          :disabled="
            form.$v.value.need_home.$invalid ||
            form.$v.value.has_natives.$invalid
          "
        />
      </div>
      <div class="text-center" v-else-if="step == 6">
        <div
          class="h-[80px] w-[80px] bg-primary text-white text-[50px] border-[4px] border-white/10 flex-center mx-auto mb-4 rounded-full"
        >
          <i class="icon-check"></i>
        </div>
        <h1 class="font-[600]">
          Ariza Yuborildi <br />
          <span class="text-sm font-[500]"
            >Tabriklaymiz siz Universitetga kirishga birinchi qadam qo'ydingiz
            !</span
          >
        </h1>
        <p
          class="mt-4 text-primary font-[500] text-sm border-t border-primary pt-4"
        >
          Xodimlarimiz siz bilan 24 soat ichida bo'g'lanishadi.
        </p>
        <SalutAnim />
      </div>
    </Transition>
  </main>
</template>

<script lang="ts" setup>
import SalutAnim from "@/modules/dashboard/components/salutAnim.vue";
import { useForm } from "@/composables/useForm";
import { nextTick, ref } from "vue";
import { required, minLength } from "@vuelidate/validators";
import {
  BaseButton,
  FormGroup,
  BaseDatapicker,
  FormInput,
  FormRadioGroup,
} from "@/components/Base";
import { vMaska } from "maska/vue";

const form = useForm(
  {
    name: "",
    birthday: "",
    phone: "+998",
    university_end: "",
    university_step: "",
    university_direction: "",
    type: "",
    city: "",
    condition: "",
    university: "",
    level: "",
    be_here: "",
    need_home: "",
    has_natives: "",
  },
  {
    name: { required },
    birthday: { required },
    phone: { required, minLength: minLength(19) },
    university_end: { required },
    university_step: { required },
    university_direction: { required },
    type: { required },
    city: { required },
    condition: { required },
    level: { required },
    need_home: { required },
    has_natives: { required },
  },
);

const step = ref(1);
const university_step_values = [
  {
    id: "Bakalavr",
    name: "Bakalavr",
  },
  {
    id: "Magistratura",
    name: "Magistratura",
  },
  {
    id: "boshqa",
    name: "boshqa",
  },
];
const type_values = [
  {
    id: "Kunduzgi",
    name: "Kunduzgi",
  },
  {
    id: "Kechki",
    name: "Kechki",
  },
  {
    id: "Sirtqi",
    name: "Sirtqi",
  },
];
const condition_values = [
  {
    id: "Kontrakt",
    name: "Kontrakt",
  },
  {
    id: "Grant",
    name: "Grant",
  },
];
const level_values = [
  {
    id: "Boshlang‘ich",
    name: "Boshlang‘ich",
  },
  {
    id: "O‘rta",
    name: "O‘rta",
  },
  {
    id: "Yuqori",
    name: "Yuqori",
  },
];
const confirmation = [
  {
    id: "Ha",
    name: "Ha",
  },
  {
    id: "Yo'q",
    name: "Yo'q",
  },
];

const changeStep = (x: number) => {
  step.value = x;
};

const vFocus = {
  mounted: (el: HTMLInputElement) => {
    nextTick(() => el.focus());
  },
};

const submit = () => {};
</script>
