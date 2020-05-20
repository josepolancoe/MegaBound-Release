var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var Player = require('./player');
var Bot = require('./bot');
var Room = require('./room');
var ignoreCase = require('ignore-case');
var mysql = require('mysql');
var Commands = require('./commands');

// account
module.exports = class Account {
    constructor(connection, gameserver) {
        this.connection = connection;
        this.gameserver = gameserver;
        this.con_id = connection.id;
        this.login_complete = false;
        this.player = null;
        this.user_id = null;
        this.last_message = 0;
        this.strik = 0;
        this.room_number = 0;
        this.location_type = Types.LOCATION.CHANNEL;
        this.hasEnteredGame = false;
        this.room = null;
        this.ready = false;
        this.commands = new Commands(this);

        var self = this;
        connection.listen(function (message) {
            var opcode = parseInt(message[0]);
            try {
                self.Handler(opcode, message);
            } catch (e) {
                Logger.debug("err: " + message);
                Logger.error("" + e.stack);
            }
        });

        connection.onClose(function () {
            if (self.room) {
                self.room.removePlayer(self);
            }
            if (self.exit_callback) {
                self.exit_callback();
            }
        });
    }

    Handler(opcode, message) {
        var self = this;
        switch (opcode) {
            case Types.CLIENT_OPCODE.login:
                {
                    let _ver = parseInt(message[1]);
                    let _id = parseInt(message[2]);
                    let _session = message[3];
                    let _hash = parseInt(message[4]);
                    let _last_win = parseInt(message[5]);
                    if (typeof (_id) !== 'number') {
                        self.sendMessage(new Message.alertResponse(":)", "Que haces? Ctrl+F5"));
                        self.connection.close();
                        return null;
                    }
                    self.gameserver.db.getPlayerData(_id, _session)
                    .then(function (data) {
                        if (data.error_mysql || data.error_querry) {
                            self.sendMessage(new Message.alertResponse(":)", "Error Servidor!"));
                            self.connection.close();
                        } else if (data.error_session || data.error_exist) {
                            self.sendMessage(new Message.alertResponse(":)", "Que haces? Ctrl+F5"));
                            self.connection.close();
                        } else {
                            self.send([Types.SERVER_OPCODE.login_profile]);
                            self.gameserver.checkAccountOnlineAndClose(data.user_id, function () {
                                self.send([Types.SERVER_OPCODE.login_avatars]);
                                self.user_id = data.user_id;
                                self.is_muted = data.is_muted;
                                self.player = new Player(data);
                                self.login_complete = true;
                                self.location_type = Types.LOCATION.CHANNEL;
                                self.sendMessage(new Message.loginResponse(self));
                                self.gameserver.addAccount(self);
                                self.gameserver.enter_callback(self);
                            });
                        }
                    })
                    .catch(function (err) {
                        self.connection.close();
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.get_avatar:
                {
                    let _id = message[1];
                    var data = self.gameserver.avatars.getAvatar(_id);
                    if (data !== null) self.send([Types.SERVER_OPCODE.avatar_info, _id, data]);
                    break;
                }
            case Types.CLIENT_OPCODE.get_my_avatars:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.gameserver.db.getPlayerAvatars(self)
                    .then(function (data) {
                        if (data.error_mysql || data.error_querry) {} else {
                            var dat = self.gameserver.avatars.getAvatarDataList(data.data_list);
                            self.sendMessage(new Message.myAvatars(self, dat));
                        }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.chat:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let _msj = message[1];
                    let _team = parseInt(message[2]);
                    let _unk = parseInt(message[3]);
                    let ch = self.location_type == Types.LOCATION.CHANNEL ? true : false;
                    if (self.player.gm === 1) {
                        self.commands.parse(_msj);
                    }
                    var showm = true;
                    if (_msj[0] === '/' && self.player.gm === 1)
                        showm = false;

                    if (self.gameserver.chathistory.length > 30)
                        self.gameserver.chathistory = [];

                    if (showm) {
                        if (self.location_type === Types.LOCATION.CHANNEL) {
                            this.Chat(_msj, ch);
                        } else if (self.location_type === Types.LOCATION.ROOM) {
                            if (self.room) {
                                self.room.chat(self, _msj, _team);
                            }
                        }
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.send_bcm:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let _msj = message[1];
                    if (_msj.length > 35) {} else if (self.player.megaphones > 0) {
                        _msj = _msj.replace("<", "");
                        _msj = _msj.replace(">", "");
                        _msj = _msj.replace("alert", "");
                        _msj = _msj.replace("\\", "");
                        _msj = _msj.replace("//", "");
                        _msj = _msj.replace("%", "");
                        self.gameserver.pushBroadcast(new Message.chatResponse(self, _msj, Types.CHAT_TYPE.BUGLE));
                        self.player.megaphones -= 1;
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.pchat:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let _id = parseInt(message[1]);
                    if (typeof (_id) !== 'number')
                        return null;
                    let _msj = message[2];
                    let account = self.gameserver.getAccountById(_id);
                    if (typeof (account) !== 'undefined' && account !== null) {
                        account.sendMessage(new Message.pChatResponse(self, this.player.game_id, _msj));
                        self.sendMessage(new Message.pChatResponse(account, this.player.game_id, _msj));
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.get_shop_page:
                {
                    let type = message[1];
                    let page = message[2];
                    if (type === null)
                        type = 0;
                    if (page === null)
                        page = 0;
                    var data_page = self.gameserver.avatars.getShopListType(type, page);
                    if (data_page !== null)
                        self.send(data_page);
                    break;
                }

            case Types.CLIENT_OPCODE.buy:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    let is_cash = message[2];
                    let period = message[3];
                    var tmpgender = 0;
                    if (self.player.gender === 'f')
                        tmpgender = 1;
                    var item_data = self.gameserver.avatars.getAvatar2(id, tmpgender);
                    if (item_data) {
                        var _iprecio = 99999999999;
                        var valid_precio = false;
                        var errtrampa = false;
                        var dat = Date.now();
                        if (item_data[6] === "")
                            errtrampa = true;
                        if (item_data[6].min_rank > self.player.rank) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NOT_FOR_SELL, []));
                            return null;
                        }
                        if (period === Types.PERIOD.WEEK) {
                            dat = dat + (7 * 24 * 60 * 60 * 1000);
                            if (is_cash) {
                                _iprecio = item_data[6].cash_week;
                                if (item_data[6].cash_week <= 0)
                                    errtrampa = true;
                            } else {
                                _iprecio = item_data[6].gold_week;
                                if (item_data[6].gold_week <= 0)
                                    errtrampa = true;
                            }
                        } else if (period === Types.PERIOD.MONTH) {
                            dat = dat + (30 * 24 * 60 * 60 * 1000);
                            if (is_cash) {
                                _iprecio = item_data[6].cash_month;
                                if (item_data[6].cash_month <= 0)
                                    errtrampa = true;
                            } else {
                                _iprecio = item_data[6].gold_month;
                                if (item_data[6].gold_month <= 0)
                                    errtrampa = true;
                            }
                        } else if (period === Types.PERIOD.PERM) {
                            dat = 0;
                            if (is_cash) {
                                _iprecio = item_data[6].cash_perm;
                                if (item_data[6].cash_perm <= 0)
                                    errtrampa = true;
                            } else {
                                _iprecio = item_data[6].gold_perm;
                                if (item_data[6].gold_perm <= 0)
                                    errtrampa = true;
                            }
                        }
                        if (is_cash) {
                            if (self.player.cash >= _iprecio)
                                valid_precio = true;
                        } else {
                            if (self.player.gold >= _iprecio)
                                valid_precio = true;
                        }
                        if (valid_precio && !errtrampa) {
                            let data = {
                                UserId: self.user_id,
                                aId: id,
                                type: item_data[2],
                                expire_time: dat,
                                is_cash: is_cash === true ? 1 : 0,
                                is_gift: 0,
                                amount: 0
                            };
                            if (_iprecio <= 0) {

                            } else {
                                self.gameserver.db.buyAvatarForAccount(self.user_id, is_cash, _iprecio, data)
                                    .then(function (data) {
                                        if (data.error_mysql || data.error_querry) {} else {
                                            if(is_cash){
                                                self.player.cash = self.player.cash - _iprecio;
                                            }else{
                                                self.player.gold = self.player.gold - _iprecio;
                                            }
                                            if (self.room) {
                                                self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                            } else {
                                                self.sendMessage(new Message.loginResponse(self));
                                            }
                                            //self.sendMessage(new Message.loginResponse(self));
                                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.PURCHASED, [id]));
                                            self.sendMessage(new Message.alertResponse("Aviso :(","Por favor salga y vuelva a entrar a la tienda para ver sus avatares nuevos \n \n \n - Disculpe las molestias, estamos trabajando-"));
                                        }
                                    })
                                    .catch(function (err) {
                                        Logger.error("" + err.stack);
                                    });
                            }
                        }
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.equip:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var arr_up = message[1];
                    var work = false;
                    for (var idx in arr_up) {
                        if (typeof (arr_up[idx]) !== 'number') {
                            return null;
                        }
                    }

                    if (arr_up.length > 0)
                        work = true;
                    if (self.player.gender === 'm') {
                        self.player.ahead = 1;
                        self.player.abody = 2;
                    } else {
                        self.player.ahead = 3;
                        self.player.abody = 4;
                    }
                    self.player.aeyes = 0;
                    self.player.aflag = 0;
                    self.player.abackground = 0;
                    self.player.aforeground = 0;
                    if (work) {
                        self.gameserver.db.equipAvatar(arr_up, self)
                            .then(function (data) {
                                if (data.error_mysql || data.error_querry) {} else {
                                    self.sendMessage(new Message.loginResponse(self));
                                }
                            });
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.event:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let type = message[1];
                    if (type !== 0 && type !== 3)
                        return null;

                    if ((type === 0 && self.player.event1 === 1)) {
                        return null;
                    } else if ((type === 3 && self.player.event2 === 1)) {
                        return null;
                    }
                    if (type === 0)
                        self.player.event1 = 1;
                    else if (type === 3)
                        self.player.event2 = 1;

                    self.gameserver.db.eventUpdate(self, type)
                    .then(function (data) {
                        if (data.error_mysql || data.error_querry) {

                        } else if (data.complete) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.WON_EVENT2, [data.gold, data.cash]));
                        }
                    });
                    break;
                }

            case Types.CLIENT_OPCODE.change_name:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var fuck = false;
                    var _nname = message[1];
                    if ((_nname.length > 0 && _nname.length <= 25) === false) {
                        return null;
                    }

                    if (ignoreCase.startsWith(_nname, " ")) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                        return null;
                    }

                    if (ignoreCase.endsWith(_nname, " ")) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                        return null;
                    }

                    if (ignoreCase.startsWith(_nname, "GM") || ignoreCase.startsWith(_nname, "Dev")) {
                        fuck = true;
                    }

                    if (!fuck) {
                        for (let i = 0; i < Types.GAME_ID.length; i++) {
                            if (ignoreCase.equals(_nname, Types.GAME_ID[i]))
                                fuck = true;
                        }
                    }
                    if (self.player.gm === 1)
                        fuck = false;
                    if (fuck) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                    } else if (_nname.length < 25) {
                        self.gameserver.db.changeName(_nname, self)
                            .then(function (data) {
                                if (data.change) {
                                    self.player.game_id = _nname;
                                    self.player.cash = self.player.cash -4000;
                                    self.sendMessage(new Message.loginResponse(self));
                                    self.gameserver.sendAccountsOnline();
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_CHAR, []));
                                } else if (data.error_exist) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_ALREADY_EXISTS, []));
                                } else if (data.error_cash) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_NOT_ENOUGH_CASH, []));
                                    self.sendMessage(new Message.alertResponse("Falló", "¡No tienes suficiente Cash para cambiar!"));
                                }
                            });
                    } else {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.NAME_BAD_LEN, []));
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.tab:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let slot = message[1];
                    if (slot === 0) {
                        //channel
                    } else if (slot === 1) {
                        self.sendMessage(new Message.friendsResponse(self));
                    } else if (slot === 2) {
                        self.sendMessage(new Message.guildResponse(self, self.player.guild_members));
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_create:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let gname = message[1];
                    if (self.player.guild !== '') {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ALREADY_IN_GUILD, []));
                    } else if (gname.length > 3 && gname.length <= 20) {
                        gname = mysql.escape(gname).replace("'", "").replace("'", "");
                        if (/\s/g.test(gname) === true) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_NAME_BAD_WORD, []));
                            return null;
                        }
                        if ((self.player.gold >= 500000) === false) {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_NO_MONEY, []));
                            return null;
                        }
                        self.gameserver.db.createGuild(gname, self)
                            .then(function (data) {
                                self.player.gold = self.player.gold - 500000;
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_CREATED, []));
                                self.sendMessage(new Message.loginResponse(self));
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_NAME_BAD_WORD, []));
                                } else if (data.error_exist) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_ALREADY_EXISTS, []));
                                }
                            });
                    } else {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.GUILD_BAD_NAME_LEN, []));
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guildinvite:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    var acc = self.gameserver.getAccountById(id);
                    if (acc) {
                        if (acc.player.guild === '') {
                            acc.sendMessage(new Message.GuildreqResponse(self));
                        }
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_approved:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    if (self.player.guild === '') {
                        self.gameserver.db.joinGuild(self, id)
                            .then(function (data) {
                                if (data.good) {
                                    //self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ALREADY_IN_GUILD, []));
                                    self.sendMessage(new Message.alertResponse("Listo", "¡Te has unido al Guild!"));
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    }
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {} else if (data.error_exist) {}
                            });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_leave:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    //USUARIO DE CLAN
                    if (self.player.guild !== '' && self.player.guild_job === 0) {
                        self.gameserver.db.leaveGuild(self)
                            .then(function (data) {
                                if (data.complete) {
                                    self.player.guild = '';
                                    self.player.guild_job = 0;
                                    self.player.guild_id = 0;
                                    self.sendMessage(new Message.alertResponse("Listo", "¡Ya no perteneces a este Guild!"));
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    } else {
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {}
                            });
                    }
                    //LIDER DEL CLAN
                    if(self.player.guild !== '' && self.player.guild_job === 1){
                        self.gameserver.db.deleteGuild(self.player.guild_id)
                                .then(function(data){
                                    self.player.guild = '';
                                    self.player.guild_job = 0;
                                    self.player.guild_id = 0;
                                    self.sendMessage(new Message.alertResponse("Listo", "¡Ya no perteneces a este Guild!"));
                                    if (self.room) {
                                        self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                    } else {
                                        self.sendMessage(new Message.loginResponse(self));
                                    }
                                })
                                .catch(function (data) {
                                    if (data.error_mysql || data.error_querry) {}
                                });

                        self.gameserver.db.deleteGuildMemberByIdGuild(self.player.guild_id, self.player.user_id)
                            .then(function (data) {
                            if (data.complete) {
                                self.player.guild = '';
                                self.player.guild_job = 0;
                                self.player.guild_id = 0;
                                self.sendMessage(new Message.alertResponse("Listo", "¡Ya no perteneces a este Guild!"));
                                if (self.room) {
                                    self.gameserver.pushToRoom(self.room.id, new Message.roomPlayers(self.room), null);
                                } else {
                                    self.sendMessage(new Message.loginResponse(self));
                                }
                            }
                        })
                        .catch(function (data) {
                            if (data.error_mysql || data.error_querry) {}
                        });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.guild_kick:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let guser_id = parseInt(message[1]);
                    if (self.user_id === guser_id) {
                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.CANT_KICK_YOURSELF, []));
                    } else if (self.player.guild !== '' && self.player.guild_job === 1) {
                        self.gameserver.db.kickGuild(guser_id, self.player.guild_id)
                            .then(function (data) {
                                if (data.complete) {
                                    self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.KICKED_GUILD, []));
                                }
                            })
                            .catch(function (data) {
                                if (data.error_mysql || data.error_querry) {}
                            });
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.channel_rooms:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _strtype = message[1];
                    if (_strtype === "next") {
                        self.player.channel_rango = self.player.channel_rango + 6;
                        if (self.player.channel_rango > 20)
                            self.player.channel_rango = 0;
                        self.gameserver.sendRoomsType(self, self.player.channel_rango, null);
                    } else if (_strtype === "prev") {
                        self.player.channel_rango = self.player.channel_rango - 6;
                        if (self.player.channel_rango < 0)
                            self.player.channel_rango = 0;
                        self.gameserver.sendRoomsType(self, self.player.channel_rango, null);
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.get_room_info:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let room_id = parseInt(message[1]);
                    self.gameserver.getRoomById(room_id, function (room) {
                        if (room) {
                            self.sendMessage(new Message.extraRoomInfo(room));
                        }
                    });
                    break;
                }

            case Types.CLIENT_OPCODE.getinfo:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = parseInt(message[1]);
                    let acc = self.gameserver.getAccountById(id);
                    if (acc) {
                        self.sendMessage(new Message.InfoResponse(acc));
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.channel_join:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.location_type = Types.LOCATION.CHANNEL;
                    if (self.room) {
                        if (self.room.status !== null && self.room.status == Types.ROOM_STATUS.PLAYING) {

                        }
                        self.room.removePlayer(self);
                        self.sendMessage(new Message.loginResponse(self));
                        self.player.is_ready = 0;
                        self.player.is_master = 0;
                    }
                    self.gameserver.sendAccountsOnline();
                    self.gameserver.sendRooms(self);
                    break;
                }

            case Types.CLIENT_OPCODE.room_join:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let id = message[1];
                    let password = message[2];
                    self.gameserver.getRoomById(id, function (room) {
                        if (room) {
                            if (room.player_count < room.max_players && room.status === Types.ROOM_STATUS.WAITING) {
                                if (room.look === 1 && self.player.gm === 0) {
                                    if (room.password !== password){
                                        self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.WRONG_PASSWORD, []));
                                    }else{
                                        room.joinPlayer(self);
                                        self.location_type = Types.LOCATION.ROOM;
                                    }
                                } else {
                                    room.joinPlayer(self);
                                    self.location_type = Types.LOCATION.ROOM;
                                }
                            } else if (room.status === Types.ROOM_STATUS.PLAYING) {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_PLAYING, []));
                            } else {
                                self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_FULL, []));
                            }
                            Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                        } else {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_DOES_NOT_EXIST, []));
                        }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.room_create:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    /*if ((self.player.rank >= 27) === false) {
                        return null;
                    }*/
                    let id = self.gameserver.getIdforRoom();
                    let title = message[1];
                    let password = message[2];
                    let maxplayers = message[3];
                    let gamemode = message[4];
                    self.gameserver.rooms[id] = new Room(id, title, password, maxplayers, gamemode, self.gameserver);
                    self.gameserver.getRoomById(id, function (room) {
                        if (room) {
                            if (room.player_count < room.max_players) {
                                self.player.is_master = 1;
                                room.joinPlayer(self);
                                self.location_type = Types.LOCATION.ROOM;
                                self.gameserver.sendRooms();
                                Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                            }
                        } else {
                            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.ROOM_DOES_NOT_EXIST, []));
                        }
                    });
                    break;
                }
            case Types.CLIENT_OPCODE.room_options:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let gamemode = message[2];
                    if (gamemode=="1") {
                        self.room.game_mode = Types.GAME_MODE.BOSS;
                        self.room.joinOnlyPlayer(self);
                        // self.location_type = Types.LOCATION.ROOM;
                        self.gameserver.sendRooms();
                    }else if(gamemode=="0"){
                        self.room.game_mode = Types.GAME_MODE.NORMAL;
                        self.room.joinOnlyPlayer(self);
                        self.location_type = Types.LOCATION.ROOM;
                        self.gameserver.sendRooms();
                    }else if(gamemode=="2"){
                        self.sendMessage(new Message.alertResponse("No disponible :(", "El modo SAME SAME aún no está disponible."));
                    }else{
                        self.sendMessage(new Message.alertResponse("No disponible :(", "El modo SCORE aún no está disponible."));
                    }
                        //Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    break;
                }
            case Types.CLIENT_OPCODE.room_title:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _title1 = message[1];
                    if (self.room) {
                        self.room.RoomTitle(_title1);
                        self.room.joinOnlyPlayer(self);
                        self.gameserver.sendRooms();
                    } 
                    //Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    break;
                }
            case Types.CLIENT_OPCODE.room_change_ready:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let status = message[1];
                    self.player.is_ready = status === true ? 1 : 0;
                    if (self.room) {
                        self.gameserver.pushToRoom(self.room.id, new Message.changedReady(self));
                        self.room.masterTime(status);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.room_change_team:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    if (self.room) {
                        self.room.changeTeam(self);
                    }
                    break;
                }
            // case Types.CLIENT_OPCODE.select_bot:
                // {
                    // // seguridad
                    // if (!self.login_complete) {
                        // self.connection.close();
                        // return null;
                    // }
                    // Logger.debug("mess: " + message);
                    // if (self.room) {
                        // if (self.room.team_bots_count <= 0) {
                            // let id = self.gameserver.getIdforBot();
                            // var bot_data = {
                                // user_id: id,
                                // reg_id: 0,
                                // game_id: 'Dev',
                                // rank: 27,
                                // gp: 0,
                                // gold: 0,
                                // cash: 0,
                                // gender: "m",
                                // photo_url: "1234",
                                // ahead: 1632,
                                // abody: 1631,
                                // aeyes: 3691,
                                // aflag: 463,
                                // abackground: 418,
                                // aforeground: 450,
                                // is_muted: 0,
                                // guild: 'GM',
                                // guild_id: 0,
                                // guild_job: 0
                            // };
                            // var plx = new Player(bot_data);
                            // plx.is_bot = 1;
                            // plx.is_ready = 1;
                            // plx.position = 1;
                            // let acc = new Bot(plx);
                            // acc.user_id = id;
                            // acc.gameserver = self.gameserver;
                            // self.gameserver.bots[acc.user_id] = acc;
                            // self.room.addBot(acc);
                        // }
                    // }
                    // break;
                // }
				case Types.CLIENT_OPCODE.select_bot:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    Logger.debug("mess: " + message);
                    if (self.room) {
                        if (self.room.team_bots_count <= 0) {
                            let id = self.gameserver.getIdforBot();
                            var bot_data = {
                                user_id: id,
                                reg_id: 0,
                                game_id: 'Goku',
                                rank: 31,
                                gp: 0,
                                gold: 0,
                                cash: 0,
                                gender: "m",
                                photo_url: "1234",
                                ahead: 896,
                                abody: 897,
                                aeyes: 535,
                                aflag: 563,
                                abackground: 547,
                                aforeground: 826,
                                is_muted: 0,
                                guild: '',
                                guild_id: 0,
                                guild_job: 0
                            };
                            var plx = new Player(bot_data);
                            plx.is_bot = 1;
                            plx.is_ready = 1;
                            plx.position = 1;
                            let acc = new Bot(plx);
                            acc.user_id = id;
                            acc.gameserver = self.gameserver;
                            self.gameserver.bots[acc.user_id] = acc;
                            self.room.addBot(acc);
                        }else if(self.room.team_bots_count == 1){
							let id = self.gameserver.getIdforBot();
                            var bot_data = {
                                user_id: id,
                                reg_id: 0,
                                game_id: 'Vegeta',
                                rank: 30,
                                gp: 0,
                                gold: 0,
                                cash: 0,
                                gender: "m",
                                photo_url: "1234",
                                ahead: 822,
                                abody: 823,
                                aeyes: 824,
                                aflag: 825,
                                abackground: 547,
                                aforeground: 826,
                                is_muted: 0,
                                guild: '',
                                guild_id: 0,
                                guild_job: 0
                            };
                            var plx = new Player(bot_data);
                            plx.is_bot = 2;
                            plx.is_ready = 1;
                            plx.position = 3;
                            let acc = new Bot(plx);
                            acc.user_id = id;
                            acc.gameserver = self.gameserver;
                            self.gameserver.bots[acc.user_id] = acc;
                            self.room.addBot(acc);
						}else if(self.room.team_bots_count == 2){
							let id = self.gameserver.getIdforBot();
                            var bot_data = {
                                user_id: id,
                                reg_id: 0,
                                game_id: 'Invisible',
                                rank: 29,
                                gp: 0,
                                gold: 0,
                                cash: 0,
                                gender: "m",
                                photo_url: "1234",
                                ahead: 120,
                                abody: 119,
                                aeyes: 791,
                                aflag: 1126,
                                abackground: 4845,
                                aforeground: 450,
                                is_muted: 0,
                                guild: '',
                                guild_id: 0,
                                guild_job: 0
                            };
                            var plx = new Player(bot_data);
                            plx.is_bot = 3;
                            plx.is_ready = 1;
                            plx.position = 5;
                            let acc = new Bot(plx);
                            acc.user_id = id;
                            acc.gameserver = self.gameserver;
                            self.gameserver.bots[acc.user_id] = acc;
                            self.room.addBot(acc);
						}else if(self.room.team_bots_count == 3){
							let id = self.gameserver.getIdforBot();
                            var bot_data = {
                                user_id: id,
                                reg_id: 0,
                                game_id: 'Ted',
                                rank: 28,
                                gp: 0,
                                gold: 0,
                                cash: 0,
                                gender: "m",
                                photo_url: "1234",
                                ahead: 19,
                                abody: 20,
                                aeyes: 60,
                                aflag: 118,
                                abackground: 987,
                                aforeground: 450,
                                is_muted: 0,
                                guild: '',
                                guild_id: 0,
                                guild_job: 0
                            };
                            var plx = new Player(bot_data);
                            plx.is_bot = 3;
                            plx.is_ready = 1;
                            plx.position = 7;
                            let acc = new Bot(plx);
                            acc.user_id = id;
                            acc.gameserver = self.gameserver;
                            self.gameserver.bots[acc.user_id] = acc;
                            self.room.addBot(acc);
						}
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.mobile:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _mob = message[1];
                    if (self.room) {
                        if (typeof (Types.MOBILES[_mob]) != 'undefined' && Types.MOBILES[_mob] !== null) {
                            if(self.player.gm === 1){
                                if (_mob == Types.MOBILE.RANDOM)
                                _mob = Types.MOBILE.DRAGON;
                                self.player.mobile = _mob;
                                self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(self));
                            }else{
                                if (_mob == Types.MOBILE.RANDOM)
                                _mob = Types.MOBILE.KNIGHT;
                                self.player.mobile = _mob;
                                self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(self));
                            }
                            // if (_mob == Types.MOBILE.RANDOM)
                            //     _mob = Types.MOBILE.DRAGON;
                            // self.player.mobile = _mob;
                            // self.gameserver.pushToRoom(self.room.id, new Message.changedMobile(self));
                        }
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.game_start:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    /*if ((self.player.rank >= 27) === false) {
                        return null;
                    }*/
                    if (self.room) {
                        self.room.gameStart(self);
                        self.gameserver.sendRooms();
                    }
                    Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    break;
                }

            case Types.CLIENT_OPCODE.game_items:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    //items dentro del juego (0 = dual ; 1 =teleport; 2 = dual++)
                    let item_data = [Types.SERVER_OPCODE.items, [
                        [0, -1, 2, -1, 1, -1], -1
                    ]];
                    self.send(item_data);
                    break;
                }

            case Types.CLIENT_OPCODE.game_move:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    var _x = message[1];
                    var _y = message[2];
                    var _body = message[3];
                    var _look = message[4];
                    var _ang = message[5];
                    var _time = message[6];
                    if (self.room) {
                        self.player.x = _x;
                        self.player.y = _y;
                        self.player.body = _body;
                        self.player.look = _look;
                        self.player.ang = _ang;
                        self.player.move();
                        self.gameserver.pushToRoom(self.room.id, new Message.gameUpdate(self));
                        //Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.game_pass_turn:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let x = message[1];
                    let y = message[2];
                    let body = message[3];
                    let look = message[4];
                    let ang = message[5];
                    let _time1 = message[6];
                    if (self.room) {
                        self.player.x = x;
                        self.player.y = y;
                        self.body = body;
                        self.player.look = look;
                        self.player.ang = ang;
                        self.room.game.gamePass(self);
                    }
                    break;
                }
            case Types.CLIENT_OPCODE.game_shoot:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let x = message[1];
                    let y = message[2];
                    let body = message[3];
                    let look = message[4];
                    let ang = message[5];
                    let power = message[6];
                    let time = message[7];
                    let type = message[8];
                    if (self.room) {
                        self.player.x = x;
                        self.player.y = y;
                        self.player.body = body;
                        self.player.look = look;
                        self.player.move();
                        self.room.game.gameShoot(x, y, body, look, ang, power, time, type, self);
                        //Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    }
                    break;
                }

            case Types.CLIENT_OPCODE.game_use_item:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    let game_use_item = message[1];
                    if (game_use_item=="0") {
                        self.sendMessage(new Message.alertResponse("No disponible :(", "DUAL aún no está disponible."));
                        //items dentro del juego (0 = dual ; 1 =teleport; 2 = dual++)
                        let item_data = [Types.SERVER_OPCODE.items, [
                            [-1, -1, 2, -1, 1, -1], -1
                        ]];
                        self.send(item_data);
                    }else if(game_use_item=="2"){
                        self.sendMessage(new Message.alertResponse("No disponible :(", "DUAL+ aún no está disponible."));
                    }else{
                        self.sendMessage(new Message.alertResponse("No disponible :(", "TELEPORT aún no está disponible."));
                    }
                    Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                     break;
                }

            case Types.CLIENT_OPCODE.addfriend:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.sendMessage(new Message.alertResponse("No disponible :(", "Estamos trabando en esto"));
                    break;
                }

                case Types.CLIENT_OPCODE.quick_join:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.sendMessage(new Message.alertResponse("No disponible :(", "Estamos trabando en esto"));
                    break;
                }

                case Types.CLIENT_OPCODE.delete_avatar:
                {
                    // seguridad
                    if (!self.login_complete) {
                        self.connection.close();
                        return null;
                    }
                    self.sendMessage(new Message.alertResponse("No disponible :(", "Estamos trabando en esto"));
                    break;
                }
            
            default:
                {
                    Logger.info('Opcode: ' + Types.getMessageTypeAsString(opcode) + ' data: ' + message);
                    break;
                }
        }
    }


    Chat(msj, ch) {
        var self = this;

        var maxlng = 60;
        if (self.player.gm === 1)
            maxlng = 120;

        if (msj.length < 1)
            return null;

        if (msj.length > maxlng)
            return null;

        if (this.is_muted === true || this.is_muted === 1) {
            self.sendMessage(new Message.alert2Response(Types.ALERT2_TYPES.MUTED, []));
            return null;
        }
        var date = Date.now();
        var cans = false;
        if (this.last_message < date) {
            cans = true;
            this.last_message = date + 1000;
        } else {
            this.strik += 1;
            if (this.strik > 10) {
                this.is_muted = true;
            }
        }

        if (cans === true && this.player.is_muted !== true && this.player.is_muted != 1 || self.player.gm === 1) {
            var type = Types.CHAT_TYPE.NORMAL; //Types.CHAT_TYPE.GM;
            var save = true;
            var show = true;

            if (self.player.gm === 1)
                type = Types.CHAT_TYPE.GM;

            if (show) {
                if (ch === true) {
                    if (save === true)
                        self.gameserver.chathistory.push([msj, this.player.game_id, type, this.player.guild]);
                    self.gameserver.pushBroadcastChannel(new Message.chatResponse(self, msj, type));
                } else
                    self.gameserver.pushBroadcastChat(new Message.chatResponse(self, msj, type), self.room);
            }
        }
    }

    saveWinDB() {
        var self = this;
        self.gameserver.db.updateUser(self)
            .then(function (data) {
                if (data.error_mysql || data.error_querry) {} else {
                    self.player.win_gold = 0;
                    self.player.win_gp = 0;
                    self.player.is_win = 0;
                    self.player.is_loss = 0;
                    self.player.is_ready = 0;
                }
            });
    }

    send(data) {
        this.connection.send(data);
    }

    sendMessage(message) {
        message = message.serialize();
        this.connection.send(message);
    }

    onExit(callback) {
        this.exit_callback = callback;
    }

    update() {
        var self = this;
        if (self.room) {
            var map = self.room.game.map;
            if (self.player.x > map.w || self.player.y > map.h) {
                self.player.is_alive = 0;
            }
            var yf = map.GetUnder(self.player.x, self.player.y);
            if (yf === 0)
                self.player.is_alive = 0;
            else
                self.player.y = yf;

            self.player.move();
        }
    }
};