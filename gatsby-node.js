const axios = require("axios");
const crypto = require("crypto");

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  //fetch raw data from the opensea api
  const fetchAssets = () =>
    axios.get(
      `https://api.opensea.io/api/v1/assets/?asset_contract_address=0x06012c8cf97bead5deae237070f9587f8e7a266d`
    );
  // await for results
  const res = await fetchAssets();

  // map into these results and create nodes
  res.data["assets"].map((asset, i) => {
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
      opensea_id: asset.id,
      token_id: asset.id,
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
