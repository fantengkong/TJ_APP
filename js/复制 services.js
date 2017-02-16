'use strict';
angular.module('starter.services', [])

.factory("userService", function($http) {
	var users = [];
	return {
		getUsers: function(url,param) {
			return $http.post(url,param).then(function(response) {
				users = response.data;
				return response.data;
			});
		},
		getUser: function(index) {
			return users[index];
		}
	};
})
.factory('localStorageService', [function() {
		return {
			get: function localStorageServiceGet(key, defaultValue) {
				var stored = localStorage.getItem(key);
				try {
					stored = angular.fromJson(stored);
				} catch(error) {
					stored = '';
				}
				if(defaultValue && stored === null) {
					stored = defaultValue;
				}
				return stored;
			},
			update: function localStorageServiceUpdate(key, value) {
				if(value) {
					localStorage.setItem(key, angular.toJson(value));
				}else if(value==''){
					localStorage.setItem(key, '');
				}
			},
			clear: function localStorageServiceClear(key) {
				localStorage.removeItem(key);
			}
		};
	}])
.factory('dateService', [function() {
	return {
		handleMessageDate: function(messages) {
			var i = 0,
				length = 0,
				messageDate = {},
				nowDate = {},
				weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
				diffWeekValue = 0;
			if(messages) {
				nowDate = this.getNowDate();
				length = messages.length;
				for(i = 0; i < length; i++) {
					messageDate = this.getMessageDate(messages[i]);
					if(!messageDate) {
						return null;
					}
					if(nowDate.year - messageDate.year > 0) {
						messages[i].lastMessage.time = messageDate.year + "";
						continue;
					}
					if(nowDate.month - messageDate.month >= 0 ||
						nowDate.day - messageDate.day > nowDate.week) {
						messages[i].lastMessage.time = messageDate.month +
							"月" + messageDate.day + "日";
						continue;
					}
					if(nowDate.day - messageDate.day <= nowDate.week &&
						nowDate.day - messageDate.day > 1) {
						diffWeekValue = nowDate.week - (nowDate.day - messageDate.day);
						messages[i].lastMessage.time = weekArray[diffWeekValue];
						continue;
					}
					if(nowDate.day - messageDate.day === 1) {
						messages[i].lastMessage.time = "昨天";
						continue;
					}
					if(nowDate.day - messageDate.day === 0) {
						messages[i].lastMessage.time = messageDate.hour + ":" + messageDate.minute;
						continue;
					}
				}
				// console.log(messages);
				return messages;
			} else {
				console.log("messages is null");
				return null;
			}

		},
		getNowDate: function() {
			var nowDate = {};
			var date = new Date();
			nowDate.year = date.getFullYear();
			nowDate.month = date.getMonth();
			nowDate.day = date.getDate();
			nowDate.week = date.getDay();
			nowDate.hour = date.getHours();
			nowDate.minute = date.getMinutes();
			nowDate.second = date.getSeconds();
			return nowDate;
		},
		getMessageDate: function(message) {
			var messageDate = {};
			var messageTime = "";
			//2015-10-12 15:34:55
			var reg = /(^\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})/g;
			var result = new Array();
			if(message) {
//				messageTime = message.lastMessage.originalTime;
				result = reg.exec(message);
				if(!result) {
					console.log("result is null");
					return null;
				}
				messageDate.year = parseInt(result[1]);
				messageDate.month = parseInt(result[2]);
				messageDate.day = parseInt(result[3]);
				messageDate.hour = parseInt(result[4]);
				messageDate.minute = parseInt(result[5]);
				messageDate.second = parseInt(result[6]);
				// console.log(messageDate);
				return messageDate;
			} else {
				console.log("message is null");
				return null;
			}
		}
	};
}])
.factory('messageService', ['localStorageService', 'dateService',
		function(localStorageService, dateService) {
			return {
				init: function(messages) {
					var i = 0;
					var length = 0;
					var messageID = new Array();
					var date = null;
					var messageDate = null;
					if(messages) {
						length = messages.length;
						for(; i < length; i++) {
							messageDate = dateService.getMessageDate(messages[i]);
							if(!messageDate) {
								return null;
							}
							date = new Date(messageDate.year, messageDate.month,
								messageDate.day, messageDate.hour, messageDate.minute,
								messageDate.second);
							messages[i].lastMessage.timeFrome1970 = date.getTime();
							messageID[i] = {
								id: messages[i].id
							};

						}
						localStorageService.update("messageID", messageID);
						for(i = 0; i < length; i++) {
							localStorageService.update("message_" + messages[i].id, messages[i]);
						}
					}
				},
				getAllMessages: function() {
					var messages = new Array();
					var i = 0;
					var messageID = localStorageService.get("messageID");
					var length = 0;
					var message = null;
					if(messageID) {
						length = messageID.length;

						for(; i < length; i++) {
							message = localStorageService.get("message_" + messageID[i].id);
							if(message) {
								messages.push(message);
							}
						}
						dateService.handleMessageDate(messages);
						return messages;
					}
					return null;

				},
				getMessageById: function(id) {
					return localStorageService.get("message_" + id);
				},
				getAmountMessageById: function(num, id) {
					var messages = [];
					var message = localStorageService.get("message_" + id).message;
					var length = 0;
					if(num < 0 || !message) return;
					length = message.length;
					if(num < length) {
						messages = message.splice(length - num, length);
						return messages;
					} else {
						return message;
					}
				},
				updateMessage: function(message) {
					var id = 0;
					if(message) {
						id = message.id;
						localStorageService.update("message_" + id, message);
					}
				},
				deleteMessageId: function(id) {
					var messageId = localStorageService.get("messageID");
					var length = 0;
					var i = 0;
					if(!messageId) {
						return null;
					}
					length = messageId.length;
					for(; i < length; i++) {
						if(messageId[i].id === id) {
							messageId.splice(i, 1);
							break;
						}
					}
					localStorageService.update("messageID", messageId);
				},
				clearMessage: function(message) {
					var id = 0;
					if(message) {
						id = message.id;
						localStorageService.clear("message_" + id);
					}
				}
			};
		}
	])
.factory('Main', ['$http', '$localStorage', function($http, $localStorage) {
	var baseUrl = "your_service_url";

	function changeUser(user) {
		angular.extend(currentUser, user);
	}

	function urlBase64Decode(str) {
		var output = str.replace('-', '+').replace('_', '/');
		switch(output.length % 4) {
			case 0:
				break;
			case 2:
				output += '==';
				break;
			case 3:
				output += '=';
				break;
			default:
				throw 'Illegal base64url string!';
		}
		return window.atob(output);
	}

	function getUserFromToken() {
		var token = $localStorage.token;
		var user = {};
		if(typeof token !== 'undefined') {
			var encoded = token.split('.')[1];
			user = JSON.parse(urlBase64Decode(encoded));
		}
		return user;
	}
	var currentUser = getUserFromToken();
	return {
		save: function(data, success, error) {
			$http.post(baseUrl + '/signin', data).success(success).error(error)
		},
		signin: function(data, success, error) {
			$http.post(baseUrl + '/authenticate', data).success(success).error(error)
		},
		me: function(success, error) {
			$http.get(baseUrl + '/me').success(success).error(error)
		},
		logout: function(success) {
			changeUser({});
			delete $localStorage.token;
			success();
		}
	};
}])
.factory("addinfo", function($http) {
	return {
		addInfo: function(objs){
			angular.forEach(objs, function(data,index,array){
				if(array[index].numType==0){
					if(array[index].cate_id == 4){
						array[index].info="课程";
					}else	if(array[index].cate_id == 6||array[index].cate_id == 5){
						array[index].info="大会";
					}else if(array[index].cate_id == 7||array[index].cate_id == 8){
						array[index].info="访谈";
					}
				}else if(array[index].numType==1){
					array[index].info="直播预告";
				}else if(array[index].numType==2){
					array[index].info="直播回放";
				}else if(array[index].numType==3){
					array[index].info="直播中";
				}else if(array[index].numType==4){
					array[index].info="直播结束";
				}
			});				
			return objs;
		},
		GetQueryString:function(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
		},
		formatSeconds:function( second_time ){  
//			var time = parseInt(second_time) + "秒";  
//			if( parseInt(second_time )> 60){  
//			    var second = parseInt(second_time) % 60;  
//			    var min = parseInt(second_time / 60);  
//			    time = min + "分" + second + "秒";  
//			    if( min > 60 ){  
//			        min = parseInt(second_time / 60) % 60;  
//			        var hour = parseInt( parseInt(second_time / 60) /60 );  
//			        time = hour + "小时" + min + "分" + second + "秒";  
//			        if( hour > 24 ){  
//			            hour = parseInt( parseInt(second_time / 60) /60 ) % 24;  
//			            var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );  
//			            time = day + "天" + hour + "小时" + min + "分" + second + "秒";  
//			        }  
//			    }  
//			}  
//			return time;          
				
			var time = parseInt(second_time) + "秒";  
			if( parseInt(second_time )> 60){  
			    var second = parseInt(second_time) % 60;  
			    var min = parseInt(second_time / 60);  
			    time = min + "分" + second + "秒";  
			    if( min > 60 ){  
			        min = parseInt(second_time / 60) % 60;  
			        var hour = parseInt( parseInt(second_time / 60) /60 );  
			        time = hour + "小时" + min + "分" + second + "秒";  
			        if( hour > 24 ){  
			            hour = parseInt( parseInt(second_time / 60) /60 ) % 24;  
			            var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );  
			            time = day + "天" + hour + "小时" + min + "分" + second + "秒";  
			        }  
			    }  
			}  
			return {second:second,min:min,hour:hour,day:day};				
				
		},
		isEmptyValue:function(value) {
      var type;
      if(value == null) { // 等同于 value === undefined || value === null
          return true;
      }
      type = Object.prototype.toString.call(value).slice(8, -1);
      switch(type) {
      case 'String':
          return !$.trim(value);
      case 'Array':
          return !value.length;
      case 'Object':
          return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
      default:
          return false; // 其他对象均视作非空
      }
   	},
   	setTitle : function(t) {
      document.title = t;
      var i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = function() {
        setTimeout(function(){
          i.remove();
        }, 9)
      }
      document.body.appendChild(i);
    }
	};
})
.factory('Chats', function() {
	var chats = [{
    id: 4,
    value:'遗传咨询学'
  }, {
    id: 5,
    value:'生物技术'
  }, {
    id: 6,
    value:'生物信息技术'
  }, {
    id: 7,
    value:'基因组学'
  }, {
    id: 8,
    value:'分子生物学'
  }, {
    id: 3,
    value:'细胞生物学'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});