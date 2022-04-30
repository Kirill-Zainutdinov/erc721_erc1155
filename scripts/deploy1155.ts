import { MyERC1155 } from "../typechain";
import { ethers } from "hardhat";

async function main() {

  let erc1155 : MyERC1155;
  let baseUri = "https://gateway.pinata.cloud/ipfs/QmRLaoJoLxcsEhA3JXs3FeShJJXyAfVTSw7KvrJfV554MA/";

  const HR1155Factory = (await ethers.getContractFactory("MyERC1155"));
  
  erc1155 = await HR1155Factory.deploy("HappyRoger1155", "HR1155", baseUri);
  console.log("Token 1155 deployed to:", erc1155.address); 
  // Deployed and Verifyed in Rinkeby 0x9dFC4CeaF2c38b4A41aECFc168BDD298935E0F5E
}//0xD2757Ce0B56b1f89b5919d66Add61380c953134E

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

