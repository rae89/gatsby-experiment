import React from "react";
import Splash from "../components/splash";
import Layout from "../components/layout";
import styled from "styled-components";
import { Button, Link } from "gatsby-theme-material-ui";

export default function IndexPage() {
  return (
    <Layout>
      <Button>
        <Link to="/gallery">Enter</Link>
      </Button>
      <Splash></Splash>
    </Layout>
  );
}
