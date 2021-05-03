const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");

function init(dbUsers, dbMessages) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(dbUsers, dbMessages);
    const message = new Messages.default(dbMessages);
    //avec la commande http POST localhost:4000/api/user/login login=X password=XXX
    //renvoie le user s'il existe et si le motdepasse est correct
    //to login



    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
                                                SERVICE   =>           CREATION D'UN UTILISATEUR
    
     ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router.put("/user", (req, res) => {
        console.log(req.session);
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send({ "status": "error", "msg": "Missing fields" });
        } else {
            console.log('je suis la');
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => { res.status(500).send(err); console.log(err) });
        }
    });

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>           CONNEXION

 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            console.log("oulala",req.body);
            // Erreur sur la requête HTTP
            if (login=='' || password=='') {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : tous les champs nécessaires"
                });
                return;
            }
            const userExist = await users.exists(login);
            if(! userExist) {
                console.log(userExist);
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            console.log(userid);
            if(!userid){
                console.log("password invalide");
                // Faux login : destruction de la session et erreur
                req.session.destroy((err) => { });
                res.status(403).json({
                    status: 403,
                    message: "login et/ou le mot de passe invalide(s)"
                });
                return;
            }else {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                        return err;
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = login;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                //console.log(req.session.cookie);
                return;
            }
            
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>           DECONNECTION

 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router.get('/user/:user_id/logout', (req, res) => { //   DECONNECTION!!!!
        
        req.session.destroy((err) => {
            console.log(req.sessionID); 
            if(err){
                console.log(err);
            }else{
                console.log("pas d'erreur dans logout");
                res.status(202).json({
                    status: 202,
                    message: "vous vous etes deconnecter "
                });
                return;
               res.send('Vous etes deconnecter');
               res.redirect('/users/login');
            }
        });
    });



    /*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>           SEARCH USERS

 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router.get("/user/search", (req, res) => {
        const { lastname, firstname } = req.body;
        if (!lastname && !firstname) {
            res.status(400).send({ "status": "erro", "msg": "aucun nom ou prenom saisi" });
        } else {
            users.search(lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    })
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                          SERVICE   =>           UPDATE USER

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


    router.post("/user/:user_id", (req, res) => {
        const { password, lastname, firstname } = req.body;
        const login = req.params.user_id
        console.log(req);
        console.log(req.body);
        console.log(req.body.params);
        if (!login || !password || !lastname || !firstname ) {
            res.status(400).send("Missing fields");
        } else {
            users.updateUser( login, password,lastname, firstname)
                .then((user_id) => res.status(201).send({ id: req.params.user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    /*router.post("/follow/add/:user_id", (req, res) => { // Inscription 
        //const { login} = req.body;
        //console.log("je suis la")
        //console.log(login)

            let amis= users.exists(req.params.user_id)
            if(! amis) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            } else {
                users.followUser( req.session.userid, req.params.user_id)

                .then((user_id) => res.status(201).send( `'${req.session.userid}' suit ${user_id} `))
                .catch((err) => res.status(500).send(err));
            }


        })*/

 /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>         FOLLOW FRIEND

 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    //commmande http localhost:api/user/friend/x login=y
    //x suit y
    router.post("/user/follow/:user_id", async (req, res) => { 
        // Inscription 
        const ami = req.body; 
        //console.log("je suis la") 
        console.log(ami.login) 
        let amis = await users.exists(ami.login) 
        if(! amis) { 
            //console.log("c inconuuuuuuuuuuuuuuuu");
            res.status(401).json({ 
                status: 401, 
                message: "Utilisateur inconnu" 
            }); 
            return; 
        } else {
            if(ami.login==req.params.user_id){
                res.status(404).send("impossible de suivre soi-même !")
            }else{
                //console.log("ami existant ______________________")
                //console.log("user = ", req.params.user_id)
                //console.log("ami = ", ami.login)
                users.followUser(req.params.user_id, ami.login) 
                .then((user_id) => res.status(201).send( `Vous suivez ${user_id}` )) 
                .catch((err) => res.status(500).send(err));
            }
        } 
    })

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>           UNFOLLOW FRIEND

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    router.delete('/user/unfollow/:user_id', async (req, res) =>{
        const ami = req.body;
        console.log(ami.login)
        let amis = await users.exists(ami.login)
        console.log("amis = ",amis);
        if(! amis){
            res.status(401).json({
                status: 401,
                message: "Utilisateur inconnu"
            });
            return;
        } else {
            friend = await users.exists_following(req.params.user_id, ami.login);
            if(! friend){
                res.status(404).send("il n'est pas dans la liste des followings");
            } else {
                users.UnfollowUser(req.params.user_id, ami.login)
                .then((user_id) => res.status(201).send(`vous ne suivez plus ${user_id}`))
                .catch((err) => res.status(500).send(err));
            }
        }
    });


    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>           GETFOLLOWINGS

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    router.get('/user/allfollowing/:user_id', async (req,res) => {
        const user = await users.exists(req.params.user_id);
        if(! user){
            res.status(401).json({
                status: 401,
                message: "user inconnu"
            });
        } else {
            users.getFollowings(req.params.user_id)
            .then((followings) => res.status(201).send(followings))
            .catch((err) => res.status(500).send(err));
        }
    })

    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>           GETFOLLOWERS

    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    router.get('/user/allfollower/:user_id', async (req,res) => {
        const user = await users.exists(req.params.user_id);
        if(! user){
            res.status(401).json({
                status: 401,
                message: "user inconnu"
            });
        } else {
            users.getFollowers(req.params.user_id)
            .then((followings) => res.status(201).send(followings))
            .catch((err) => res.status(500).send(err));
        }
    })
    
   



/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE   =>          TROUVER     UTILISATEUR
                                                      =>          SUPPRESSION UTILISATEUR

 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router
        .route("/user/:user_id")
        .get(async (req, res) => {
            try {
                console.log(`y-t-il l'utilisateur '${req.params.user_id}' ?`);
                const exist= await users.exists(req.params.user_id);
                if(!exist)
                    res.status(404)
                    .send(`ùtilisateur '${req.params.user_id}' non existant`);
                else{
                    users.get(req.params.user_id)
                    .then((user_id) => res.status(200).send( user_id ))
                    .catch((err) => res.status(204).send(err))
                }
            }
            catch (e) {
                res.status(500).send(e)
            }
        })
        .delete(async (req, res) => {
            try{
                console.log(req.params.user_id);
                const { password } = req.body;
                console.log("apres le print")
                const existUser = await users.exists(req.params.user_id);
                console.log('apres le exist');
                if(!existUser){
                    res.status(404)
                    .send(`user '${req.params.user_id}' not existant !`);
                }else{
                    console.log("je suis dans api delete user");
                    console.log(req.body);
                    const passwordCheck = await users.checkpassword(req.params.user_id, password);
                    if(!passwordCheck){
                        res.status(406)
                        .send(`password incorrect !`);
                    }else{
                        console.log("il existe bien ==================");
                        users.deleteUser(req.params.user_id, para.password)
                        .then((user_id) => res.send(`delete user ${user_id} succeded`))
                        .catch((err) => res.status(500).send('delete invalide'));
                    }
                } 
            }
            catch (e) {
                res.status(500).send(e);
            }
        });








    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                           SERVICE =>           AJOUT D'UN MESSAGE

   ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router.post('/message/add/:id', async (req, res) => {
        //const id=req.session.login;
        let user = await users.exists(req.params.id)
        const msg = req.body.message;
        const img = req.body.image;

        if (!user) {
            res.status(401).json({
                status: 401,
                message: "Utilisateur inconnu"
            });
            return;
        }
        if (!msg && !img) {
            res.status(400).json({ status: 400, msg: "Mettez quelque chose !" });
            return;
        }
        else {
            if (msg && !img) {
                message.insertMessage(req.params.id, msg, '')
                    .then((doc) => res.status(201).send(`'${doc.message}' posté par '${doc.login}'`))
                    .catch((err) => res.status(500).send(err));
            }
            if (!msg && img) {
                message.insertMessage(req.params.id, '', img)
                    .then((doc) => res.status(201).send(`'${doc.message}' posté par '${doc.login}'`))
                    .catch((err) => res.status(500).send(err));
            }
            if (msg && img) {
                message.insertMessage(req.params.id, msg, img)
                    .then((doc) => res.status(201).send(`'${doc.message}' et '${doc.image}'posté par '${doc.login}'`))
                    .catch((err) => res.status(500).send(err));
            }
        }
    })


    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                            SERVICE =>           SUPPRIMER UN MESSAGE

    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    router.delete('/message/delete', async (req, res) => {
        try {
            let login = await users.exists(req.body.login)
            const msg = req.body.message;

            if (!login) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            if (!msg) {
                res.status(400).json({ status: 400, msg: "Mettez quelque chose !" });
                return;
            }
            else {
                const passwordCheck = await users.checkpassword(req.body.login, req.body.password);
                if (!passwordCheck) {
                    res.status(406)
                        .send(`password incorrect ! '${req.body.login}' et '${req.body.password}'`);
                } else {
                    console.log("il existe bien ==================");
                    message.deleteMessage(login, msg)
                        .then((doc) => res.send(`delete of '${doc}' message succeded`))
                        .catch((err) => res.status(500).send('delete invalide'));
                }
            }
        }
        catch (e) {
            res.status(500).send(e);
        }
    });


    /*---------------------------------------------------------------------------------------------------------------------------------
     *                                        SERVICE   =>        GetMessage
     * --------------------------------------------------------------------------------------------------------------------------------*/

    router.get("/message/:user_id", async (req, res) => {
        try {
            const exist = await users.exists(req.params.user_id);
            if (!exist) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            else {
                const lesMsgs = await message.getMessage(req.params.user_id)
                if (!lesMsgs) {
                    res.status(401).json({
                        status: 401,
                        message: "Aucun message pour l'utilisateur"
                    });
                } else {
                    let maList=[]
                    lesMsgs.map((doc) => maList.push({ doc }))
                    res.status(201).send(maList)
                    //message.getMessage(req.params.user_id)
                    //lesMsgs.then((docs) => {
                    //        for (var doc in docs)
                    //            res.status(201).send(`'${doc}'`)
                    //    })

                    //lesMsgs.catch((err) => res.status(400).send(err));
                }

            }
        }
        catch (e) {
            res.status(500).send(e);
        }
    })

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                        SERVICE   =>
                                                  =>

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router
    .route("/profile/followings/:user_id")
    .get(async (req, res) => {
        try {
            console.log(`y-t-il l'utilisateur '${req.params.user_id}' ?`);
            const exist= await users.exists(req.params.user_id);
            if(!exist)
                res.status(404)
                .send(`ùtilisateur '${req.params.user_id}' non existant`);
            else{
                console.log(`les followings de '${req.params.user_id}' sont:`);
                let followings = await users.getFollowings(req.params.user_id)
                /*.forEach((row) => {
                    console.log(row.user)
                })
                .then( (row) => res.status(302).send())
                .catch((err) => res.status(204).send(err));
                //console.log(followings);

                /*console.log(`les tweets '${req.params.user_id}' sont:`);
                let tweets = massages.getTweets(req.params.user_id)
                .then((user_id) => res.status(200).send(`les tweets de '${user_id}' sont recuperes`))
                .catch((err) => res.status(204));
                console.log(tweets);
            }
        }
        catch (e) {
            res.status(500).send(e)
        }
    })*/

    return router;
}
exports.default = init;

