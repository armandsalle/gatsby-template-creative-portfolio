import React from "react"
import { registerLinkResolver } from "gatsby-source-prismic-graphql"
import { linkResolver } from "./src/utils/linkResolver"
import { AnimationProvider } from "./src/contexts/animationContext"

registerLinkResolver(linkResolver)

export const wrapRootElement = ({ element }) => {
  return <AnimationProvider>{element}</AnimationProvider>
}

export const shouldUpdateScroll = () => {
  return false
}

export const onRouteUpdate = () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 200)
}
