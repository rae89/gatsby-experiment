const axios = require("axios");
const crypto = require("crypto");
const path = require("path");
const Web3Eth = require("web3-eth");
require("dotenv").config({
  path: `.env`,
});
const graphql = require("gatsby");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

//const url = process.env.GATSBY_ETH_URL;
//const url = process.env.GATABY_MUMBAI_URL;
const url = process.env.GATSBY_RINKEBY_URL;
const PINATA_TOKEN = process.env.PINATA_JWT;

const CONTRACT = require("./src/data/MyNFT.json");
const {
  default: SelectInput,
} = require("@material-ui/core/Select/SelectInput");

//const smartContractAddress = "0x1301566b3cb584e550a02d09562041ddc4989b91";
const smartContractAddress = "0x1A2Beeb13c731a6Fd39a552BE1a7240692093598";

function getContract() {
  // var abi_ = [
  //   {
  //     inputs: [
  //       { indexed: true, name: "from", type: "address" },
  //       { indexed: true, name: "to", type: "address" },
  //       { indexed: true, name: "tokenId", type: "uint256" },
  //     ],
  //     name: "Transfer",
  //     type: "event",
  //   },
  // ];

  var abi_ = CONTRACT.abi;

  const web3Eth = new Web3Eth(Web3Eth.givenProvider || url);
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
    //opensea_url = "https://api.opensea.io/api/v1/assets";
    opensea_url = "https://testnets-api.opensea.io/api/v1/assets";
    return await axios.get(opensea_url, request);
  } catch (error) {
    console.log(error);
  }
}

async function fetchTokenURI(tokenID, contract) {
  return contract.methods.tokenURI(tokenID).call();
}

async function getMetadata(token_uri) {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const response = await axios.get(token_uri, {
    headers: { Authorization: `Bearer ${PINATA_TOKEN}` },
  });
  return response.data;
}

async function fetchTokenData(tokens, contract) {
  const result = [];
  token_chunks = chunk(tokens, 30);
  for (const token_id of tokens) {
    const token_uri = await fetchTokenURI(token_id, contract);
    const token_metadata = await getMetadata(token_uri);
    var data = {};
    data["token_id"] = token_id;
    data["token_uri"] = token_uri;
    data["metadata"] = token_metadata;
    data[
      "image_url"
    ] = `https://cloudflare-ipfs.com/ipfs/${token_metadata.image}`;

    result.push(data);
  }
  return result;
}

async function fetchAssets(tokens) {
  const result = [];
  token_chunks = chunk(tokens, 30);
  for (const item of token_chunks) {
    const response = await getAssets(smartContractAddress, item);
    result.push(...response.data["assets"]);
  }
  return result;
}

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const contract = getContract();
  const events = await fetchTranserEvents(contract);
  const tokens = await getTokens(events); //const result = await fetchAssets(tokens);
  const result = await fetchTokenData(tokens, contract);

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
      token_id: asset.token_id,
      image_url: asset.image_url,
      asset_contract: smartContractAddress,
      token_metadata: asset.metadata,
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
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const fileNode = await createRemoteFileNode({
      url: node.image_url, // string that points to the URL of the image
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
