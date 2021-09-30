import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";

export default function ShopPage() {
  return (
    <Layout>
      <Header></Header>
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          border: "none",
          maxHeight: "max-content",
        }}
      >
        <iframe
          src="https://opensea.io/collection/best-creature?embed=true"
          width="100%"
          height="100000px"
          frameborder="0"
          scrolling="no"
          overflow="visible"
          onload="window.parent.parent.scrollTo(0,0)"
        ></iframe>
      </div>
    </Layout>
  );
}
