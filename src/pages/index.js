import React from "react";
import Splash from "../components/splash";
import Layout from "../components/layout";
import styled from "styled-components";
import { Button, Link } from "gatsby-theme-material-ui";
import { Box, Container } from "@material-ui/core";
import { navigate } from "gatsby-link";
import { Stack } from "@mui/material";

export default function IndexPage() {
  return (
    <Layout>
      <Container>
        <Box
          component="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="20vh"
        >
          <Button
            size="large"
            variant="contained"
            onClick={() => navigate("/gallery")}
          >
            Enter
          </Button>
        </Box>
      </Container>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        >
          <Splash></Splash>
        </Box>
      </Container>
    </Layout>
  );
}
