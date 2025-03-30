<template>
  <main>
    <h1 v-if="step !== 6" class="text-center font-[800]">
      Qaysi universitet siz uchun mos! version.1
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
          <FormInput
            placeholder="kun.oy.yil"
            v-maska="'##.##.####'"
            v-model="form.values.birthday"
          />
        </FormGroup>
        <FormGroup label="Aloqa telefon raqamingiz">
          <FormInput
            placeholder="Telefon raqamingizni kiriting"
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
        <FormGroup
          label-class="text-xs"
          label="Ta'lim muassasasini tugatgan yilingiz"
        >
          <FormInput
            placeholder="Yilni kiriting"
            v-model="form.values.university_end"
            v-maska="'####'"
          />
          <FormRadioGroup
            v-model="form.values.school"
            :items="school_values"
            class="mt-2"
          />
        </FormGroup>

        <FormGroup
          label="Qaysi mutaxassislik (yo‘nalish) bo‘yicha tahsil olmoqchisiz?"
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
            form.$v.value.school.$invalid ||
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
          label="Rossiyadagi qaysi shaharda tahsil olishni rejalashtiryapsiz?"
        >
          <FormInput
            placeholder="Shahar nomini kiriting"
            v-model="form.values.city"
          />
        </FormGroup>
        <FormGroup label="Ta'lim asosini tanlang">
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
            placeholder="(Ixtiyoriy ravishda to'ldiring)"
            v-model="form.values.university"
          />
          <FormRadioGroup
            v-model="form.values.university_step"
            :items="university_step_values"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup label="Rus tilini bilish darajangiz qanday?">
          <FormRadioGroup
            v-model="form.values.level"
            :items="level_values"
            class="mt-2"
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
        <FormGroup label=" Ilgari Rossiyada bo‘lganmisiz?">
          <FormRadioGroup
            v-model="form.values.be_here"
            :items="confirmation"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup label="Sizga Rossiyada yashash uchun yotoqxona kerakmi?">
          <FormRadioGroup
            v-model="form.values.need_home"
            :items="confirmation"
            class="mt-2"
          />
        </FormGroup>
        <FormGroup
          label="Rossiyada qarindoshlaringiz yoki yaqin insonlaringiz bormi?"
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
            <video autoplay muted loop src="@/assets/Comp.mp4" />
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
          📨 So‘rovnomangiz qabul qilindi <br />
          <span class="text-xs font-[500]">
            Bizga murojaat qilganingiz uchun minnatdorchilik bildiramiz.
            Ma’lumotlaringiz ko‘rib chiqiladi va
            <span class="font-[700]"
              >mas’ul xodimlarimiz tez orada siz bilan bog‘lanishadi.</span
            >
          </span>
        </h1>
        <p
          class="mt-4 text-primary font-[500] text-sm border-t border-primary pt-4"
        >
          ⚠️ Agar 24 soat ichida javob olmasangiz, iltimos, qayta murojaat
          qiling.
        </p>
        <SalutAnim />
      </div>
    </Transition>
  </main>
</template>

<script lang="ts" setup>
import SalutAnim from "@/modules/dashboard/components/salutAnim.vue";
import { useForm } from "@/composables/useForm";
import { ref } from "vue";
import { required } from "@vuelidate/validators";
import BaseStepper from "@/components/Base/BaseStepper.vue";
import {
  BaseButton,
  FormGroup,
  FormInput,
  FormRadioGroup,
} from "@/components/Base";
import { vMaska } from "maska/vue";
import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
    phone: "",
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
    school: "",
  },
  {
    name: { required },
    birthday: { required },
    phone: { required },
    university_end: { required },
    university_step: { required },
    university_direction: { required },
    type: { required },
    city: { required },
    condition: { required },
    level: { required },
    need_home: { required },
    has_natives: { required },
    school: { required },
    be_here: { required },
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
const school_values = [
  {
    id: "Maktab",
    name: "Maktab",
  },
  {
    id: "Litsey",
    name: "Litsey",
  },
  {
    id: "Kollej",
    name: "Kollej",
  },
];

const changeStep = (x: number) => {
  step.value = x;
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
          return text;
        }

        console.log(form.values);

        const TOKEN = "7851159577:AAH2AL7CdV7gfP9F2ArmwooIVfgDiHeBwf4";
        const CHAT_ID = "-4623214324";
        const message = `
🆕 Ariza - ${applications.length}  \n
👤 Ismi Familiyasi: ${escapeMarkdown(form.values.name || "Kiritilmagan")}  \n
🗓 Tug'ilgan sanasi: ${escapeMarkdown(form.values.birthday || "Kiritilmagan")} \n
📞 Telefon: ${escapeMarkdown(form.values.phone || "Kiritilmagan")} \n
🏫 Ta'lim muassasasini tugatgan yili: ${form.values.university_end || "Kiritilmagan"} - ${form.values.school || "Kiritilmagan"} \n
🏢 Bakalavr yoki magistratura bosqichlaridan qaysi biriga topshirmoqchiligi: ${escapeMarkdown(form.values.university_step || "Kiritilmagan")} \n
🎓 Qaysi mutaxassislik (yo‘nalish) bo‘yicha tahsil olmoqchiligi: ${escapeMarkdown(form.values.university_direction || "Kiritilmagan")} \n
📚 Ta'lim turi: ${escapeMarkdown(form.values.type || "Kiritilmagan")} \n
📍 Rossiyadagi qaysi shaharda tahsil olmoqchiligi: ${escapeMarkdown(form.values.city || "Kiritilmagan")} \n
${form.values.condition === "Grant" ? "🟩" : "🟦"} Kontrakt yoki grant asosida topshirmoqchiligi: ${escapeMarkdown(form.values.condition || "Kiritilmagan")} \n
🎯 Muayyan universitet: ${escapeMarkdown(form.values.university || "Kiritilmagan")} \n
🇷🇺 Rus tilini qanchalik bilishi: ${escapeMarkdown(form.values.level || "Kiritilmagan")} \n
✈️ Rossiyada bo'lganmi: ${escapeMarkdown(form.values.be_here || "Kiritilmagan")} \n
🏡 Yoptoqxona kerakmi: ${escapeMarkdown(form.values.need_home || "Kiritilmagan")} \n
👩‍👩‍👦‍👦 Rossiyada qarindoshlari bormi: ${escapeMarkdown(form.values.has_natives || "Kiritilmagan")} \n
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

@keyframes draw {
  0% {
    stroke-dashoffset: 200;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
