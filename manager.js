const { ethers } = require("ethers");

async function getContract(rpc, address, private_key) {
    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(private_key, provider);
    const abi = [
        'function changedDelegators((address, uint)[]) view returns ((address, uint)[])',
        'function updateDelegators((address, uint)[]) returns (bool)',
        'function getAPR() view returns (uint)',
        'function setAPR(uint) returns (bool)',
        'function claim() returns (bool)',
        'function balanceOf(address) view returns (uint)',
        'function unclaimedOf(address) view returns (uint)',
        'function minDeposit() view returns (uint)'
    ];
    return await new ethers.Contract(address, abi, wallet);
}

async function getPool(pool) {
    const data = await (await fetch(`https://apex.posichain.org/staking/networks/mainnet/validators/${pool}`)).json();
    const totalStaked = parseInt(data.total_stake) / 1e+18;
    const APR = Math.floor((10000 / totalStaked) * 0.025 * 365 * 100);
    const delegators = data.delegations.map(({ 'delegator-address': a, amount: b }) => [a, `${BigInt(b)}`]);
    return { APR, delegators };
}

module.exports = { getContract, getPool };
