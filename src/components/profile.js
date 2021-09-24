import React from "react";
import Layout from "../components/layout";
import { Box } from "@material-ui/core";
import { Typography, Stack } from "@mui/material";

export default function ProfilePage({ pageContext }) {
  const { token } = pageContext;
  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Stack>
          <img src={token.image_thumbnail_url} alt="" />
          <Typography variant="h6">Token ID: {token.id}</Typography>
        </Stack>
      </Box>
    </Layout>
  );
}
