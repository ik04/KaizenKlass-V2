import { useEffect, useState } from "react"

export const BackButton = () => {
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const checkHistory = () => {
      if (history.length <= 1) {
        setShowButton(false)
      } else {
        setShowButton(true)
      }
    }

    checkHistory()
    window.addEventListener("popstate", checkHistory)
    return () => {
      window.removeEventListener("popstate", checkHistory)
    }
  }, [])

  const goBack = () => {
    history.back()
  }

  return (
    <>
      {showButton && (
        <div
          onClick={goBack}
          className="cursor-pointer flex justify-start items-center"
        >
          <img src="/assets/back.svg" className="md:w-9 w-6" alt="" />
          <p className="font-base text-base md:text-3xl text-highlightSecondary uppercase">
            Back
          </p>
        </div>
      )}
    </>
  )
}
