<template>
  <main>
    <h1 v-if="step !== 6" class="text-center font-[800]">
      Rossiya universitetlariga o'qishga kirish uchun anketa 📑
    </h1>
    <div class="mx-auto w-max mt-4">
      <BaseStepper v-if="step !== 6" :current-step="step" :steps="steps" />
    </div>
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
        <Transition name="fade" mode="out-in">
          <BaseButton
            v-if="!loading"
            @click="submit"
            class="w-full mt-5"
            text="Ariza qoldirish"
            icon="icon-check"
            :disabled="
              form.$v.value.need_home.$invalid ||
              form.$v.value.has_natives.$invalid
            "
          />
          <div
            v-else
            class="bg-primary mt-5 w-full h-[40px] flex-center rounded-md"
          >
            <div class="spinner"></div>
          </div>
        </Transition>
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
import BaseStepper from "@/components/Base/BaseStepper.vue";
import {
  BaseButton,
  FormGroup,
  BaseDatapicker,
  FormInput,
  FormRadioGroup,
} from "@/components/Base";
import { vMaska } from "maska/vue";
import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

const steps = [
  { title: "" },
  { title: "" },
  { title: "" },
  { title: "" },
  { title: "" },
];

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

const loading = ref(false);

const submit = () => {
  loading.value = true;
  try {
    // Add the form data to Firestore
    addDoc(collection(db, "applications"), {
      ...form.values,
      createdAt: new Date(),
    })
      .then(async () => {
        console.log("Form suSbmitted successfully!");
        const querySnapshot = await getDocs(collection(db, "applications"));
        const applications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        function escapeMarkdown(text: unknown): string {
          if (typeof text !== "string") {
            return ""; // или можно text.toString(), если ожидаются числа
          }
          return text;
        }

        console.log(form.values);

        const TOKEN = "7851159577:AAH2AL7CdV7gfP9F2ArmwooIVfgDiHeBwf4";
        const CHAT_ID = "-4623214324";
        const message = `
🆕 Ariza - ${applications.length} 🟩 \n
👤 Ismi Familiyasi: ${escapeMarkdown(form.values.name || "Kiritilmagan")}
🗓 Tug'ilgan sanasi: ${escapeMarkdown(dayjs(form.values.birthday).format("DD/MM/YYYY") || "Kiritilmagan")}
📞 Telefon: ${escapeMarkdown(form.values.phone || "Kiritilmagan")}
🏫 Ta'lim muassasasini tugatgan yili: ${escapeMarkdown(form.values.university_end || "Kiritilmagan")}
🏢 Bakalavr yoki magistratura bosqichlaridan qaysi biriga topshirmoqchiligi: ${escapeMarkdown(form.values.university_step || "Kiritilmagan")}
🎓 Qaysi mutaxassislik (yo‘nalish) bo‘yicha tahsil olmoqchiligi: ${escapeMarkdown(form.values.university_direction || "Kiritilmagan")}
📚 Ta'lim turi: ${escapeMarkdown(form.values.type || "Kiritilmagan")}
📍 Rossiyadagi qaysi shaharda tahsil olmoqchiligi: ${escapeMarkdown(form.values.city || "Kiritilmagan")}
${form.values.condition === "Grant" ? "🟩" : "🟦"} Kontrakt yoki grant asosida topshirmoqchiligi: ${escapeMarkdown(form.values.condition || "Kiritilmagan")}
🎯 Muayyan universitet: ${escapeMarkdown(form.values.university || "Kiritilmagan")}
🇷🇺 Rus tilini qanchalik bilishi: ${escapeMarkdown(form.values.level || "Kiritilmagan")}
✈️ Rossiyada bo'lganmi: ${escapeMarkdown(form.values.be_here || "Kiritilmagan")}
🏡 Yoptoqxona kerakmi: ${escapeMarkdown(form.values.need_home || "Kiritilmagan")}
👩‍👩‍👦‍👦 Rossiyada qarindoshlari bormi: ${escapeMarkdown(form.values.has_natives || "Kiritilmagan")}
        `;

        console.log(message);

        try {
          const response = await fetch(
            `https://api.telegram.org/bot${TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
              }),
            },
          );

          const result = await response.json();

          if (result.ok) {
            console.log("✅ Сообщение отправлено!");
          } else {
            console.error("❌ Ошибка при отправке:", result);
          }
        } catch (error) {
          console.error("❌ Ошибка при отправке:", error);
        }

        step.value = 6;
        loading.value = false;
      })
      .catch((error) => {
        console.error("Error submitting form: ", error);
      });
  } catch (error) {
    console.error("Error in submit function: ", error);
  }
};
</script>
<style>
.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, white 94%, #0000) top/3.8px 3.8px no-repeat,
    conic-gradient(#0000 30%, white);
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
