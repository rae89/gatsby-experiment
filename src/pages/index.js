import React from "react";
import Splash from "../components/splash";
import Layout from "../components/layout";
import { Button, Link } from "gatsby-theme-material-ui";

const IndexPage = () => (
  <Layout>
    <Button>
      <Link to="/gallery">Enter</Link>
    </Button>
    <Splash></Splash>
  </Layout>
);

export default IndexPage;
