import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Img from "gatsby-image";
import { ImageList, ImageListItem } from "@mui/material";

import { graphql } from "gatsby";
import Layout from "../components/layout";

// const GalleryPage = () => (
//   <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
//     {itemData.map((item) => (
//       <ImageListItem key={item.img}>
//         <img src={tokenData.image_thumbnail_url} />
//       </ImageListItem>
//     ))}
//   </ImageList>
// );

const GalleryPage = (props) => {
  const tokens = props.data.allNftAssets.edges;

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {tokens.map((token, i) => {
        const tokenData = token.node;
        return (
          <ImageListItem key={i}>
            <img src={tokenData.image_thumbnail_url} />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export const query = graphql`
  query MyQuery {
    allNftAssets(filter: { id: {} }) {
      edges {
        node {
          id
          image_thumbnail_url
        }
      }
    }
  }
`;

export default GalleryPage;
