<template>
  <div class="main-container w-full">
    <div
      ref="editorContainerElement"
      class="editor-container editor-container_classic-editor"
    >
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-if="editor && config"
            v-model="modelValue"
            :config="config"
            :editor="editor"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "ckeditor5/ckeditor5.css";

import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import {
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  ClassicEditor,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Paragraph,
  PasteFromMarkdownExperimental,
  SimpleUploadAdapter,
  SpecialCharacters,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from "ckeditor5";
import enTranslations from "ckeditor5/translations/en.js";
import ruTranslations from "ckeditor5/translations/ru.js";
import uzTranslations from "ckeditor5/translations/uz.js";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  placeholder: string;
}
const props = defineProps<Props>();

const LICENSE_KEY = import.meta.env.VITE_APP_CKEDITOR_KEY;
const modelValue = defineModel<string>({
  required: true,
});
const { t, locale } = useI18n();
const isLayoutReady = ref(false);
const editor = ClassicEditor;
const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }
  return {
    toolbar: {
      items: [
        "bold",
        "italic",
        "underline",
        "bulletedList",
        "numberedList",
        "undo",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AutoImage,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      Paragraph,
      PasteFromMarkdownExperimental,
      SimpleUploadAdapter,
      SpecialCharacters,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TodoList,
      Underline,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    language: locale.value,
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    // list: {
    //   properties: {
    //     styles: true,
    //     startIndex: true,
    //     reversed: true,
    //   },
    // },
    placeholder: props.placeholder,
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    translations: [locales[locale.value]],
  };
});
onMounted(() => {
  isLayoutReady.value = true;
});
const locales: Record<string, unknown> = {
  uz: uzTranslations,
  sr: enTranslations,
  ru: ruTranslations,
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");

@media print {
  body {
    margin: 0 !important;
  }
}

.main-container {
  font-family: "Lato";
  margin-left: auto;
  margin-right: auto;
}

.ck.ck-editor__editable_inline {
  @apply !bg-[#F2F2F2] !rounded-none;
}

.ck .ck-rounded-corners {
  @apply !bg-[#F2F2F2] !rounded-b-lg;
}

.ck.ck-toolbar__items {
  @apply bg-[#F2F2F2] !rounded-t-lg;
}

.ck.ck-content {
  @apply !max-h-[40vh] !overflow-auto min-h-[20vh];
}

.ck.ck-sticky-panel__content,
.ck.ck-editor__top.ck-reset_all,
.ck.ck-toolbar.ck-toolbar_grouping {
  @apply !rounded-t-xl !bg-[#F2F2F2];
}

.ck-placeholder {
  @apply !text-[#828897] !text-sm !font-normal;
}
.ck-content {
  word-break: break-word;
}
.ck-content ol,
.ck-content ul {
  padding-left: 32px;
}
</style>
