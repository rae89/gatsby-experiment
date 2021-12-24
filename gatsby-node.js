const axios = require("axios");
const crypto = require("crypto");
const path = require("path");
const Web3Eth = require("web3-eth");
require("dotenv").config({
  path: `.env`,
});
const graphql = require("gatsby");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

const url = process.env.GATSBY_ETH_URL;
const pinata_token = process.env.PINATA_JWT;

function getContract() {
  var abi_ = [
    {
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: true, name: "tokenId", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
  ];

  const web3Eth = new Web3Eth(Web3Eth.givenProvider || url);
  const smartContractAddress = "0x1301566b3cb584e550a02d09562041ddc4989b91";
  const contract = new web3Eth.Contract(abi_, smartContractAddress);
  return contract;
}

async function fetchTranserEvents(contract) {
  return contract.getPastEvents("Transfer", {
    fromBlock: "earliest",
    toBlock: "latest",
  });
}

async function getTokens(events) {
  const tokens = new Set();
  for (const item of events) {
    tokens.add(item.returnValues.tokenId);
  }
  return Array.from(tokens);
}

function chunk(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

async function getAssets(contract_address, token_ids) {
  token_params = new URLSearchParams();
  token_params.append("asset_contract_address", contract_address);
  for (const id of token_ids) {
    token_params.append("token_ids", id);
  }
  var request = {
    params: token_params,
  };
  try {
    return await axios.get("https://api.opensea.io/api/v1/assets", request);
  } catch (error) {
    console.log(error);
  }
}

async function fetchAssets(tokens) {
  const smartContractAddress = "0x1301566b3cb584e550a02d09562041ddc4989b91";
  const result = [];
  token_chunks = chunk(tokens, 30);
  for (const item of token_chunks) {
    const response = await getAssets(smartContractAddress, item);
    result.push(...response.data["assets"]);
  }
  return await result;
}

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const contract = getContract();
  const events = await fetchTranserEvents(contract);
  const tokens = await getTokens(events);
  const result = await fetchAssets(tokens);

  // map into these results and create nodes
  result.map((asset, i) => {
    // Create your node object
    const assetNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `NFTAssets`, // name o the graphql query ----> allNFTAssets {}
        // contentDigest will be added just after bus it is required
      },
      children: [],

      // Other fields that you want to query with graphql
      ["image___NODE"]: createNodeId(`asset-image-{${asset.token_id}}`),
      opensea_id: asset.id,
      token_id: asset.token_id,
      num_sales: asset.num_sales,
      background_color: asset.background_color,
      image_url: asset.image_url,
      image_preview_url: asset.image_preview_url,
      image_thumbnail_url: asset.image_thumbnail_url,
      image_original_url: asset.image_original_url,
      animation_url: asset.animation_url,
      animation_original_url: asset.animation_original_url,
      asset_name: asset.asset_name,
      description: asset.description,
      external_link: asset.external_link,
      asset_contract: asset.asset_contract,
      permalink: asset.permalink,
      collection: asset.collection,
      token_metadata: asset.token_metadata,
      owner: asset.owner,
      creator: asset.creator,
      traits: asset.traits,
      last_sale: asset.last_sale,
      top_bid: asset.top_bid,
      listing_date: asset.listing_date,
      is_presale: asset.is_presale,
      transfer_fee_payment_token: asset.transfer_fee_payment_token,
      transfer_fee: asset.transfer_fee,
    };

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(assetNode))
      .digest(`hex`);
    // add it to assetNode
    assetNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(assetNode);
  });

  return;
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allNftAssets {
        edges {
          node {
            token_id
          }
        }
      }
    }
  `);
  const tokens = result.data.allNftAssets.edges;
  tokens.forEach((token) => {
    const tokenData = token.node;
    createPage({
      path: `/profile/${tokenData.token_id}`,
      component: path.resolve(`src/components/profile.js`),
      context: { token_id: tokenData.token_id },
    });
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  if (node.internal.type === "NFTAssets") {
    const { createNode } = actions;

    /* Download the image and create the File node. Using gatsby-plugin-sharp and gatsby-transformer-sharp the node will become an ImageSharp. */

    const fileNode = await createRemoteFileNode({
      url: node.image_original_url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      store, // Gatsby's redux store
      getCache, // get Gatsby's cache
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
    });

    if (fileNode) {
      // link the File node to Image node at field image
      node.image___NODE = fileNode.id;
    }
  }
};
