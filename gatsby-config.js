/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env`,
});
module.exports = {
  pathPrefix: "/p5-gatsby-tutorial",
  plugins: [
    {
      resolve: `gatsby-theme-material-ui`,
    },
    {
      resolve: `gatsby-plugin-webfonts`,
    },
    "gatsby-transformer-json",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
