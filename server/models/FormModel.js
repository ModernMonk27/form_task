// Import necessary modules
import mysql from 'mysql2/promise';




// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'aravind',
  password: 'T2t2021@',
  database: 'formdatabase'
});

// Define SQL query to create a table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

// Function to create the table
async function createTable() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the SQL query to create the table
    await connection.query(createTableQuery);

    // Release the connection back to the pool
    connection.release();

    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Close the connection pool when done
    pool.end();
  }
}

// Call the function to create the table
createTable();

export default pool;
