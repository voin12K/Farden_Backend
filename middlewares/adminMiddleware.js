import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export default adminMiddleware;
