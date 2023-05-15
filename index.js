const { getContract, getPool } = require("./manager");
const config = JSON.parse(process.env.CONFIG);
const { pool_address, contract_rpc, contract_address, private_key } = config;

async function main() {
    let delay = performance.now();

    console.log("getting contract and pool information...");
    const contract = await getContract(contract_rpc, contract_address, private_key);
    const { APR, delegators } = await getPool(pool_address);

    console.log("checking changed delegators...");
    const changed = await contract.changedDelegators(delegators);
    const toUpdate = delegators.filter((x, i) => x[0] == changed[i][0]);
    toUpdate.forEach(x => console.log(`${x[0]}: ${x[1]}`));
    const update = toUpdate.length > 0 ? (await contract.updateDelegators(toUpdate)) : null;
    update != null && console.log(`${toUpdate.length} of ${delegators.length} delegators updated`);

    console.log("checking contract's APR...");
    const oldAPR = await contract.getAPR();
    const setAPR = oldAPR != APR ? await contract.setAPR(APR) : null;
    setAPR != null && console.log(`APR changed from ${oldAPR} to ${APR}`);

    return `finished in ${((performance.now() - delay) / 1000).toFixed(4)}s`;
}

main().then(console.log).catch(console.error);