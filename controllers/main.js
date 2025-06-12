require('dotenv').config();

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400);
    }

    try {
        const id = new Date().getDate(); // FIXED
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined.");
        }

        const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.status(200).json({ msg: 'user created', token });
    } catch (err) {
        console.error('JWT sign error:', err);
        res.status(500).json({ msg: 'Something went wrong, try again later' });
    }
};

const dashboard = async (req, res) => {
    try {
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({msg: `Hello, ${req.user.username}`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`});
    } catch (error) {
        throw new CustomAPIError('Not authorised to access this route', 401);
    }
}

module.exports = {login, dashboard};