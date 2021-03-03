import React, {
  forwardRef,
  // useCallback,
  //  useEffect
} from "react"
import PropTypes from "prop-types"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../../utils/linkResolver"
import cn from "classnames"
// import useIsTouchDesign from "../../hooks/useIsTouchDesign"
// import { linkEnter, linkLeave } from "../../animations/cursor"

const CustomRichText = forwardRef(({ data, className, as }, ref) => {
  if (!data) return null

  //   const isTouchDevice = useIsTouchDesign()

  //   const mouseEnterLink = useCallback(() => {
  //     linkEnter(isTouchDevice)
  //   }, [isTouchDevice])

  //   const mouseLeaveLink = useCallback(() => {
  //     linkLeave(isTouchDevice)
  //   }, [isTouchDevice])

  //   useEffect(() => {
  //     const links = [...document.querySelectorAll(`.richtext a`)]

  //     links.forEach(link => {
  //       link.addEventListener("mouseenter", mouseEnterLink)
  //       link.addEventListener("mouseleave", mouseLeaveLink)
  //     })

  //     return () => {
  //       links.forEach(link => {
  //         link.removeEventListener("mouseenter", mouseEnterLink)
  //         link.removeEventListener("mouseleave", mouseLeaveLink)
  //       })
  //     }
  //   }, [mouseEnterLink, mouseLeaveLink])

  let result

  switch (as) {
    case "h1":
      result = (
        <h1 className={className} ref={ref}>
          {RichText.render(data, linkResolver)}
        </h1>
      )
      break

    default:
      result = (
        <div className={cn("richtext", className)} ref={ref}>
          {RichText.render(data, linkResolver)}
        </div>
      )
      break
  }

  return result
})

CustomRichText.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  as: PropTypes.string,
}

export default CustomRichText
