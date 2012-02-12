exports.auron = {
	name: "Auron",
  // users feedback
	mark: 3.2,
	snowType: "rocky",
	comments: [
	  {
	   mark: 2.0,
	   date: "2012-02-12T19:02",
	   content: "Do not believe them, that's wrong :O.",
	   userID: 1
	  },
	  {
	   mark: 4.5,
	   date: "2012-02-12T11:58",
	   content: "Nice snow !",
	   userID: 2
	  },
	  {
	   mark: 3,
	   date: "2012-02-12T09:00",
	   content: "",
	   userID: -1 // Anonymous
	  }
	],
	
	// hill info
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
	lastUpdate: "2012-02-12T19:01"
}

exports.isola = {
  name: "Isola",
	snowType: "powder",
	comments: [
	  {
	   mark: 4.0,
	   date: "2012-02-09T22:22",
	   content: "Good.",
	   userID: -1
	  }
	],
	mark: 4,
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
	lastUpdate: "2012-02-10T12:00"
}