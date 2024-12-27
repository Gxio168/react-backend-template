import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getStringItem } from '@/utils/storage'
import { StorageEnum } from '#/enum'

import en_US from './en_US'
import zh_CN from './zh_CN'

const defaultLang = getStringItem(StorageEnum.I18N) || 'zh_CN'
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: defaultLang,
    fallbackLng: 'zh_CN',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN },
    },
  })

export default i18n
export const { t } = i18n
