import { newAccount } from '../../../mate/account.js';
import { createEmptyStorageRoot } from '../../../mate/utils.js';
import { createTestConsensus } from '../../consensus/__tests__/consensusTest.util.js';
import { skCacheKeys } from '../../skfs/key.js';
import { createTestBlockService } from '../../ipld/blockService/__tests__/blockService.util.js';
import type { DidJson } from '../../p2p/did.js';
import { TransactionAction } from '../index.js';

export const createTestTransAction = async (
  name: string,
  user: DidJson,
): Promise<TransactionAction> => {
  const bs = await createTestBlockService({ name });
  const consensus = await createTestConsensus({
    db: bs.db,
    blockService: bs,
  });
  await bs.db.cachePut(skCacheKeys.accountId, user.id);
  await bs.db.cachePut(skCacheKeys.accountPrivKey, user.privKey);

  await bs.addAccount(newAccount(user.id, await createEmptyStorageRoot()));

  await consensus.init();
  const transAction = new TransactionAction(bs, consensus);
  return transAction;
};
