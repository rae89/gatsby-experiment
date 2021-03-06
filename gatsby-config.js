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
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
