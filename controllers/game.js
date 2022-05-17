const express = require('express');
const bip39 = require('bip39');
const BigChainDB = require('bigchaindb-driver');
const router = express.Router();


const API_PATH = 'https://test.ipdb.io/api/v1/'
const conn = new BigChainDB.Connection(API_PATH)

const createSingleAsset = async ({ asset, metadata, publicKey, privateKey }) => {
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        asset,
        metadata,
        [
            BigchainDB.Transaction.makeOutput(
                BigchainDB.Transaction.makeEd25519Condition(publicKey),
            ),
        ],
        publicKey,
    )

    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint, privateKey)

    let assetCreated = await conn.postTransactionCommit(txSigned)

    return assetCreated ?? {}
}

router.get('/', async (req, res, next) => {
    res.status(200).json({
        mnemonic: "hello",
        // private: user.privateKey,
        // public: user.publicKey,
    });
});

router.post('/', async (req, res, next) => {
    // create game for player
    // req.body.playerAssetId

    // check if playerGameExist req.body.player_asset_id && req.body.game_name
    // if exist (playerGameExist) return error player already link with game

    // create game for user
    const assetCreated = await createSingleAsset({
        asset: req.body.asset,
        metadata: req.body.metadata,
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
    })

    res.status(200).json({
        // mnemonic: mnemonic,
        // private: user.privateKey,
        // public: user.publicKey,
    });
});

module.exports = router;