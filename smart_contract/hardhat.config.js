// https://eth-ropsten.alchemyapi.io/v2/KNZYUucE4bJD2DNHH_DIm2oiqA1nPv-F

require('@nomiclabs/hardhat-waffle');

module.exports = {
 solidity: '0.8.0',
 networks: {
   ropsten: {
     url: 'https://eth-ropsten.alchemyapi.io/v2/KNZYUucE4bJD2DNHH_DIm2oiqA1nPv-F',
     accounts: ['f64e54389d05d4b38e3e8633d1aa7174ec103220419465b329a13e8649e9985e']
   }
 }
}