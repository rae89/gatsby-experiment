import React from "react";
import Layout from "../components/layout";
import { Box, Container } from "@material-ui/core";
import { Typography, Stack } from "@mui/material";
import { Button } from "gatsby-theme-material-ui";
import Helmet from "react-helmet";
import Header from "../components/header";

export default function ProfilePage({ pageContext }) {
  const { token } = pageContext;
  return (
    <Layout>
      <Container maxWidth="lg">
        <Header></Header>
      </Container>
      <Helmet>
        <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
      </Helmet>
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
              minHeight="30vh"
            >
              <img src={token.image_thumbnail_url} alt="" />
            </Box>
          </Container>
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="5vh"
            >
              <Typography variant="h6">Token ID: {token.token_id}</Typography>
            </Box>
          </Container>
          <Container>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="5vh"
            >
              <Button
                variant="contained"
                target="_blank"
                href={token.token_metadata}
              >
                Metadata
              </Button>
            </Box>
          </Container>
          <Container maxWidth="xs">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="30vh"
            >
              <nft-card
                contractAddress={token.asset_contract.address}
                tokenId={token.token_id}
              ></nft-card>
            </Box>
          </Container>
        </Stack>
      </Box>
    </Layout>
  );
}
