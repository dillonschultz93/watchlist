const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function (challenge) {
	try {
		return await bcrypt.compare(challenge, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

const User = mongoose.model('user', userSchema);

module.exports = User;
