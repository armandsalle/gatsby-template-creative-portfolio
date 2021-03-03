import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import CustomRichText from "../components/richText"
import useCurrentLang from "../hooks/useCurrentLang"

const Home = ({
  data: {
    prismic: { layout, home },
  },
  pageContext,
}) => {
  const urlLang = useCurrentLang()

  return (
    <>
      <SEO
        title={home.pageTitle}
        description={home.pageDescription}
        image={home.pageThumbnailSharp}
        defaultSEO={layout}
        lang={pageContext.lang}
      />
      <CustomRichText data={home.title} as="h1" />
      <CustomRichText data={home.description} />
      {home.projectList.map(({ projectItem }) => (
        <Link to={`/${urlLang}/${projectItem._meta.uid}`}>
          <CustomRichText data={projectItem.projectTitle} />
        </Link>
      ))}
    </>
  )
}

export default Home

export const homeQuery = graphql`
  query homePage($lang: String!) {
    prismic {
      home(lang: $lang, uid: "home") {
        description
        image
        title
        pageTitle
        pageDescription
        pageThumbnail
        pageThumbnailSharp {
          childImageSharp {
            fixed(quality: 100, width: 1200, height: 600, fit: COVER) {
              src
            }
          }
        }
        projectList {
          projectItem {
            ... on PRISMIC_Project {
              projectTitle
              projectContent
              _meta {
                lang
                uid
              }
            }
          }
        }
      }
      layout(lang: $lang, uid: "layout") {
        siteTwitter
        siteTitle
        siteDescription
        siteAuthors
        siteImage
        siteImageSharp {
          childImageSharp {
            fixed(width: 1200, height: 630, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
