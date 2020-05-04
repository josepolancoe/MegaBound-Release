var Types = require('./gametypes');
var _ = require('underscore');
var Message = require('./lib/message');
var Logger = require('./lib/logger');
var DataBase = require('./database');
let mysql = require('mysql2/promise');
var Logger = require('./lib/logger');
var Promise = require('promise');

var self = this;
this.db = new DataBase();

// commands
module.exports = class Commands {
    constructor(account) {
        this.account = account;
        this.gameserver = account.gameserver;
    }


    parse(msj) {
        var self = this;
        var data;
        try {
            data = this.cmdargs(msj);
            switch (data[0]) {
                case '/bcm':
                    {
                        if (data[1] !== null && data[1].length > 0) {
							// data.forEach(function (elemento)){
								// self.gameserver.pushBroadcast(new Message.chatResponse(self.account, data[elemento], Types.CHAT_TYPE.GM_BUGLE));
							// }
							
							//self.gameserver.pushBroadcast(new Message.chatResponse(self.account, pg_url.join(' '), Types.CHAT_TYPE.GM_BUGLE));
							
							//var removed = data.splice(0);
							
							var skip = data.slice(1);
                            
							
							self.gameserver.pushBroadcast(new Message.chatResponse(self.account, skip.join(' '), Types.CHAT_TYPE.GM_BUGLE));
							
							// self.gameserver.pushBroadcast(new Message.chatResponse(self.account, data[1], Types.CHAT_TYPE.GM_BUGLE));
                        }
                        break;
                    }
                case '/sys':
                    {
                        if (data[1] !== null && data[1].length > 0) {
							var skip2 = data.slice(1);
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, skip2.join(' '), Types.CHAT_TYPE.SYSTEM));
                        }
                        break;
                    }
                case '/clear':
                    {
                        if (self.account.player.gm === 1) {
                            self.gameserver.chathistory = [];
                        }
                        break;
                    }
                case '/on4':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 8;
                            self.account.room.power = 1;
                        }
                        break;
                    }
                case '/on2':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 4;
                            self.account.room.power = 1;
                        }
                        break;
                    }
				case '/on1':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 1;
                            self.account.room.power = 1;
                        }
                        break;
                    }	
                case '/bug':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            if (typeof (self.account.room.game) !== 'undefined') {
                                self.account.room.game.gamePass(null);
                            }
                        }
                        break;
                    }
				case '/mute':
                    {
						if(data[1] !== null && data[1].length > 0){
							con.connect(function(err){
								var sql = "UPDATE user SET is_muted ='1' WHERE game_id= '"+data[1]+"' ";
								con.query(sql, function(err, result){
									
								});
							});
						}
                        break;
                    }
				case '/cash':
                    {
						// if(data[1] !== null && data[1].length > 0){
							// con.connect(function(err){
								// var sql ="UPDATE users SET cash = (cash + '"+ data[2] +"')WHERE game_id='"+ data[1] +"' ";
								// con.query(sql, function(err, result){
									// self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+"' GANO '"+ data[2]+"' DE CASH", Types.CHAT_TYPE.SYSTEM));
								// });
							// });
						// }
						// break;
						
						//var self = this;
						return new Promise(function (resolve, reject) {
							self.connection.getConnection().then(conn => {
								conn.query("UPDATE users SET cash = (cash + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'")
									.then(rows => {
										conn.release();
										if (rows[0].length > 0)
											return resolve(rows);
										else
											return reject();
											
									});
							});
						});
						break;
					}
        } catch (e) {
            
        }
    }

    cmdargs(str) {
        var args = [];
        var nred = false;
        var part = '';
        for (var i = 0; i < str.length + 1; i++) {
            if (str.charAt(i) === " " && nred === false || i === str.length) {
                args.push(part);
                part = '';
            } else {
                //if (str.charAt(i) === '\"') {
				if (str.charAt(i) === '\"') {
                    nred = !nred;
                } else {
                    part += str.charAt(i);
                }
            }
        }
		Logger.info(args);
        return args;
    }
};