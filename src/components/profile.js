import React from "react";
import Layout from "../components/layout";
import DenseTable from "../components/DenseTable";
import { Box, Container } from "@material-ui/core";
import { Typography, Stack } from "@mui/material";
import { Button } from "gatsby-theme-material-ui";
import Header from "../components/header";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function ProfilePage({ data }) {
  const token = data.nftAssets;
  const image = getImage(token.image);
  return (
    <Layout>
      <Container maxWidth="lg">
        <Header></Header>
      </Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Stack>
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
              position="relative"
              top="20"
              bottom="-10"
            >
              <GatsbyImage
                style={{
                  border: "5px solid rebeccapurple",
                  borderRadius: 5,
                }}
                image={image}
                layout="constrained"
              />
            </Box>
          </Container>
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="-200vh"
              position="relative"
              top="5"
              bottom="5"
            >
              <Typography variant="h6">Token ID: {token.token_id}</Typography>
            </Box>
          </Container>
          <DenseTable />
          <Button
            variant="contained"
            target="_blank"
            href={
              "https://testnets.opensea.io/assets/" +
              token.asset_contract +
              "/" +
              token.token_id
            }
          >
            Buy Now
          </Button>
          <Container maxWidth="xs">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="20vh"
            ></Box>
          </Container>
        </Stack>
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query($token_id: String!) {
    nftAssets(token_id: { eq: $token_id }) {
      image {
        childImageSharp {
          gatsbyImageData(width: 300)
        }
      }
      token_id
      token_metadata {
        medium
        name
        asset_name
        description
        image
        series
      }
      asset_contract
    }
  }
`;
