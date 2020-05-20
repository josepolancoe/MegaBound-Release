var Types = require('./gametypes');
var _ = require('underscore');
var Message = require('./lib/message');
var Logger = require('./lib/logger');

var DataBase = require('./database');
this.db = new DataBase();
var cash1 = this;


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
                            var skip = data.slice(1);
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, skip.join(' '), Types.CHAT_TYPE.GM_BUGLE));
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
                            self.account.gameserver.sendRooms();
                        }
                        break;
                    }
                    case '/on3':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 6;
                            self.account.room.power = 1;
                            self.account.gameserver.sendRooms();
                        }
                        break;
                    }
                case '/on2':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 4;
                            self.account.room.power = 1;
                            self.account.gameserver.sendRooms();
                        }
                        break;
                    }
				case '/on1':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 2;
                            self.account.room.power = 1;
                            self.account.gameserver.sendRooms();
                        }
                        break;
                    }
                        case '/on':
                        {
                            if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                                self.account.room.max_players = 0;
                                self.account.room.power = 1;
                                self.account.gameserver.sendRooms();
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
                                cash1.db.connection.getConnection().then(conn => {
                                    conn.query("UPDATE users SET is_muted ='1' WHERE game_id= '"+data[1]+"' ",function(err, result){
                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+" fue silenciado", Types.CHAT_TYPE.SYSTEM));
                                    }).then(rows => {
                                            conn.release();                                       
                                        });
                                });
                            }
                            break;
                        }
                        case '/offmute':
                        {
                            if(data[1] !== null && data[1].length > 0){
                                cash1.db.connection.getConnection().then(conn => {
                                    conn.query("UPDATE users SET is_muted ='0' WHERE game_id= '"+data[1]+"' ",function(err, result){
                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+" fue desilenciado", Types.CHAT_TYPE.SYSTEM));
                                    }).then(rows => {
                                            conn.release();                                       
                                        });
                                });
                            }
                            break;  
                        }
                    case '/cash':
                        {
                            if (data[1] !== null && data[1].length > 0) {
                                cash1.db.connection.getConnection().then(conn => {
                                    conn.query("UPDATE users SET cash = (cash + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+"' GANÓ '"+ data[2]+"' DE CASH ", Types.CHAT_TYPE.SYSTEM));
                                    }).then(rows => {
                                            conn.release();                                       
                                        });
                                });
                            }
                            break;
                        }
                        case '/gold':
                            {
                                if (data[1] !== null && data[1].length > 0) {
                                    cash1.db.connection.getConnection().then(conn => {
                                        conn.query("UPDATE users SET gold = (gold + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+"' GANÓ '"+ data[2]+"' DE ORO ", Types.CHAT_TYPE.SYSTEM));
                                        }).then(rows => {
                                                conn.release();                                       
                                            });
                                    });
                                }
                                break;
                            }
						case '/upgame':
                            {
                                if (data[1] !== null && data[1].length > 0) {
                                    cash1.db.connection.getConnection().then(conn => {
                                        conn.query("UPDATE users SET win = (win + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                        }).then(rows => {
                                                conn.release();                                       
                                            });
                                    });
                                }
                                break;
                            }
						case '/downgame':
                            {
                                if (data[1] !== null && data[1].length > 0) {
                                    cash1.db.connection.getConnection().then(conn => {
                                        conn.query("UPDATE users SET loss = (loss + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                        }).then(rows => {
                                                conn.release();                                       
                                            });
                                    });
                                }
                                break;
                            }
                            case '/upgp':
                                {
                                    if (data[1] !== null && data[1].length > 0) {
                                        cash1.db.connection.getConnection().then(conn => {
                                            conn.query("UPDATE users SET gp = (gp + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+"' Ganó '"+ data[2]+"' de GP ", Types.CHAT_TYPE.SYSTEM));
                                            }).then(rows => {
                                                    conn.release();                                       
                                                });
                                        });
                                    }
                                    break;
                                }
                                case '/downgp':
                                {
                                    if (data[1] !== null && data[1].length > 0) {
                                        cash1.db.connection.getConnection().then(conn => {
                                            conn.query("UPDATE users SET gp = (gp - '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+"' Perdió '"+ data[2]+"' de GP ", Types.CHAT_TYPE.SYSTEM));
                                            }).then(rows => {
                                                    conn.release();                                       
                                                });
                                        });
                                    }
                                    break;
                                }
                                case '/rank':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET rank = ('"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El nivel de '"+data[1]+"' fue cambiado", Types.CHAT_TYPE.SYSTEM));
                                                }).then(rows => {
                                                        conn.release();                                       
                                                    });
                                            });
                                        }
                                        break;
                                    }
								case '/photo':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET photo_url = ('"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                                }).then(rows => {
                                                        conn.release();                                       
                                                    });
                                            });
                                        }
                                        break;
                                    }
								case '/admin':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET rank = 26, gm = 1 WHERE game_id='"+ data[1] +"'",function(err, result){
                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "'"+data[1]+"' se convirtió en un GM", Types.CHAT_TYPE.SYSTEM));
                                                }).then(rows => {
                                                        conn.release();                                       
                                                    });
                                            });
                                        }
                                        break;
                                    }
								case '/mod':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET rank = 27, gm = 1 WHERE game_id='"+ data[1] +"'",function(err, result){
                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "'"+data[1]+"' se convirtió en un GM", Types.CHAT_TYPE.SYSTEM));
                                                }).then(rows => {
                                                        conn.release();                                       
                                                    });
                                            });
                                        }
                                        break;
                                    }
								case '/vip':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET rank = 31 WHERE game_id='"+ data[1] +"'",function(err, result){
                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "'"+data[1]+"' se convirtió en VIP", Types.CHAT_TYPE.SYSTEM));
                                                }).then(rows => {
                                                        conn.release();                                       
                                                    });
                                            });
                                        }
                                        break;
                                    }
                                    case '/gift':
                                        {
                                            if (data[1] !== null && data[1].length > 0) {
                                                cash1.db.connection.getConnection().then(conn => {
                                                    conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',0,'',1,'','','') ",function(err, result){
                                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo", Types.CHAT_TYPE.SYSTEM));
                                                    }).then(rows => {
                                                            conn.release();                                       
                                                        });
                                                });
                                            }
                                            break;
                                        }
								case '/kickgm':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET rank = 0, gm = 0 WHERE game_id='"+ data[1] +"'",function(err, result){
                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "'"+data[1]+"' fue degradado de GM", Types.CHAT_TYPE.SYSTEM));
                                                }).then(rows => {
                                                        conn.release();                                       
                                                    });
                                            });
                                        }
                                        break;
                                    }
                                    case '/info':
                                        {
                                            if (data[1] !== null && data[1].length > 0) {
                                                cash1.db.connection.getConnection().then(conn => {
                                                    conn.query("SELECT IdAcc, game_id, gender, rank, gp, cash, gold, win, loss FROM users where game_id='"+ data[1] +"' ", function(err, result, fields){
                                                        console.log(result);
                                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account,  JSON.stringify(result) , Types.CHAT_TYPE.SYSTEM));
                                                    }).then(rows => {
                                                            conn.release();                                       
                                                        });
                                                });
                                            }
                                            break;
                                        }
                                    case '/time':
                                        {
                                            if (self.account.player.gm === 1) {
                                                let now= new Date();
                                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, now, Types.CHAT_TYPE.SYSTEM));
                                            }
                                            break;
                                        }
                                    case '/ban':
                                        {
                                            if(data[1] !== null && data[1].length > 0){
                                                cash1.db.connection.getConnection().then(conn => {
                                                    conn.query("UPDATE `users` SET `unlock`=1 WHERE `game_id` ='"+data[1]+"' ",function(err, result){
                                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+" fue baneado", Types.CHAT_TYPE.SYSTEM));
                                                    }).then(rows => {
                                                            conn.release();                                       
                                                        });
                                                });
                                            }
                                            break;
                                        }
                                        case '/offban':
                                        {
                                            if(data[1] !== null && data[1].length > 0){
                                                cash1.db.connection.getConnection().then(conn => {
                                                    conn.query("UPDATE `users` SET `unlock`=0 WHERE `game_id` ='"+data[1]+"' ",function(err, result){
                                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+" fue desbaneado", Types.CHAT_TYPE.SYSTEM));
                                                    }).then(rows => {
                                                            conn.release();                                       
                                                        });
                                                });
                                            }
                                            break;
                                        }
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
                if (str.charAt(i) === '\"') {
                    nred = !nred;
                } else {
                    part += str.charAt(i);
                }
            }
        }
        return args;
    }

};