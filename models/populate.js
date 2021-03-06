/*
 * This file is just here to populate the mongo database for a clean presentation purpose.
 *@author	Jeremy Gabriele
*/


var mongoose = require('mongoose'),
		Hill = mongoose.model('Hill'),
		Comment = mongoose.model('Comment'),
		User = mongoose.model('User');

module.exports = function(){
	
	var stations = [
	// Isola
		{
			name: "Isola 2000",
			comments: [
				{
					mark: 3.5,
					content: "La neige est géniale, c'est du surkiff au top la forme !",
					author: "Brian O'marley",
					tags: ['poudreuse']
				},
				{
					mark: 2.5,
					content: "J'ai connu mieux en 1995, mais c'était chouette quand même.",
					author: "Matti Tookoor",
					tags: ['rocailleuse', 'artificielle']
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
		// Auron
		{
			name: "Auron",
			comments: [
				{
					mark: 4.0,
					content: "J'y suis allé avec mon chien et ma tante, vous savez ils sont très gentils et on s'amuse bien lorsque l'on est tous ensemble, mais bon il faut avouer que par moments c'est pas si cool parce que ma tante elle est un peu nerveuse quand elle est en altitude, et ça lui fait manger beaucoup de kiwi avec de l'huile. Mais à part ça, les restos de la stations sont super bons !",
					author: "Benoît",
					tags: ['rocailleuse', 'poudreuse', 'artificielle', 'dure', 'soupe']
				},
				{
					mark: 3.5,
					content: "C'était mieux qu'Isola.",
					author: "Jérémy Tookoor",
					tags: ['rocailleuse', 'dure']
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
		},
		//Valberg
		{
			name: "Valberg",
			comments: [
				{
					mark: 0.5,
					content: "C'est vraiment une station de ski ?",
					author: "Maddi Shnaïda",
					tags: ['rocailleuse', 'artificielle']
				}],
			runs: {
				green: {
					open: 2,
					total: 2
				},
				blue: {
					open: 3,
					total: 4
				},
				red: {
					open: 2,
					total: 7
				},
				black: {
					open: 1,
					total: 1
				}
			},
			snowCover: { // meter
			  top: 0.5,
			  bottom: 0.1
			},
			lifts: {
		    open: 15,
		    total: 20
			},
			lastUpdate: new Date()
		},
	
	];
	
	stations.each(function(stationData) {
		
		var hill = new Hill();
		
		Object.each(stationData, function(value, key) {
			hill[key] = stationData[key];
		});
		
		hill.lastUpdate = stationData.lastUpdate;
		
		hill.save(function(err){
			if (err) console.log(err);
		});
	});
	
	var userValues = {
		firstName: "Admin",
		lastName: "de JSnow",
		skimaster: 'on',
		email: "admin@jsnow.fr",
		hash: "$2a$10$GXn7u9CREenhl/uzTKx0q.U6ENcm.aQH8gPxu0070pz1PYOi0/FXe",
		salt: "$2a$10$GXn7u9CREenhl/uzTKx0q."
	}
	
	var user = new User();
	Object.each(userValues, function(val, key) {
		user[key] = val;
	});
	
	user.save(function(err) {
		if (err) throw err;
	});
} 