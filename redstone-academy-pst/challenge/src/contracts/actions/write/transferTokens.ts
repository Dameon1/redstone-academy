// ~~ Write the `transferTokens` interaction for your contract ~~
import { PstAction, PstState } from '../../../contracts/types/types';

declare const ContractError;

export const transferTokens = async (
    state: PstState,
    { caller, input: { target, qty } }: PstAction
) => {
    const balances = state.balances;
    if (!Number.isInteger(qty)) {
        throw new ContractError('Invalid value for "qty". Must be an integer');
    }

    if (!target) {
        throw new ContractError('No target specified');
    }

    if (qty <= 0 || caller === target) {
        throw new ContractError('Invalid token transfer');
    }

    if (!balances[caller]) {
        throw new ContractError(`Caller balance is not defined!`);
    }

    if (balances[caller] < qty) {
        throw new ContractError(
            `Caller balance not high enough to send ${qty} token(s)!`
        );
    }

    balances[caller] -= qty;
    if (target in balances) {
        balances[target] += qty;
    } else {
        balances[target] = qty;
    }

    return { state };
};
