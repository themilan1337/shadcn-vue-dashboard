import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'
import kz from './locales/kz.json'

const messages = {
  en,
  ru,
  kz
}

// Get saved language from localStorage or default to 'en'
const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})

export default i18n

// Helper function to change language
export const changeLanguage = (locale: string) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

// Available languages
export const availableLanguages = [
  {
    code: 'en',
    name: 'English',
    flag: '/images/en.png'
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '/images/ru.png'
  },
  {
    code: 'kz',
    name: 'Қазақша',
    flag: '/images/kz.png'
  }
]