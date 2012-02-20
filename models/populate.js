
var mongoose = require('mongoose'),
		Hill = mongoose.model('Hill'),
		Comment = mongoose.model('Comment');

module.exports = function(){
	
	var stations = [
		{
			name: "Isola",
			mark: 3.4,
			snowType: "Powder",
			comments: [
				{
					title: "Trop d'la bombe !",
					mark: 4.1,
					content: "La neige est géniale, c'est du surkiff au top la forme !",
					userID : "1",
					date: new Date()
				},
				{
					mark: 2.7,
					title: "Pas mal",
					content: "J'ai connu mieux en 1995, mais c'était chouette quand même.",
					userID : "3",
					date: new Date()
				}],
			runs: {
				green: {
					open: 4,
					total: 5
				},
				blue: {
					open: 6,
					total: 8
				},
				red: {
					open: 7,
					total: 10
				},
				black: {
					open: 2,
					total: 3
				}
			},
			snowCover: { // meter
			  top: 1.2,
			  bottom: 0.4
			},
			lifts: {
		    open: 15,
		    total: 20
			},
			lastUpdate: new Date()
		},
		{
			name: "Auron",
			mark: 3.8,
			snowType: "Powder",
			comments: [
				{
					title: "On s'est bien éclatés !",
					mark: 4.1,
					content: "J'y suis allé avec mon chien et ma tante, vous savez ils sont très gentils et on s'amuse bien lorsque l'on est tous ensemble, mais bon il faut avouer que par moments c'est pas si cool parce que ma tante elle est un peu nerveuse quand elle est en altitude, et ça lui fait manger beaucoup de kiwi avec de l'huile. Mais à part ça, les restos de la stations sont super bons !",
					userID : "2",
					date: new Date()
				},
				{
					mark: 3.5,
					title: "Pas mal du tout...",
					content: "C'était mieux qu'Isola.",
					userID : "3",
					date: new Date()
				}],
			runs: {
				green: {
					open: 5,
					total: 5
				},
				blue: {
					open: 6,
					total: 8
				},
				red: {
					open: 7,
					total: 12
				},
				black: {
					open: 1,
					total: 1
				}
			},
			snowCover: { // meter
			  top: 3.0,
			  bottom: 1.2
			},
			lifts: {
		    open: 17,
		    total: 25
			},
			lastUpdate: new Date()
		}
	
	];
	
	stations.each(function(item) {
		var hill = new Hill();
		hill.name = item.name;
		hill.mark = item.mark;
		hill.snowType = item.snowType;
		hill.runs = item.runs;
		hill.snowCover = item.snowCover;
		hill.lifts = item.lifts
		item.comments.each(function (com) {
			var comment = new Comment();
			comment.title = com.title;
			comment.content = com.content;
			comment.mark = com.mark;
			comment.userID = com.userID;
			comment.date = com.date;
			
			hill.comments.push(comment);
		});
		hill.lastUpdate = item.lastUpdate;
		hill.save();
	});
} 