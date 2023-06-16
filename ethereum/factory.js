import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xc45AAa21BeEcBfE0b55eBECEE21593B886A0754e"
);

export default instance;
