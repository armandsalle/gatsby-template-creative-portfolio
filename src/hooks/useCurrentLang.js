import { useEffect, useState } from "react"

const useCurrentLang = () => {
  const [currentLang, setCurrentLang] = useState("en")

  useEffect(() => {
    if (typeof navigator === `undefined`) {
      setCurrentLang("en")
      return
    }

    const lang =
      navigator && navigator.language && navigator.language.split("-")[0]
    if (!lang) {
      setCurrentLang("en")
    }

    if (lang === "fr") {
      setCurrentLang("fr")
    }
  }, [setCurrentLang, currentLang])

  return currentLang
}

export default useCurrentLang
