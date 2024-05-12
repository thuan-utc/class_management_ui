// i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    // English translations
    greeting: 'Hello!',
    welcome: 'Welcome to my website!'
  },
  fr: {
    // French translations
    greeting: 'Bonjour!',
    welcome: 'Bienvenue sur mon site web!'
  },
  // Add translations for other languages as needed
};

const i18n = createI18n({
  locale: 'en', // Default locale
  fallbackLocale: 'en',
  messages
});

export default i18n;
