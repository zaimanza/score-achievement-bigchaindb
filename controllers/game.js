const express = require('express');
const bip39 = require('bip39');
const BigChainDB = require('bigchaindb-driver');
const useGames = require('../modules/useGames');
const router = express.Router();

const { createSingleAsset, updateSingleAsset } = useGames()

router.get('/', async (req, res, next) => {
    // get all player games

    // check if playerGamesExist req.body.publicKey
    // if exist (!playerGamesExist) return empty string

    // return player games

    res.status(200).json({
        mnemonic: "hello",
        // private: user.privateKey,
        // public: user.publicKey,
    });
});

router.post('/', async (req, res, next) => {
    // create game for player
    // req.body.playerAssetId

    // check if playerGameExist req.body.publicKey && req.body.game_name
    // if exist (playerGameExist) return error player already link with game

    // create game for user
    const assetCreated = await createSingleAsset({
        asset: req.body.asset,
        metadata: req.body.metadata,
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
    })

    console.log("asset_created")
    console.log(assetCreated)

    res.status(200).json(assetCreated);
});

router.patch('/', async (req, res, next) => {

    // check if playerGameExist req.body.publicKey && req.body.game_name
    // if exist (!playerGameExist) return error player has not registered

    // append game for user
    const assetAppend = await updateSingleAsset({
        txCreatedID: req.body.txCreatedID,
        metadata: req.body.metadata,
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
    })

    console.log("asset_append")
    console.log(assetAppend)
    res.status(200).json(assetAppend);
});

module.exports = router;