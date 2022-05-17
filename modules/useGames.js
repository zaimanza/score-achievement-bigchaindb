const BigChainDB = require('bigchaindb-driver');
const bip39 = require('bip39');

const useGames = () => {
    const API_PATH = 'https://test.ipdb.io/api/v1/'
    const conn = new BigChainDB.Connection(API_PATH)

    const createSingleAsset = async ({ asset, metadata, publicKey, privateKey }) => {
        const txCreatePaint = BigChainDB.Transaction.makeCreateTransaction(
            asset,
            metadata,
            [
                BigChainDB.Transaction.makeOutput(
                    BigChainDB.Transaction.makeEd25519Condition(publicKey),
                ),
            ],
            publicKey,
        )

        const txSigned = BigChainDB.Transaction.signTransaction(txCreatePaint, privateKey)

        let assetCreated = await conn.postTransactionCommit(txSigned)

        return assetCreated ?? {}
    }
    return { createSingleAsset }
}

module.exports = useGames