const path = require('path');
const api = require('./api.js');
const express = require('express');
const app = express()

const session = require("express-session");
const sqlite3 = require('sqlite3').verbose();
const NeDB = require('nedb');
const cors = require("cors");
// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

app.use(session({
    secret: "technoweb rocks"
}));




console.log('Creation de la base de donnees...');




const dbUsers = new sqlite3.Database('../BDDs/database.db', function(err) {
    if(err) {
        console.err('Probleme:', err);
        return err;
    }
    console.log('dbUsers ready !')
});



let dbMessages = new NeDB({ filename: '../BDDs/messages.txt', autoload: true});

dbMessages.loadDatabase( function(err) {
    if(err){
        console.err('Probleme:', err);
        return err;
    }
    console.log("dbMessage ready !")
});



app.use(cors());
app.use(express.json());


app.use('/api', api.default(dbUsers, dbMessages));

// Démarre le serveur
app.on('close', () => {});
exports.default = app;
