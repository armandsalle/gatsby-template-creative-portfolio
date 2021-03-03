import React, { useEffect } from "react"
import useLoading from "../../hooks/useLoading"
import gsap from "gsap"

const Loaded = ({ children }) => {
  const { loadedCanGo } = useLoading()

  useEffect(() => {
    if (loadedCanGo) {
      gsap.to(".loading-screen", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.5,
        pointerEvents: "none",
        userSelect: "none",
      })
      console.log("render")
    }
  }, [loadedCanGo])

  return (
    <>
      <div className="loading-screen"></div>
      {children}
    </>
  )
}

export default Loaded
