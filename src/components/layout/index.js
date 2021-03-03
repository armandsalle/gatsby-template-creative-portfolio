import React, { useContext, useEffect, useState } from "react"
import { Transition, SwitchTransition } from "react-transition-group"
import { Link, navigate } from "gatsby"
import { gsap } from "gsap"
import Cursor from "../cursor"
import Loaded from "../loaded"
import useLoading from "../../hooks/useLoading"
import useCurrentLang from "../../hooks/useCurrentLang"
import { AnimationContext } from "../../contexts/animationContext"

import "../../styles/main.scss"

const Layout = ({ children, location, pageContext }) => {
  const { exitAnimation, enterAnimation } = useContext(AnimationContext)
  const [appHasRun, setAppRun] = useState(false)
  const { animationsCanRun } = useLoading()

  const urlLang = useCurrentLang()

  useEffect(() => {
    if (!appHasRun) {
      if (pageContext.uid === "home") {
        if (!urlLang) return

        navigate(`/fr`, {
          replace: true,
        })
      }

      setAppRun(true)
    }
  }, [pageContext.uid, appHasRun, setAppRun, urlLang])

  const playExit = (node, path) => {
    if (animationsCanRun && exitAnimation === "opacity") {
      gsap.to(node, {
        opacity: 0,
        duration: 0.25,
        onStart: () => {
          document.querySelector("body").style.pointerEvents = "none"
        },
      })
    } else {
      document.querySelector("body").style.pointerEvents = "none"
    }
  }

  const playEnter = (node, path) => {
    if (animationsCanRun && enterAnimation === "opacity") {
      gsap.fromTo(
        "main",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.25,
          onStart: () => {
            document.querySelector("body").style.overflowY = "unset"
            document.querySelector("body").style.pointerEvents = "all"
          },
        }
      )
    } else {
      document.querySelector("body").style.pointerEvents = "all"
      document.querySelector("body").style.overflowY = "unset"
    }
  }

  return (
    <Loaded>
      <nav>
        <Link to="/fr" onClick={}>
          Home fr
        </Link>
        <Link to="/">Home e</Link>
      </nav>
      <SwitchTransition mode="out-in">
        <Transition
          key={location.pathname}
          timeout={{ exit: 500, enter: 0 }}
          onExit={node => playExit(node, location.pathname)}
          onEnter={node => playEnter(node, location.pathname)}
        >
          <main>{children}</main>
        </Transition>
      </SwitchTransition>
      <Cursor />
    </Loaded>
  )
}

export default Layout
