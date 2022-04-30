import { MyERC721__factory, MyERC1155__factory} from "../typechain";
import { task, types } from "hardhat/config";
import '@nomiclabs/hardhat-ethers'


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// функция mint для ERC721
task("mint721", "mint NFT token")
    .addParam("to")
    .setAction(async (args, hre) => {
        // подключаемся к контракту
        const MyERC721Factory = (await hre.ethers.getContractFactory("MyERC721")) as MyERC721__factory;
        const erc721 = await MyERC721Factory.attach("0x586A8c3dbeb7FBD21DA24F2EEcb26DAB8eB2e6D3");

        // сохраняем баланс до mint
        const balanceBefore = await erc721.balanceOf(args.to);

        // вызываем функцию на контракте
        const tx = await erc721.mint(args.to);
        await tx.wait();

        // сохраняем баланс после отправки
        const balanceAfter = await erc721.balanceOf(args.to);

        console.log("The sending of the funds was successful.")
        console.log(`The balance of the ${args.to} address has changed from ${balanceBefore} to ${balanceAfter}`)
});

// функция mint для ERC155
task("mint1155", "mint NFT token")
    .addParam("to")
    .addParam("tokenId")
    .addParam("amount")
    .setAction(async (args, hre) => {
        // подключаемся к контракту
        const MyERC1155Factory = (await hre.ethers.getContractFactory("MyERC1155")) as MyERC1155__factory;
        const erc1155 = await MyERC1155Factory.attach("0x9dFC4CeaF2c38b4A41aECFc168BDD298935E0F5E");

        // сохраняем баланс до mint
        const balanceBefore = await erc1155.balanceOf(args.to, args.tokenId);

        // вызываем функцию на контракте
        const tx = await erc1155.mint(args.to, args.tokenId, args.amount);
        await tx.wait();

        // сохраняем баланс после отправки
        const balanceAfter = await erc1155.balanceOf(args.to, args.tokenId);

        console.log("The sending of the funds was successful.")
        console.log(`The balance of the ${args.to} address has changed from ${balanceBefore} to ${balanceAfter}`)
});

// функция mintBatch для ERC155
task("mintBatch", "mint NFT token")
    .addParam("to")
    .addParam("tokenIds", "", [], types.json)
    .addParam("amounts", "", [], types.json)
    .setAction(async (args, hre) => {
        // подключаемся к контракту
        const MyERC1155Factory = (await hre.ethers.getContractFactory("MyERC1155")) as MyERC1155__factory;
        const erc1155 = await MyERC1155Factory.attach("0x9dFC4CeaF2c38b4A41aECFc168BDD298935E0F5E");

    // баланс целевых адресов
    // до вызова функции mintBatch()
    const balanceBefore = await erc1155.balanceOfBatch([args.to, args.to], args.tokenIds);

    // делаем эмиссию токенов на два адреса
    let tx  = await erc1155.mintBatch(args.to, args.tokenIds, args.amounts);
    await tx.wait();

    // баланс целевых адресов
    // после вызова функции mintBatch()
    const balanceAfter = await erc1155.balanceOfBatch([args.to, args.to], args.tokenIds);

    console.log("The sending of the funds was successful.")
    console.log(`The balance of the ${args.to} address has changed from ${balanceBefore} to ${balanceAfter}`)
});