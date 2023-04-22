const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = 502;

const dbConfig = {
    server: 'localhost',
    database: 'studentspoints',
    user: 'karlo',
    password: 'moslavac',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true, // Add this line
    },
    port: 1433
};
app.get('/students', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM student;');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});