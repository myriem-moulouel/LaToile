class Users {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
    const createUserTable = `CREATE TABLE IF NOT EXISTS users(
        login VARCHAR(50) NOT NULL PRIMARY KEY,
        password VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        firstname VARCHAR(50) NOT NULL
    )`;

    const createFollowing=`CREATE TABLE IF NOT EXISTS followinguser( 
      follower VARCHAR(50) NOT NULL, 
      following VARCHAR(50) NOT NULL, 
      date VARCHAR(50) NOT NULL, 
      PRIMARY KEY (follower, following), 
      FOREIGN KEY(follower) REFERENCES users(login) ON DELETE CASCADE ON UPDATE CASCADE, 
      FOREIGN KEY(following) REFERENCES users(login) ON DELETE CASCADE ON UPDATE CASCADE
    )`;

    db.exec(createUserTable, function(err){
        if(err){
            throw err;
        }
        console.log('User table ready');
    })

    db.exec(createFollowing, function(err){
      if(err){
          throw err;
      }
      console.log('followinguser table ready');
    })

  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      const insertUser = `INSERT INTO users
      VALUES ('${login}', '${password}', '${lastname}', '${firstname}')`;
      console.log(insertUser);

      this.db.exec(insertUser, function(err){
        if(err) {
            console.log(err);
            console.log(login);
            console.log(password);
            reject(err);
        } else {
            resolve(login);
        }
      });
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      const user = `SELECT login, password, firstname, lastname FROM users WHERE login = '${userid}' `;
      this.db.get(user,(err,data)=>{
        if(err){
          reject(err);
        }else{
          console.log("data=",data);
          resolve(data);
        }
        //console.log(data);
      })
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      const selectUser = `SELECT login From users WHERE login = '${login}'`;
      this.db.get(selectUser, function(err, row){
        console.log("je suis dans exist", login);
        if(err){
          console.log("il y a une errrrreeeeu");
          reject(err);
        }else{
          console.log("on est dans le resolve",row);
          resolve(row != undefined);
        }
      })
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
        const checkLoginPwd = `SELECT login FROM users WHERE login = '${login}' and password = ?`;
      this.db.get(checkLoginPwd, [password], function(err, row){
        if(err){
          reject(err);
        }else{
          resolve(row != undefined);
        }
      })
    });
  }

  followUser(follower, following ){ 
    return new Promise((resolve, reject) => { 
      console.log("on est dans follow#######################")
      const insertFollower = `INSERT INTO followinguser 
      VALUES ('${follower}', '${following}', '${new Date()}')`;
      // id => cpt+1 à chaque fois 
      console.log("apres le insert")
      console.log("insert follower ====== >",insertFollower); 
      this.db.exec(insertFollower, function(err){ 
        if(err) { 
          console.log('erreur detectee') 
          reject(err); 
        } else { 
          console.log("followUser reussi")
          resolve(following); 
        } 
      }); 
    }); 
  }

  deleteUser(login, password){
    return new Promise((resolve, reject) =>{
      //supprime un utilisateur de la table users
      //const existUser = await this.exists(login);
      const suppressionUser = `DELETE FROM users
      WHERE login = '${login}'`;
      this.db.exec(suppressionUser, function(err){
        if(err){
          console.log("erreur lors de la suppression de ",login)
          reject(err)
        }else{
          console.log("suppression reussie de ",login)
          resolve(login)
        }
      })
    })
  }

  async getFollowings(login){
    return new Promise((resolve, reject) =>{
      const followings = `SELECT following FROM followinguser where follower = '${login}'`      
      this.db.all(followings, (err, rows) => {
        if (err) {
          reject(err);
        }else{
          resolve(rows);
        }
      });
      
    })
  }

  async getFollowers(login){
    return new Promise((resolve, reject) =>{
      const followings = `SELECT follower FROM followinguser where following = '${login}'`      
      this.db.all(followings, (err, rows) => {
        if (err) {
          reject(err);
        }else{
          resolve(rows);
        }
      });
      
    })
  }

  async exists_following(id, loginFollowing){
    return new Promise((resolve, reject) => {
      const selectUser = `SELECT following From followinguser WHERE follower = '${id}' and following = '${loginFollowing}'`;
      this.db.get(selectUser, function(err, row){
        if(err){
          console.log("err exists_following");
          reject(err);
        }else{
          console.log("il existe dans la table !!!!!");
          resolve(row != undefined);
        }
      })
    });
  }

  async UnfollowUser(id, loginFollowing){
    return new Promise((resolve, reject) => {
      const deletefollowing = `DELETE from followinguser WHERE follower = '${id}' and following = '${loginFollowing}'`;
      this.db.exec(deletefollowing, (err) => {
        if(err){
          console.log("il y a une erreur",err," ");
          reject(err);
        } else {
          console.log(id," unfollows ",loginFollowing);
          resolve(loginFollowing);
        }
      });
    })
  }

  async search(lastname, firstname){
    return new Promise((resolve, reject) => {
      const recherche = `SELECT login from users WHERE lastname = '${lastname}' or firstname = '${firstname}'`;
      this.db.all(recherche, (err, row) => {
        if(err){
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }


    updateUser(login, password, lastname, firstname) {
        let _this = this
        return new Promise((resolve, reject) => {
            var myreq = _this.db.prepare("UPDATE users SET password = ?, lastname = ?, firstname = ? WHERE rowid = ?")               //Préparation de la requête
            myreq.run([ password, lastname, firstname, login], function (err, res) {
                if (err) {
                    console.log("erreur lors de la mise à jour de ", login)
                    reject(err);
                } else {
                    console.log("Mise à jour réussie de ", login)
                    resolve(this.lastID);
                }
            })
        })
    }

}

exports.default = Users;

