class Messages{
  constructor(dbMessages){
    this.dbMessages=dbMessages

    
  }

  
    insertMessage(login, mmsg, img) {
        return new Promise((resolve, reject) => {
            let msg = {
                login: login,
                message: mmsg,
                image: img,
                date: new Date()
            };
            this.dbMessages.insert(msg, function (err, doc) {
                if (err) {
                    console.log("oulala", err);
                    reject(err);
                } else {
                    console.log('Inserted', doc.message);
                    resolve(doc);
                }

            })
        })
    }

  deleteMessage(login, mmsg){
    return new Promise((resolve, reject) => {
        let msg = getmsg(login,mmsg)
       // for (i = 0; i < msg.length; i++) {
        console.log("ici et msg= ",mg)
            this.dbMessages.remove(msg, (err, docs) => {
                if (err) {
                    console.log("oulala ", err);
                    reject(err);
                } else {
                    console.log("message supprimé: ", docs);
                    resolve(docs);
                }
            })
        //}
    })
  }
    getmsg(login,msg) {
        console.log("ici");
        return new Promise((resolve, reject) => {
            this.db.findOne({ login: `${login}`, message:`${msg}` }, (err, docs) => {
                if (err) {
                    console.log("trouve pas un tel message");
                    reject(err);
                }
                else {
                    console.log(`found ${docs}`);
                    resolve(docs);
                }

            })
        });
    }
    getMessage(login) {
        return new Promise((resolve, reject) => {
            console.log(`Je suis dens le getMessage : ${login}`)
            this.dbMessages.find({login}, (err, docs) => {
                if (err) {
                    reject(err);
                }

                else {
                    console.log('je suis dans le resolve ')
                    console.log('found', docs);
                    resolve(docs);
                }
                    
            })
        });
    }
  
}

exports.default = Messages;




/*//const Users = require("./entities/users.js");
class Messages {
  constructor() {
    const MongoClient = require('mongodb').MongoCient;

    //this.bdd=bdd;//mongo
    // suite plus tard avec la BD
    const url = 'mongodb://localhost:27017/mybd';
    const dbName = 'monProjetMongo';

    MongoClient.connect(url, function(err, client) {
      console.log("Connecté à MongoDB");
      const db = client.db(dbName);
      client.close();
    })






    /*const MongoClient = require('mongodb').MongoClient;

    let bdd;
    let messageCollect;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      bdd = db.db("mydb");
      
      this.messageCollect = bdd.getCollection("MessageCollection");

      if (err) throw err;
      
      /*messageCollect = bdd.createCollection("MessageCollection", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        //bdd.close();
      });
    
      /*bdd.listCollections({bdd: MessageCollection})
      .next(function(err, collinfo) {
          if (collinfo) {
              console.log("elle existe bien!!!!")
              // The collection exists
          }else{
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              this.messageCollect = bdd.createCollection("MessageCollection", function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
                //bdd.close();
              });
            }); 
          }
      });*/
    
    /*const messageCollect= this.bdd.createCollection("MessageCollect", function(err, res){
        if (err) {
            console.log("une erreur!!!");
            throw err;
        }
        console.log("collecyion created!");
        //bdd.close();
    });
    console.log("MessageCollect")*/
 /* }


  posterMsg(login,message){
    return new Promise((resolve,reject)=>{
      const msg={id:`${login}`, message:`${message}`, dte: new Date()}

      this.messageCollect.insert(msg, function(err,result){
        if(err){
            console.log("pourquoi /n");
            reject(err);
        }
        else{
          console.log("pourquoi pas /n");
          resolve(result)
        } 
      })
    })
    

  }

  trouverMess(login){
    return new Promise((resolve,reject)=>{
      if(Users.exists(login)){
        this.messageCollect.find([id=login], function(err,result){
          if (err)
            throw err
          else resolve(result)
        })
      }
    })
   
  }

}
exports.default = Messages;
*/
