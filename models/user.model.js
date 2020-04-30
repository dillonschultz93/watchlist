const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "can't be blank"],
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('user', userSchema);

module.exports = User;
