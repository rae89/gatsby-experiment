import React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { graphql, navigate } from "gatsby";
import Layout from "../components/layout";
import { Box, Container, withWidth, isWidthUp } from "@material-ui/core";
import { Button } from "gatsby-theme-material-ui";
import Header from "../components/header";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
  const rowHeight = "150";
  const buttonStyle = { minHeight: `${rowHeight}px` };
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
          rowHeight={rowHeight}
        >
          {tokens.map((token, i) => {
            const tokenData = token.node;
            const image = getImage(tokenData.image);
            return (
              <ImageListItem
                key={i}
                onClick={() =>
                  navigate(`/profile/${tokenData.token_id}`, {
                    state: { tokenData },
                  })
                }
              >
                <Box>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    onClick={() => navigate("/gallery")}
                  >
                    <GatsbyImage image={image} layout="constrained" />
                  </Button>
                </Box>
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
          image {
            childImageSharp {
              gatsbyImageData(width: 125)
            }
          }
          token_id
        }
      }
    }
  }
`;

export default withWidth()(GalleryPage);
