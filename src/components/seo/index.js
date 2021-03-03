import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function SEO({ meta, title, noIndex, image, description, defaultSEO, lang }) {
  const { siteTitle, siteDescription, siteTwitter, siteImageSharp } = defaultSEO

  return (
    <Helmet
      htmlAttributes={{
        lang: lang.split("-")[0],
      }}
      title={siteTitle}
      titleTemplate={title ? `${title} - ${siteTitle}` : `${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: description || siteDescription,
        },
        {
          property: `og:title`,
          content: title ? `${title} - ${siteTitle}` : `${siteTitle}`,
        },
        {
          property: `og:description`,
          content: description || siteDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image
            ? image.childImageSharp.fixed.src
            : siteImageSharp.childImageSharp.fixed.src,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteTwitter,
        },
        {
          name: `twitter:title`,
          content: siteTitle,
        },
        {
          name: `twitter:description`,
          content: description || siteDescription,
        },
      ].concat(meta)}
    >
      <link rel="preconnect" href="https://prismic-io.s3.amazonaws.com" />
      <link rel="preconnect" href="https://images.prismic.io" />
      <link
        rel="preconnect"
        href="https://gatsby-creative-portfolio-template.prismic.io"
      />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
