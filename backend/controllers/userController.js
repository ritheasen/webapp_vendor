const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { BadRequestError } = require('../middleware/errorMiddleware')

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please fill all fields')
    }

    // Check if user exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        throw new BadRequestError('User already exist')
    }

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!email.match(emailRegex)) {
        throw new BadRequestError('Invalid Email')
    }

    // Password validation
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!password.match(passwordRegex)) {
        throw new BadRequestError(
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters longs'
        )
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        throw new BadRequestError('Invalid user data')
    }
})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please fill all fields')
    }

    // Check if user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        throw new BadRequestError('Invalid credentials')
    }
})

// @desc   Me
// @route   Get /api/users/user
// @access  Private
const me = asyncHandler(async (req, res) => {

    // You can access the authenticated user's data from req.user (assuming your authentication middleware sets it)
    const user = req.user;

    res.json({
        _id: user._id,
        username: user.name,
        email: user.email,
        // Add other user properties you want to expose
    });

})

const generateToken = (id) => {
    return jwt.sign({ id }, "asdqwe123", {
        expiresIn: '5d',
    })
}

// @desc   Me
// @route   Get /api/users/allusers
// @access  Private
const allUsers = asyncHandler(async (req, res) => {
    
        // You can access the authenticated user's data from req.user (assuming your authentication middleware sets it)
        const users = await User.find({});
    
        res.json(users);
})

module.exports = { registerUser, loginUser, me, allUsers }