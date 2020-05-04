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
                case '/on8':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 8;
                            self.account.room.power = 1;
                        }
                        break;
                    }
                case '/on4':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 4;
                            self.account.room.power = 1;
                        }
                        break;
                    }
				case '/on2':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 2;
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
                            case '/gp':
                                {
                                    if (data[1] !== null && data[1].length > 0) {
                                        cash1.db.connection.getConnection().then(conn => {
                                            conn.query("UPDATE users SET gp = (gp + '"+ data[2] +"') WHERE game_id='"+ data[1] +"'",function(err, result){
                                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, " '"+data[1]+"' GANÓ '"+ data[2]+"' DE GP ", Types.CHAT_TYPE.SYSTEM));
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
                                    case '/head':
                                        {
                                            if (data[1] !== null && data[1].length > 0) {
                                                cash1.db.connection.getConnection().then(conn => {
                                                    conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',0,'',1,'','','') ",function(err, result){
                                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Head)", Types.CHAT_TYPE.SYSTEM));
                                                    }).then(rows => {
                                                            conn.release();                                       
                                                        });
                                                });
                                            }
                                            break;
                                        }
                                        case '/body':
                                            {
                                                if (data[1] !== null && data[1].length > 0) {
                                                    cash1.db.connection.getConnection().then(conn => {
                                                        conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',1,'',1,'','','') ",function(err, result){
                                                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Body)", Types.CHAT_TYPE.SYSTEM));
                                                        }).then(rows => {
                                                                conn.release();                                       
                                                            });
                                                    });
                                                }
                                                break;
                                            }
                                            case '/glass':
                                                {
                                                    if (data[1] !== null && data[1].length > 0) {
                                                        cash1.db.connection.getConnection().then(conn => {
                                                            conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',2,'',1,'','','') ",function(err, result){
                                                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Glass)", Types.CHAT_TYPE.SYSTEM));
                                                            }).then(rows => {
                                                                    conn.release();                                       
                                                                });
                                                        });
                                                    }
                                                    break;
                                                }
                                                case '/flag':
                                                    {
                                                        if (data[1] !== null && data[1].length > 0) {
                                                            cash1.db.connection.getConnection().then(conn => {
                                                                conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',3,'',1,'','','') ",function(err, result){
                                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Flag)", Types.CHAT_TYPE.SYSTEM));
                                                                }).then(rows => {
                                                                        conn.release();                                       
                                                                    });
                                                            });
                                                        }
                                                        break;
                                                    }
                                    case '/background':
                                        {
                                            if (data[1] !== null && data[1].length > 0) {
                                                cash1.db.connection.getConnection().then(conn => {
                                                    conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',4,'',1,'','','') ",function(err, result){
                                                        self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Background)", Types.CHAT_TYPE.SYSTEM));
                                                    }).then(rows => {
                                                            conn.release();                                       
                                                        });
                                                });
                                            }
                                            break;
                                        }
                                        case '/foreground':
                                            {
                                                if (data[1] !== null && data[1].length > 0) {
                                                    cash1.db.connection.getConnection().then(conn => {
                                                        conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',5,'',1,'','','') ",function(err, result){
                                                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Foreground)", Types.CHAT_TYPE.SYSTEM));
                                                        }).then(rows => {
                                                                conn.release();                                       
                                                            });
                                                    });
                                                }
                                                break;
                                            }
										case '/delete':
                                            {
                                                if (data[1] !== null && data[1].length > 0) {
                                                    cash1.db.connection.getConnection().then(conn => {
                                                        conn.query(" INSERT INTO user_avatars (Id, UserId, aId, type, expire, is_cash, is_gift, amount, expire_time) VALUES ('',' "+ data[1] +" ',' "+ data[2] +" ',5,'',1,'','','') ",function(err, result){
                                                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El GM envió tú regalo (Foreground)", Types.CHAT_TYPE.SYSTEM));
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
								case '/mod':
                                    {
                                        if (data[1] !== null && data[1].length > 0) {
                                            cash1.db.connection.getConnection().then(conn => {
                                                conn.query("UPDATE users SET rank = 27, gm = 1 WHERE game_id='"+ data[1] +"'",function(err, result){
                                                    self.gameserver.pushBroadcast(new Message.chatResponse(self.account, "El nivel de '"+data[1]+"' fue cambiado", Types.CHAT_TYPE.SYSTEM));
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

                                        case '/send':
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
                                            case '/update_all':
                                                {
                                                        cash1.db.connection.getConnection().then(conn => {
                                                            conn.query("UPDATE users SET rank = CASE WHEN rank=26 THEN 26 WHEN rank=27 THEN 27 WHEN gp>120000 THEN 24 WHEN gp>110000 THEN 23 WHEN gp>100000 THEN 22 WHEN gp > 90000 THEN 21 WHEN gp>80000 THEN 20 WHEN gp>70000 THEN 19 WHEN gp>60000 THEN 18 WHEN gp>50000 THEN 17 WHEN gp>40000 THEN 16 WHEN gp>30000 THEN 15 WHEN gp>22933 THEN 14 WHEN gp>15001 THEN 13 WHEN gp>10042 THEN 12 WHEN gp>6900 THEN 11 WHEN gp>6000 THEN 10 WHEN gp>5100 THEN 9 WHEN gp>4200 THEN 8 WHEN gp>3500 THEN 7 WHEN gp>2800 THEN 6 WHEN gp>2300 THEN 5 WHEN gp>1800 THEN 4 WHEN gp>1500 THEN 3 WHEN gp>1200 THEN 2 WHEN gp>1100 THEN 1 WHEN gp>=1000 THEN 0 END", function(err, result, fields){
                                                                console.log(result);
                                                                self.gameserver.pushBroadcast(new Message.chatResponse(self.account,  JSON.stringify(result) , Types.CHAT_TYPE.SYSTEM));
                                                            }).then(rows => {
                                                                    conn.release();                                       
                                                                });
                                                        });
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