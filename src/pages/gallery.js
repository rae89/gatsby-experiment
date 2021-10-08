import React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { graphql, navigate } from "gatsby";
import Layout from "../components/layout";
import { Box, Container, withWidth, isWidthUp } from "@material-ui/core";
import { Button } from "gatsby-theme-material-ui";
import Header from "../components/header";

const GalleryPage = (props) => {
  const tokens = props.data.allNftAssets.edges;

  function getCols(screenWidth) {
    if (isWidthUp("lg", screenWidth)) {
      return 5;
    }

    if (isWidthUp("md", screenWidth)) {
      return 3;
    }

    if (isWidthUp("sm", screenWidth)) {
      return 2;
    }

    if (isWidthUp("xs", screenWidth)) {
      return 1;
    }

    return 2;
  }

  const cols = getCols(props.width); // width is associated when using withWidth()
  return (
    <Layout>
      <Header></Header>
      <div style={{ marginTop: 150 }}>
        <ImageList
          sx={{
            ml: "auto",
            mr: "auto",
            maxWidth: "max-content",
            height: "auto",
            overflow: "hidden",
          }}
          cols={cols}
          rowHeight={220}
        >
          {tokens.map((token, i) => {
            const tokenData = token.node;
            return (
              <ImageListItem
                key={i}
                onClick={() =>
                  navigate(`/profile/${tokenData.token_id}`, {
                    state: { tokenData },
                  })
                }
              >
                <Container>
                  <Button onClick={() => navigate("/gallery")}>
                    <img src={tokenData.image.childImageSharp.fluid.base64} />
                  </Button>
                </Container>
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allNftAssets {
      edges {
        node {
          asset_contract {
            address
          }
          image {
            childImageSharp {
              fluid(quality: 100, pngQuality: 100, maxWidth: 1000) {
                base64
                tracedSVG
                src
                originalImg
                originalName
                presentationHeight
                presentationWidth
                sizes
                srcSet
                srcSetWebp
                srcWebp
              }
            }
          }
          token_id
          token_metadata
          traits {
            trait_type
            trait_count
            display_type
          }
          image_original_url
          image_preview_url
          image_thumbnail_url
          image_url
        }
      }
    }
  }
`;

export default withWidth()(GalleryPage);
