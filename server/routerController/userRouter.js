import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
import mysql from 'mysql2/promise'

const con = mysql.createPool({
  host: 'localhost',
  user: 'aravind',
  password: 'T2t2021@',
  database: 'formdatabase'
});

const registerUser = async (req,res) => {

    const { username, email, dob, password } = req.body;
    console.log("hii")

    try {
      // Get a connection from the pool
      console.log("every")
      const connect = await con.getConnection();
      console.log("donnn")

      // Insert user data into MySQL table
      const sql = 'INSERT INTO users (username, email, date_of_birth, password) VALUES (?, ?, ?, ?)';
      await connect.query(sql, [username, email, dob, password]);

      // Release the connection back to the pool
      connect.release();

      res.status(201).json({ message: 'User inserted successfully' });
    } catch (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Error inserting user' });
    }
    


}


const loginuser =  async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    connection.release();
    if (rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

} 

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, dob, password } = req.body;
    const connection = await pool.getConnection();
    await connection.query('UPDATE users SET username = ?, email = ?, dob = ?, password = ? WHERE id = ?', [username, email, dob, password, userId]);
    connection.release();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}  

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM users WHERE id = ?', [userId]);
    connection.release();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}  

export { registerUser, loginuser, updateUser,deleteUser } ;