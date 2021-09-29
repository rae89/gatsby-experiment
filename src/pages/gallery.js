import React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { graphql, navigate } from "gatsby";
import Layout from "../components/layout";
import { Box, Container } from "@material-ui/core";

const GalleryPage = (props) => {
  const tokens = props.data.allNftAssets.edges;

  return (
    <Layout>
      <Container>
        <ImageList
          sx={{
            ml: "auto",
            mr: "auto",
            maxWidth: "max-content",
            height: "auto",
            overflow: "hidden",
          }}
          cols={3}
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
                  <img src={tokenData.image_thumbnail_url} />
                </Container>
              </ImageListItem>
            );
          })}
        </ImageList>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  {
    allNftAssets {
      edges {
        node {
          id
          image_thumbnail_url
          image_url
          token_id
          token_metadata
          traits {
            display_type
            trait_count
            trait_type
          }
          asset_contract {
            address
          }
        }
      }
    }
  }
`;

export default GalleryPage;
