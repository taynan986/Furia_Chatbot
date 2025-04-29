const express = require("express");
const axios = require("axios");
const router = express.Router();

const KEY = process.env.API_KEY;

router.get("/matches", function(req, res){
    axios.get("https://api.pandascore.co/teams/furia/matches", {params: {token: KEY}})
    .then(function(response){
        var msg = "";
        const data = response.data;
        for (var i=0; i<data.length; i++){
            msg += new Date(data[i].begin_at).toLocaleDateString()+"\n";
            msg += data[i].opponents[0].opponent.name + " vs " + data[i].opponents[1].opponent.name+"\n\n";
        }
        res.send(msg);
    });
});

router.get("/matches/scheduled", function(req, res){
    axios.get("https://api.pandascore.co/teams/furia/matches", {params: {token: KEY, filter: {future: true}}})
    .then(function(response){
        var msg = "";
        const data = response.data;
        if (data.length === 0) msg = "Não encontrei partidas marcadas";
        for (var i=0; i<data.length; i++){
            msg += new Date(data[i].begin_at).toLocaleDateString()+"\n";
            msg += data[i].opponents[0].opponent.name + " vs " + data[i].opponents[1].opponent.name+"\n\n";
        }
        res.send(msg);
    });
});

router.get("/matches/past", function(req, res){
    axios.get("https://api.pandascore.co/teams/furia/matches", {params: {token: KEY, filter: {finished: true}}})
    .then(function(response){
        var msg = "";
        const data = response.data;
        if (data.length === 0) msg = "Não encontrei partidas marcadas";
        for (var i=0; i<data.length; i++){
            msg += new Date(data[i].begin_at).toLocaleDateString()+"\n";
            msg += data[i].opponents[0].opponent.name + " vs " + data[i].opponents[1].opponent.name+"\n\n";
        }
        res.send(msg);
    });
});

module.exports = router;