// LanguageSelector.vue
<template>
  <select v-model="currentLocale" @change="changeLocale">
    <option v-for="(locale, key) in locales" :key="key" :value="locale">{{ locale }}</option>
  </select>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { locale, availableLocales, changeLocale } = useI18n();
    return { currentLocale: locale.value, locales: availableLocales, changeLocale };
  }
};
</script>
