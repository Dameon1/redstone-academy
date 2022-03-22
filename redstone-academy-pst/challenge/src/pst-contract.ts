import Arweave from 'arweave';
import {
    LoggerFactory,
    SmartWeaveWebFactory,
    SmartWeave,
} from 'redstone-smartweave';
export const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
});
LoggerFactory.INST.logLevel('debug');

export const smartweave: SmartWeave =
    SmartWeaveWebFactory.memCachedBased(arweave).build();
// Set up Arweave client
// export const arweave: Arweave = Arweave.init({
//     host: 'testnet.redstone.tools',
//     port: 443,
//     protocol: 'https',
// });


// // const smartweave = new SmartWeaveWebFactory.memCached(arweave);
// export const smartweave: SmartWeave =
//     SmartWeaveWebFactory.memCachedBased(arweave).build();

// Set up Arweave client


