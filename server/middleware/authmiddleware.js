import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { username, password } = req.body;
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      connection.release();
      

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };