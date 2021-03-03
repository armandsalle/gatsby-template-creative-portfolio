require("dotenv").config({
  path: `.env`,
})

module.exports = {
  // flags: {
  //   DEV_SSR: false,
  // },
  siteMetadata: {
    title: `Gatsby Creative Portfolio Template Prismic`,
    description: `Gatsby Creative Portfolio Template Prismic`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/index.js`),
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Inter",
              variants: ["400", "700"],
            },
          ],
        },
        formats: ["woff2", "woff"],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: {
          options: {
            debug: false,
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "@prismicio/gatsby-source-prismic-graphql",
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME, // required
        defaultLang: "en-us", // optional, but recommended
        langs: ["fr-fr", "en-us"],
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        previews: false,
        omitPrismicScript: true,
        shortenUrlLangs: true,
        pages: [
          {
            type: "home",
            match: "/:lang?/",
            langs: ["fr-fr", "en-us"],
            component: require.resolve("./src/templates/home.js"),
          },
          {
            type: "project",
            match: "/:lang?/:uid",
            langs: ["fr-fr", "en-us"],
            component: require.resolve("./src/templates/project.js"),
          },
        ],
        sharpKeys: [
          /image|photo|picture/, // (default)
          "projectImage",
          "projectSliceImage",
          "projectImageSeo",
          "pageThumbnail",
          "siteImage",
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        checkSupportedExtensions: false,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Creative Portfolio Template Prismic`,
        short_name: `Gatsby Creative Portfolio Template Prismic`,
        start_url: `/`,
        lang: `en`,
        theme_color_in_head: false,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-zopfli",
      options: {
        extensions: ["css", "html", "js", "svg"],
      },
    },
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
  ],
}
