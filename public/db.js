
const path = require('path');

const sqlite = require('sqlite3');


const Knex = require('knex');

const DB_NAME = 'note2file.sqlite3';

const TABLE_NAME = 'notes';



// columns
const COL_FILEPATH = 'filepath';
const COL_NOTE = 'note';

let db = null;

const initDB = (dbpath) => {
    db = Knex({
        client: 'sqlite3',
        connection: {
            filename: path.join(dbpath, DB_NAME),
        },
        useNullAsDefault: true,
    });

    db.schema.hasTable(TABLE_NAME).then(db_exists => {
        if (!db_exists) {
            return db.schema.createTable(TABLE_NAME, t => {
                t.increments('id').primary();
                t.string(COL_FILEPATH);
                t.string(COL_NOTE);
            });
        }
    });
};


const saveNote = async (note) => {
    return db(TABLE_NAME).insert(note)
        .then(noteId => {
            console.log(`>>> note saved to db : ${noteId}`);
            return noteId;
        })
        .catch(err => {
            console.log(`>>> error saving note : ${err}`);
        });
}

const fetchAllNotes = async () => {
    return db(TABLE_NAME).select().then(items => {
        console.log('>>> notes fetched');
        return items;
    }).catch(err => {
        console.log(`>>> error fetching notes: ${err}`);
    })
};

const deleteNote = async (noteId) => {
    return await db(TABLE_NAME).where({ id: noteId }).first().delete();
};

module.exports = {
    TABLE_NAME,
    COL_FILEPATH,
    COL_NOTE,
    db,
    initDB,
    saveNote,
    fetchAllNotes,
    deleteNote,
};
