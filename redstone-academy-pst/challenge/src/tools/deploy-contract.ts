
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
//import { PstState } from '../contracts/types/types';
import {
    ArWallet,
    LoggerFactory,
    PstContract,
    SmartWeave,
    SmartWeaveNodeFactory,
} from 'redstone-smartweave';
import fs from 'fs';
import path from 'path';
import jwk from '../../.secrets/jwk.json';

let contractSrc: string;

let wallet: JWKInterface;
let walletAddress: string;

//let initialState: PstState;

let arweave: Arweave;
let smartweave: SmartWeave;

(async () => {
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
    });

    LoggerFactory.INST.logLevel('error');

    smartweave = SmartWeaveNodeFactory.memCached(arweave);
    // wallet = await arweave.wallets.generate();
    // const address = await arweave.wallets.getAddress(wallet);
    // await arweave.api.get(`/mint/${address}/1000000000000000`);
    // walletAddress = await arweave.wallets.jwkToAddress(wallet);

    // contractSrc = fs.readFileSync(
    //     path.join(__dirname, '../../dist/contract.js'),
    //     'utf8'
    // );
    // const stateFromFile: PstState = JSON.parse(
    //     fs.readFileSync(
    //         path.join(__dirname, '../../dist/contracts/initial-state.json'),
    //         'utf8'
    //     )
    // );

    const contractSrc = fs.readFileSync(
        path.join(__dirname, '../../dist/contract.js'),
        'utf8'
    );
    const initialState = fs.readFileSync(
        path.join(__dirname, '../../dist/contracts/initial-state.json'),
        'utf8'
    );

    // initialState = {
    //     ...stateFromFile,
    //     ...{
    //         owner: walletAddress,
    //     },
    // };

    const contractTxId = await smartweave.createContract.deploy({
        wallet: jwk as ArWallet,
        initState: initialState,
        src: contractSrc,
    });

    console.log(contractTxId);

    //await arweave.api.get('mine');
})();
