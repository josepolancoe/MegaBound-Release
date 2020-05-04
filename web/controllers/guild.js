var express = require('express'), 
    router = express.Router();

var mysql = require('mysql');
var Logger = require('../../game/lib/logger');
var ignoreCase = require('ignore-case');
var md5 = require('md5');
var constants = require('constants');

router.get('/', function(req, res) {
    res.redirect('/');
});

router.get('/:guild_id', function(req, res) {
    var guild_id = req.params.guild_id;
    //res.send(guild_id);
    //res.render('guild');
    try {
            Logger.log("guild: '" + guild_id + "'");
                req.db.getUserGuild(guild_id)
                    .then(function (resb) {
                        var rows = resb[0];
                        res.render('guild', {
                            Name: rows[0].Name,
                            game_id1: rows[0].game_id,
                            //game_id2: rows[1].game_id,
                            rank1: rows[0].rank,
                            //rank2: rows[1].rank,
                            gp1:rows[0].gp,
                            //gp2:rows[1].gp,
                            id_guild: rows[0].id_guild
                        });
                    })
                    .catch(function (err) {
                        Logger.debug("guild: " + e.stack);
                        res.redirect('/');
                    });
            } catch (e) {
                Logger.debug("guild: " + e.stack);
                res.redirect('/');
            }
});

module.exports = router;