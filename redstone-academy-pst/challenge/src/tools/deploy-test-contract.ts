
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { PstState } from '../contracts/types/types';
import {
    LoggerFactory,
    PstContract,
    SmartWeave,
    SmartWeaveNodeFactory,
} from 'redstone-smartweave';
import fs from 'fs';
import path from 'path';

let contractSrc: string;

let wallet: JWKInterface;
let walletAddress: string;

let initialState: PstState;

let arweave: Arweave;
let smartweave: SmartWeave;

(async () => {
    arweave = Arweave.init({
        host: 'testnet.redstone.tools',
        port: 443,
        protocol: 'https',
    });

    LoggerFactory.INST.logLevel('error');

    smartweave = SmartWeaveNodeFactory.memCached(arweave);
    wallet = await arweave.wallets.generate();
    const address = await arweave.wallets.getAddress(wallet);
    await arweave.api.get(`/mint/${address}/1000000000000000`);
    walletAddress = await arweave.wallets.jwkToAddress(wallet);

    contractSrc = fs.readFileSync(
        path.join(__dirname, '../../dist/contract.js'),
        'utf8'
    );
    const stateFromFile: PstState = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../../dist/contracts/initial-state.json'),
            'utf8'
        )
    );

    initialState = {
        ...stateFromFile,
        ...{
            owner: walletAddress,
        },
    };

    const contractTxId = await smartweave.createContract.deploy({
        wallet,
        initState: JSON.stringify(initialState),
        src: contractSrc,
    });

    console.log(contractTxId);

    await arweave.api.get('mine');
})();





// import Arweave from 'arweave';
// import { JWKInterface } from 'arweave/node/lib/wallet';
// import { PstState } from '../contracts/types/types';
// import {
//     LoggerFactory,
//     PstContract,
//     SmartWeave,
//     SmartWeaveNodeFactory,
// } from 'redstone-smartweave';
// import fs from 'fs';
// import path from 'path';

// let contractSrc: string;

// let wallet: JWKInterface;
// let walletAddress: string;

// let initialState: PstState;

// let arweave: Arweave;
// let smartweave: SmartWeave;

// (async () => {

//     // ~~ Initialize Arweave ~~
//     arweave = Arweave.init({
//         host: 'testnet.redstone.tools',
//         port: 443,
//         protocol: 'https',
//     });

//     // ~~ Initialize `LoggerFactory` ~~
//     LoggerFactory.INST.logLevel('error');

//     // ~~ Initialize SmartWeave ~~
//     smartweave = SmartWeaveNodeFactory.memCached(arweave);

//     // ~~ Generate wallet and add some funds ~~
//     wallet = await arweave.wallets.generate();
//     const address = await arweave.wallets.jwkToAddress(wallet);
//     await arweave.api.get(`/mint/${address}/1000000000000000`);
//     walletAddress = await arweave.wallets.jwkToAddress(wallet);

//     // ~~ Read contract source and initial state files ~~
//     contractSrc = fs.readFileSync(
//         path.join(__dirname, '../../dist/contract.js'),
//         'utf8'
//     );
//     const stateFromFile: PstState = JSON.parse(
//         fs.readFileSync(
//             path.join(__dirname, '../../dist/contracts/initial-state.json'),
//             'utf8'
//         )
//     );

//     // ~~ Override contract's owner address with the generated wallet address ~~
//     initialState = {
//         ...stateFromFile,
//         ...{
//             owner: walletAddress,
//         },
//     };

//     // ~~ Deploy contract ~~
//     const contractTxId = await smartweave.createContract.deploy({
//         wallet,
//         initState: JSON.stringify(initialState),
//         src: contractSrc,
//     });

//     // ~~ Log contract id to the console ~~
//     console.log(contractTxId);

// })();
