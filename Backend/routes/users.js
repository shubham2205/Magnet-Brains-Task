import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../Backend/models/User.js';
import authMiddleware from '../../Backend/middleware/auth.js';

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user profile
router.get('/me', authMiddleware, async (req, res) => {
  res.send(req.user);
});

export default router;

