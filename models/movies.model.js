/** Filmer model */

async function createTable(mysql) {
    let sql = `
            DROP TABLE IF EXISTS movies;
            CREATE TABLE movies(
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                release_year INT NOT NULL,
                duration DECIMAL(10, 2),
                watched BOOLEAN DEFAULT FALSE
            );
        `;

    let [rows] = await mysql.query(sql);
    return rows;

}
async function getAllMovies(mysql) {
    let sql = `SELECT * FROM movies;`;
    let [rows] = await mysql.query(sql);
    return rows;
}

async function getMovieById(mysql, id) {
    let sql = `SELECT * FROM movies WHERE id=?`;
    let [rows] = await mysql.query(sql, [id]);
    return rows[0];
}

async function addMovie(mysql, movie) {
    let sql = `INSERT INTO movies(title, release_year, duration, watched)VALUES(?, ?, ?, ?);`;
    let { title, release_year, duration, watched } = movie;

    

    let [ result ] = await mysql.query(sql, [title, release_year, duration, watched]);

    return { id: result.insertId, ...movie};
}

async function updateMovie(mysql, id, movie) {
    let { title, release_year, duration, watched } = movie;
    
    let sql = `UPDATE movies SET title=?, release_year=?, duration=?, watched=? WHERE id=?;`;

    let [result] = await mysql.query(sql, [title, release_year, duration, watched, id]);

    return result;

}

async function deleteMovie(mysql, id) {
    let sql = `DELETE FROM movies WHERE id=?;`;

    let [result] = await mysql.query(sql, [id]);

    return result;
}

module.exports = { createTable, getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };