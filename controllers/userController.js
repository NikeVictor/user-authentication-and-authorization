const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    signup: async (req, res) => {
      try {
        // You can descide to add this to make email unique field
        if(await User.findOne({email: req.body.email})){
            return res.status(400).send(`User with email ${req.body.email} already exists`);
        }

        const user = new User ({
          firstName: req.body.name,
          lastName: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
        });
        console.log(user, "new user");
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 10);
        }
        const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
          expiresIn: "1h"
       })
       user.accessToken = accessToken;
        await user.save();
        res.json({
          data: user
        })
        accessToken
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
  },
  // Login user
  login: async (req, res) => {
    try {
      const body = req.body;
      const user = await User.findOne({ email: body.email });
      if (!user) {
        res.json({
          message: 'email is incorrect'
        });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        res.json({
          message:'password is not correct. please enter the right password'
        })
      }
      // generates a new token
      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
      });
      res.status(200).json({
      message: 'You have successfully logged in',
      accessToken
      })      
    } catch (error) {
        res.status(500).json({error});
    }
  },   
  

  // Getting all users in the database 
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json({
      data: users
      });
    } catch (error) {
      next(error)
      }
  },
  
  // Getting a particular user
  getUser: async (req, res, next) => {
      try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
        data: user
      });
      } catch (error) {
      next(error)
      }
  },

  // Updating a user
  updateUser: async (req, res, next) => {
      try {
      const update = req.body
      const userId = req.params.userId;
      await User.findByIdAndUpdate(userId, update);
      const user = await User.findById(userId)
      res.status(200).json({
        data: user,
        message: 'User has been updated'
      });
      } catch (error) {
      next(error)
      }
  },
   
  // Deleting a user
  deleteUser: async (req, res, next) => {
      try {
      const userId = req.params.userId;
      await User.findByIdAndDelete(userId);
      res.status(200).json({
        data: null,
        message: 'User has been deleted'
      });
      } catch (error) {
      next(error)
      }
  }
}

   