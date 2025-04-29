const express = require("express");

const router = express.Router();

router.get("/query", function(req, res){
    stateManager.getState().respondTo(req.query.message, req, res);
});

module.exports = router;