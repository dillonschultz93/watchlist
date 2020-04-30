const JWT = require('jsonwebtoken');
const User = require('../models/user.model');

const signToken = (user) => {
	return JWT.sign(
		{
			iss: 'watchlist',
			sub: user.id,
			iat: new Date().getTime(), // current time
			exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
		},
		process.env.JWT_SECRET
	);
};

module.exports = {
	signUp: async (req, res, next) => {
		const { name, email, password } = req.value.body;

		const foundUser = await User.findOne({ email });

		if (foundUser)
			return res.status(403).json({ error: 'Email is already in use' });

		const newUser = new User({ name, email, password });
		await newUser.save();

		const token = signToken(newUser);
		res.status(200).json({ token });
	},
	signIn: async (req, res, next) => {},
	secret: async (req, res, next) => {},
};
