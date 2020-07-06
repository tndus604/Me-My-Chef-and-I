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

const db = new Database({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    insecureAuth : true
});

function selectAll( ){
    return db.query( 'SELECT * FROM food' );
}

function showItem(category) {
    return db.query( 'SELECT * FROM food WHERE category=?', category );
}

function addItem(item, category, quantity, image_url ){
    return db.query( 'INSERT INTO food (item, category, quantity, image_url) VALUES (?,?,?,?)', [item, category, quantity, image_url] );
}

function removeItem(id){
    return db.query( 'DELETE FROM food WHERE id=?', id);
}

function updateItem(quantity, id) {
    return db.query( 'UPDATE food SET quantity=? WHERE id=?', [quantity, id]);
}

function showFridge() {
    return db.query( 'SELECT * FROM fridge');
}
function updateFridge(id){
    return db.query ('INSERT INTO fridge ( item, is_rotten, quantity, image_url ) SELECT item, is_rotten, quantity, image_url FROM food WHERE food.id=?', id);
}
// Future Plans: When quantity is updated, is_rotten resets. 


// function insertData( priority, info, due ){
//     if( priority === '' ) {
//         priority = 'primary'
//     }
//     // no due? set to 7 days from now
//     if( due === '' ) {
//         due = moment().add(7, 'days').format('YYYY-MM-DD' )
//     }
//     console.log( ' inserting task data: ', { priority, info, due } )
//     return db.query( 'INSERT INTO tasks SET ? ',
//         { priority, info, due } )
// }

// function updateTask( id, priority, info, due ){
//     return db.query( 'UPDATE tasks SET ? WHERE id=?',
//         [ { priority, info, due }, id ] )
// }

// function deleteTask( id ){
//     return db.query( 'DELETE FROM tasks WHERE id=?', [ id ] )
// }

module.exports = { selectAll, showItem, addItem, removeItem, updateItem, showFridge, updateFridge};