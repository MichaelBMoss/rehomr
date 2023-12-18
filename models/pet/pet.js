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
	location: { type: String, required: true }, 
	photoUrl: {
		type: String,
	},
});

module.exports = mongoose.model("Pet", petSchema);
