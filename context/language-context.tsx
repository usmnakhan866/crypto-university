"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"
import { translations } from "@/translations"

type Language = "en" | "de"
type TranslationKey = string

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey, options?: { returnObjects?: boolean }) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en")

  // Initialize language from localStorage or browser
  useEffect(() => {
    const initializeLanguage = () => {
      try {
        // Check localStorage first
        const savedLanguage = localStorage.getItem("language") as Language | null
        if (savedLanguage && ["en", "de"].includes(savedLanguage)) {
          setLanguageState(savedLanguage)
          return
        }

        // Fallback to browser language detection
        const browserLang = navigator.language.split("-")[0] as Language
        if (["en", "de"].includes(browserLang)) {
          setLanguageState(browserLang)
        }
      } catch (error) {
        console.error("Language initialization error:", error)
        setLanguageState("en")
      }
    }

    initializeLanguage()
  }, [])

  // Improved nested translation lookup with safe object handling
  const getTranslation = useCallback((key: string, lang: Language, returnObjects = false): any => {
    const keys = key.split(".")
    let current: any = translations[lang]

    for (const k of keys) {
      if (!current || typeof current !== "object") {
        // If we can't find the key in the current language, fall back to English
        if (lang !== "en") {
          return getTranslation(key, "en", returnObjects)
        }
        return key // Last resort: return the key itself
      }
      current = current[k]
    }

    if (current === undefined) {
      // If we can't find the key in the current language, fall back to English
      if (lang !== "en") {
        return getTranslation(key, "en", returnObjects)
      }
      return key // Last resort: return the key itself
    }

    return current
  }, [])

  // Memoized translation function with proper dependencies
  const t = useCallback(
    (key: TranslationKey, options?: { returnObjects?: boolean }): any => {
      const returnObjects = options?.returnObjects || false
      return getTranslation(key, language, returnObjects)
    },
    [language, getTranslation],
  )

  // Memoized setLanguage to prevent unnecessary re-renders
  const setLanguage = useCallback((lang: Language) => {
    try {
      if (["en", "de"].includes(lang)) {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
      } else {
        console.warn(`Attempted to set unsupported language: ${lang}`)
      }
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
  }, [])

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}
