
async function main() {
  // We get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

// 
const runMain = async () => {
  try {
    await main();
    Process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}

runMain();


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
