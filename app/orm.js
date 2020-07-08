require( 'dotenv' ).config();
const mysql = require('mysql');
// an external npm package we are using

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err ) {
                    return reject( err );
                }
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err ) {
                    return reject( err );
                }
                resolve();
            } );
        } );
    }
}

const db  = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  };
  
var connection;
  if (process.env.JAWSDB_URL){
      connection = new Database(process.env.JAWSDB_URL);
  }
  else {
      connection = new Database(db);
  }

function selectAll( ){
    return connection.query( 'SELECT * FROM food' );
}

function showItem(category) {
    return connection.query( 'SELECT * FROM food WHERE category=?', category );
}

function addItem(category, item, quantity, image_url ){
    return connection.query( 'INSERT INTO food (category, item, quantity, image_url) VALUES (?,?,?,?)', [category, item, quantity, image_url] );
}

function removeItem(id){
    return connection.query( 'DELETE FROM fridge WHERE id=?', id);
}

function showFridge() {
    return connection.query( 'SELECT * FROM fridge');
}
function updateFridge(id){
    return connection.query ('INSERT INTO fridge ( item, is_rotten, quantity, image_url ) SELECT item, is_rotten, quantity, image_url FROM food WHERE food.id=?', id);
}

module.exports = { selectAll, showItem, addItem, removeItem, showFridge, updateFridge};