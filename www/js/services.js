angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
/*
angular.module('starter.services', [])

.factory('Details', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data

	var details = [{
			id: 0,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "hide",
			num: "500人在学",
			info: "直播中"
		}, {
			id: 1,
			imgUrl: "../img/List_Act_2.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "",
			designation: "肿瘤/白血病/血液科",
			icon: "",
			num: "331",
			info: "直播预告"
		}, {
			id: 2,
			imgUrl: "../img/List_Act_3.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "直播结束"
		}, {
			id: 3,
			imgUrl: "../img/video_fengmian.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "直播回放"
		}, {
			id: 4,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "课程"
		}, {
			id: 5,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "课程"
		}, {
			id: 6,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "课程"
		}, {
			id: 7,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "课程"
		}, {
			id: 8,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "课程"
		}, {
			id: 9,
			imgUrl: "../img/List_Act_1.jpg",
			title: "NEJM：新算法可降低NIPT的假阳性",
			name: "谭维仁",
			designation: "教授",
			icon: "",
			num: "331",
			info: "课程"
		}

	];

	return {
		all: function() {
			return details;
		},
		remove: function(detail) {
			details.splice(details.indexOf(chat), 1);
		},
		get: function(detailId) {
			for(var i = 0; i < details.length; i++) {
				if(details[i].id === parseInt(detailId)) {
					return details[i];
				}
			}
			return null;
		}
	};
}); 
 * */
