import React from "react";
import Layout from "../components/layout";
import { Box, Container } from "@material-ui/core";
import { Typography, Stack } from "@mui/material";
import { Button } from "gatsby-theme-material-ui";
import Helmet from "react-helmet";

export default function ProfilePage({ pageContext }) {
  const { token } = pageContext;
  return (
    <Layout>
      <Helmet>
        <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
      </Helmet>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Stack>
          <Container>
            <img src={token.image_url} alt="" />
          </Container>
          <Container>
            <Typography variant="h6">Token ID: {token.token_id}</Typography>
          </Container>
          <Container>
            <Button
              variant="contained"
              target="_blank"
              href={token.token_metadata}
            >
              Metadata
            </Button>
          </Container>
          <Container>
            <nft-card
              contractAddress={token.asset_contract.address}
              tokenId={token.token_id}
            ></nft-card>
          </Container>
        </Stack>
      </Box>
    </Layout>
  );
}
