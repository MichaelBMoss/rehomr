const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	animal: {
		type: String,
		required: true,
	},
	breed: String,
	age: Number,
	description: String,
	gender: {
		type: String,
		enum: ["Male", "Female"],
	},
	location: String,
});

module.exports = mongoose.model("Pet", petSchema);
