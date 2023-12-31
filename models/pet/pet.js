const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	animal: {
		type: String,
		enum: ["Dog", "Cat", "Other"],
		required: true,
	},
	breed: String,
	age: {
		value: {
			type: Number,
			required: true,
		},
		unit: {
			type: String,
			enum: ["weeks", "months", "years"],
			required: true,
		},
	},
	description: String,
	gender: {
		type: String,
		enum: ["Male", "Female"],
	},
	zipCode: {
		type: String,
	},
	location: {
		lat: { type: Number, },
		lng: { type: Number, },
		address: { type: String, },
	},
	photoUrl: {
		type: String,
	},
	organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
	{
		timestamps: true,
	});

module.exports = mongoose.model("Pet", petSchema);
