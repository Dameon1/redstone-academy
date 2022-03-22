import Arweave from 'arweave';

// Since v1.5.1 you're now able to call the init function for the web version without options. The current path will be used by default, recommended.
export const arweave = Arweave.init();