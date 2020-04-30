const User = require('../models/user.model');

module.exports = {
	signUp: async (req, res, next) => {
		const { name, email, password } = req.value.body;

		// Check if there is user with the same email
		const foundUser = await User.findOne({ email });
		if (foundUser)
			return res.status(403).json({ error: 'Email is already in use' });

		// Create a new user
		const newUser = new User({ name, email, password });
		await newUser.save();

		// Respond with token
	},
	signIn: async (req, res, next) => {},
	secret: async (req, res, next) => {},
};
