import { MyERC721 } from "../typechain";
import { ethers } from "hardhat";

async function main() {

  let erc721 : MyERC721;
  let baseUri = "https://gateway.pinata.cloud/ipfs/QmRLaoJoLxcsEhA3JXs3FeShJJXyAfVTSw7KvrJfV554MA/";

  const HR721Factory = (await ethers.getContractFactory("MyERC721"));
  
  erc721 = await HR721Factory.deploy("HappyRoger721", "HR721", baseUri);
  console.log("Token 721 deployed to:", erc721.address); 
  // Deployed and Verifyed in Rinkeby 0xcEfC78A0F84841b39c90671f713Eea6a7e1E73A5
}//0xD2008bF862e279bE3d45417b36A3F82f34fcDDd3

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

