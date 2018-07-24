const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = new https.createServer({
	cert: fs.readFileSync('/etc/letsencrypt/live/djemuel.com/fullchain.pem'),
	key: fs.readFileSync('/etc/letsencrypt/live/djemuel.com/privkey.pem')
});
const wss = new WebSocket.Server({ server });

//const wss = new WebSocket.Server({ port: 8080 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

var gbit=[];
var g=new Object();
var room=[];
var que=[];
var user={};

var __userfunc=function(bet,credit){
	this.credit=credit;
	this.bet=bet;
	var target = this;
	return { 
		set:function(a){
			target[a.i]=a.value;
		}
	};
};

var rooms={users:new Object(), room:new Object()};



///TIMER
var Timer = require('easytimer.js');
var timer = new Timer();

wss.on('connection', function connection(ws) {	
	if (ws.protocol === '') { ws.close(); return false; } //e close	
	ws.bit=[];

	timer.addEventListener('secondsUpdated', function (e) {          
		console.log('timer', timer.getTimeValues().toString());
    });  

Array.prototype.findremove=function(a,b){
	for (n in this) {
		if (this[n].id.toString() ===a && this[n].player===ws.protocol) {
			this[n].num.scut(b);
			return true;
		}
	}	
};
Array.prototype.scut=function(a){
	for (x in this) {
		if (a === this[x]) {
			this.splice(x,1);
			return true;
		}        
	}
};
Array.prototype.getid=function(a){
		for (x in this) {
			if (a === this[x].id) {
				return this[x];
			}
		}
		return false;
};
Array.prototype.getida=function(a,b){
		for (x in this) {
			if (a === this[x].id.toString() && b === this[x].player) {
				return this[x];
			}
		}
};
Array.prototype.getidb=function(a){
		for (x in this) {
			if (a === this[x].id) {
				return x;
			}
		}
		return false;
};
Array.prototype.fnum=function(a){
		for (x in this) {
			if (a === this[x]) {
				return true;
			}
		}
		return false;
};
Array.prototype.getidc=function(a){
		var tmp=[];
		for (x in this) {
			if (a === this[x].player) {
				tmp.push(this[x]);
			}
		}
		return tmp;
};
Array.prototype.getidd=function(a){
		var tmp=[];
		for (x in this) {
			if (a === this[x].id) {
				return tmp.push(this[x]);
			}
		}
		return false;
};
Date.prototype.addMinutes = function(m) { 
	return this.setTime(this.getTime() + (m*60*1000));
};


rooms.users[ws.protocol]={};
var tmp = rooms.users[ws.protocol];

rooms.id=[];
(function(obj){
	
	obj.getroom=function(a){
		return gbit.getidd(a);
	};
	obj.setstatus=function(a) {
			if (obj[a.id]) {
				obj[a.id].status=a.value;
				obj[a.id].time=timer.getTimeValues();
			} else {
				obj[a.id]={status:a.value, time: timer.getTimeValues()};
			}
	};
	obj.getstatus=function(a) {
		if (obj[a]) {
			obj[a].time=timer.getTimeValues();
			return obj[a];
		}		
	};
	obj.initroom=function(a){
		if (obj[a]) {
			return obj.getstatus(a);
		} else {				
			return obj[a]={status:0, time: timer.getTimeValues()};
		}			
	};
	obj.setwin=function(a) {
		if (obj[a.id]) {
			obj[a.id].status=2;
			obj[a.id].first=a.first;
			obj[a.id].second=a.second;
			obj[a.id].third=a.third;
			obj[a.id].forth=a.forth;
		} else {
			obj[a.id]={status:2, first:a.first, second:a.second, third:a.third, forth:a.forth };
		}		
	};
})(rooms.room);

(function(obj){	
	obj.getmybet=function(){ 
		console.log('kinsa ka', ws.protocol);
		return gbit.getidc(ws.protocol); 
	};

	obj.credit=2000;
	obj.name=ws.protocol;
	obj.id=gbit;
	obj.room=rooms.room;
	rooms.id=gbit;
	ws.user={};
	ws.user=rooms.users[ws.protocol];	
})(rooms.users[ws.protocol]);


(function(g){
	g.getdate=function(){
		return new Date().toString().split(" GMT+0000 (UTC)")[0];
	};
	g.str=function(a) {
		return JSON.stringify(a);
	};
	g.sendall=function(a){
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
					client.send(g.str(a));
			}
		});
	};
	g.getusers=function(){
		var u=[];
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				if (u.length) {
					if (!u.fnum(client.protocol)) { u.push(client.protocol); }
				} else {
					u.push(client.protocol);
				}				
			}
		});
		return JSON.stringify({getuser:u});
	};
	g.extract=function(home,away){
        home=home.split(",");
        away=away.split(",");
        if (!home.length) { throw new Error('Whoops! Invalid'); }
        var count = 0;
        var countx = [];
        var inversecnt = [];
        for (var y=0;y<10;y++) {
            for (var z=0;z<10;z++) {
                var tmp=y*10;
                var c=tmp+z;
                countx.push({cnt:c, x:away[y],y:home[z]});
                var strcnt=home[z].concat(away[y]);
                inversecnt.push(strcnt);
                count++;
            }
        }     
		return inversecnt;
	};
	g.settimer=function(a) {
		var cdd = new Date().addMinutes(2);
		var x = setInterval(function() {
			var now = new Date().getTime();
			var dd = cdd - now;
			var days = Math.floor(dd / (1000 * 60 * 60 * 24));
			var hours = Math.floor((dd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((dd % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((dd % (1000 * 60)) / 1000);

			var result=hours + ":" + minutes + ":" + seconds;
			ws.send(str({action:'timelapse',result: result }));

			if (dd < 0) {
				clearInterval(x);
			}
		},1000);		
	};
	g.startgame=function(a) {

	};
	g.play=function(id){
			
	};
})(g);

	ws.send(str({action:'init',date: g.getdate(), id:ws.id }));

	function sendto(to,msg) {
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				if (client.protocol === to) {
					client.send(JSON.stringify({from:ws.protocol,msg:msg, date: g.getdate() }));
				}			
			}
		});
	}

	function getusers() {
		var u=[];
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				u.push(client.protocol);
			}
		});
		return JSON.stringify({getuser:u});
	}
	function str(a) {
		return JSON.stringify(a);
	}

	ws.on('message', function incoming(data) {
		try { var d=JSON.parse(data); } catch(e) { return false; }	 //check if error
		switch (d.action) {
			case 'msg':
				sendto(d.to, d.msg);
/*
				wss.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						if (client.protocol === d.to) { client.send(data); }			
					}
				});
*/
				break;
			case 'getuser':
				ws.send(g.getusers());
				break;
			case 'bit':
				que.push({player:ws.protocol,id:d.id,num:d.num});
				
					if (que.length) {			
						if (que.length > 1) {
							for (tcheck in que) {		
									if (que[0].num === que[tcheck].num) { 
										que.pop(); 
									}
									console.log('nahibilin',que);								
							}
						}
						for (var xx=0;xx<que.length;xx++) {		
							var tque = que[xx];
							var found=0;
							if (gbit.length) {
								for (var x=0;x<gbit.length;x++) {
									if (gbit[x].id===tque.id && gbit[x].player===tque.player) {
										found=1;							
										break;
									}
								}
								if (found) { 
									if (gbit[x].num.fnum(tque.num)) {} else {
										gbit[x].num.push(tque.num); 
										ws.user.credit = ws.user.credit - 100;
									}									
								} else {
									if (tque.player) { gbit.push({player:tque.player,id:tque.id,num:[tque.num]}); ws.user.credit = ws.user.credit - 100; }
								}					
							} else {								
								gbit.push({player:tque.player,id:tque.id,num:[tque.num]});	
								ws.user.credit = ws.user.credit - 100;																							
							}							
							if (tque.player) { wss.broadcast(str({bit:{player:tque.player,id:tque.id,num:tque.num}})); 
								var tmp=ws.user.room.getstatus(d.id);
								ws.send(str({roomstatus:tmp,user:ws.user}));
							}
						}												
					}
					que=[];
				break;
			case 'rbit':
				try {
					gbit.findremove(d.id.toString(), d.num);
					ws.user.credit = ws.user.credit + 100;
					wss.broadcast(str({rbit:{player:ws.protocol,id:d.id.toString(),num:d.num}}));
				} catch(e) {}
				break;
			case 'mybit':
				for (var x=0;x<gbit.length;x++) {
					if (gbit[x].player===ws.protocol) {
						ws.send(str({mybit:gbit[x]}));
					}
				}				
				break;
			case 'getbit':			
					console.log('getbit',d.id);
					for (var x=0;x<gbit.length;x++) {					
						if (gbit[x].id===d.id) {
							ws.send(str({getbit:gbit[x]}));
							console.log('getbit loop:',str({getbit:gbit[x]}));
							//break;
						}
					}				
				break;			
			case 'first':				
				wss.broadcast(str({first:{id:d.id,home:d.home,away:d.away}}));
				if (room.length) {
					var index=room.getidb(d.id);
					if (room[index].first) { room[index].first=[d.home,d.away].join(); } else { room.push({id:d.id, first: [d.home,d.away].join() }); }				
				} else {
					room.push({id:d.id, first: [d.home,d.away].join() });
				}
				console.log(room);
				break;
			case 'second':
				wss.broadcast(str({second:{id:d.id,home:d.home,away:d.away}}));
				if (room.length) {
					var index=room.getidb(d.id);
					room[index].second=[d.home,d.away].join();
				} else {
					room.push({id:d.id, second: [d.home,d.away].join() });
				}
				console.log(room);
				break;
			case 'third':
				wss.broadcast(str({third:{id:d.id,home:d.home,away:d.away}}));
				if (room.length) {
					var index=room.getidb(d.id);
					room[index].third=[d.home,d.away].join();
				} else {
					room.push({id:d.id, third: [d.home,d.away].join() });
				}
				console.log(room);
				break;
			case 'forth':
				wss.broadcast(str({forth:{id:d.id,home:d.home,away:d.away}}));
				if (room.length) {
					var index=room.getidb(d.id);
					room[index].forth=[d.home,d.away].join();
				} else {
					room.push({id:d.id, forth: [d.home,d.away].join() });
				}
				console.log(room);
				break;
			case 'onroom':
				var tmpx=ws.user.room.initroom(d.id);
//				var tmp=ws.user.room.getstatus(d.id);
				ws.send(str({roomstatus:tmpx,user:ws.user}));
				break;
			case 'getroom':
				ws.send(str({room:room.getid(d.id)}));
				break;
			case 'setque':
				que.push({id:d.id});
				break;
			case 'getque':
				wss.broadcast(str({que:que}));
				break;
			case 'settime':
				//if (d.num) g.settimer(d.num);			
				break;
			case 'initroom':
				break;
			case 'play':
				if (d.id) {
					var tmp=ws.user.room.getroom(d.id);
					ws.user.room.setstatus({id:d.id,value:1});								
					wss.broadcast(str({roomstatus:ws.user.room.getstatus(d.id),id:d.id}));
					timer.start();
				}
				break;
			case 'setwin':
				if (d.id) {					
					ws.user.room.setwin(d);
					//var tmpx=ws.user.room.initroom(d.id);
					wss.broadcast(str({roomstatus:ws.user.room.getstatus(d.id),win:d,id:d.id,user:ws.user}));
					
					timer.stop();
				}
				break;
		}
	});
	

});
server.listen(8080);