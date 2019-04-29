//require

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//const
var url = "mongodb://localhost:27017/";
var DB = "RentACar";


//server
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//host
var server = app.listen(3003, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("App escuchando en http://%s:%s",host,port);
})

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('estilo');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  };


function connect(){
    const client = new MongoClient(url,{ useNewUrlParser: true });
    // Use connect method to connect to the server
    client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

/* var challengesSchema = new mongoose.Schema({
  type: String,
  sport: String,
  teamA: String,
  teamB: String
})


var newsSchema = new mongoose.Schema({
  type: String,
  title: String,
  subtitle: String,
  sport: String
})

var teamsSchema = new mongoose.Schema({
  type: String,
  name: String,
  picture: String,
  members: Array
})

var resultSchema = new mongoose.Schema({
  type: String,
  typeResult: String,
  info: String,
  url: String
})

var sportsSchema = new mongoose.Schema({
  type: String,
  name: String,
  picture: String
}) 
 */
//////////////////////////////////MODELS///////////////////////////////////////////

/* var userModel = mongoose.model("user", {
  type: String,
  name: String,
  email: String,
  hash: String
})

var challengesModel =mongoose.model("challenge", {
  type: String,
  sport: String,
  teamA: String,
  teamB: String
})


var newsModel = mongoose.model("new", {
  type: String,
  title: String,
  subtitle: String,
  sport: String
})

var teamsModel = mongoose.model("team", {
  type: String,
  name: String,
  picture: String,
  members: Array
})

var resultsModel = mongoose.model("result", {
  type: String,
  typeResult: String,
  info: String,
  url: String
})

var sportsModel = mongoose.model("sport", {
  type: String,
  name: String,
  picture: String
}) */


///////////////////////////////////CRUD/////////////////////////////////////////////

//buildUserApi(app);

//get del usuario segun su email
app.get("/vehiculo", function(req,res,next){
    var con = connect();
    findDocuments(con, function() {
    });
});

//update del usuario segun su id
app.post("/user", function(req,res,next){
  var userEmail = req.query.email;
  var userHash = req.query.hash;
  var userName = req.query.name;
  var userId = req.query.id;
 
  if(req.query.email){
      if(req.query.hash){
          if(req.query.name){
              var user = mongoose.model('users', userSchema);
              user.findOneAndUpdate({ '_id': userId},{$set:{ 
                  email: userEmail,
                  hash: userHash,
                  name: userName}}, function(err, users) {
              user.find({ '_id': userId}, function (err, users) {
                  if (err) return handleError(err);
                  res.send(JSON.stringify(users))
                  })
              })
          }
          else{
              res.send(JSON.stringify("[{Empty name}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty hash}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty email}]"))
  }
});

//crea un usuario
app.put("/user", function(req,res,next){
  var userEmail = req.query.email;
  var userHash = req.query.hash;
  var userName = req.query.name;
  if(req.query.email){
      if(req.query.hash){
          if(req.query.name){
              var newUser = {
                  type: "0",
                  name: userName,
                  email: userEmail,
                  hash: userHash
              }
              new userModel(newUser).save();
              res.send(JSON.stringify(newUser))
          }
          else{
              res.send(JSON.stringify("[{Empty name}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty hash}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty email}]"))
  }
});

//borra un usuario
app.delete("/user", function(req,res,next){
  var userEmail = req.query.email;
  if(req.query.email){
      var user = mongoose.model('users', userSchema);
      user.findOneAndRemove({ 'email': userEmail}, function (err, users) {
      if (err) return handleError(err);
      res.send(JSON.stringify(users))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty Email}]"))
  }
});

//news crud
app.get("/news/all", function(req,res,next){
  var newN = mongoose.model('news', newsSchema);
  newN.find({}, function (err, news) {
  if (err) return handleError(err);
  res.send(JSON.stringify(news))
  })
});

//get news by title
app.get("/news", function(req,res,next){
  var newsTitle = req.query.title;
  if(req.query.title){
      var neww = mongoose.model('news', newsSchema);
      neww.find({ 'title': newsTitle }, function (err, news) {
      if (err) return handleError(err);
      res.send(JSON.stringify(news))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty title}]"))
  }
});

//update news
app.post("/news", function(req,res,next){
  var newsTitle = req.query.title;
  var newsSubtitle = req.query.subtitle;
  var newsSport = req.query.sport;
  var newsId = req.query.id;
  if(req.query.title){
      if(req.query.subtitle){
          if(req.query.sport){
              var newW = mongoose.model('news', newsSchema);
              newW.findOneAndUpdate({ '_id': newsId},{$set:{ 
                  type: "1",
                  title: newsTitle,
                  subtitle: newsSubtitle,
                  sport: newsSport}}, function(err, news) {
              newW.find({ '_id': newsId}, function (err, news) {
                  if (err) return handleError(err);
                  res.send(JSON.stringify(news))
                  })
              })
          }
          else{
              res.send(JSON.stringify("[{Empty sport}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty subtitle}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty title}]"))
  }
});

//crear noticia
app.put("/news", function(req,res,next){
  var newsTitle = req.query.title;
  var newsSubtitle = req.query.subtitle;
  var newsSport = req.query.sport;
  if(req.query.title){
      if(req.query.subtitle){
          if(req.query.sport){
              var newNews = {
                  type: "1",
                  title: newsTitle,
                  subtitle: newsSubtitle,
                  sport: newsSport
              }
              new newsModel(newNews).save();
              res.send(JSON.stringify(newNews))
          }
          else{
              res.send(JSON.stringify("[{Empty sport}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty subtitle}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty title}]"))
  }
});

//borrar noticia
app.delete("/news", function(req,res,next){
  var newsTitle = req.query.title;
  if(req.query.title){
      var newsW = mongoose.model('news', newsSchema);
      newsW.findOneAndRemove({ 'title': newsTitle}, function (err, news) {
      if (err) return handleError(err);
      res.send(JSON.stringify(news))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty title}]"))
  }
});

//challenges crud
app.get("/challenges/all", function(req,res,next){
  var challenge = mongoose.model('challenges', challengesSchema);
  challenge.find({ }, function (err, challenges) {
  if (err) return handleError(err);
  res.send(JSON.stringify(challenges))
  })
});

//get challange
app.get("/challenges", function(req,res,next){
  var challengesId = req.query.id;
  if(req.query.id){
      var challenge = mongoose.model('challenges', challengesSchema);
      challenge.find({ '_id': challengesId }, function (err, challenges) {
      if (err) return handleError(err);
      res.send(JSON.stringify(challenges))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty title}]"))
  }
});

//update challenge
app.post("/challenges", function(req,res,next){
  var challengeSport = req.query.sport;
  var challengeTeamA = req.query.teama;
  var challengeTeamB = req.query.teamb;
  var challengeId = req.query.id;
  if(req.query.sport){
      if(req.query.teama){
          if(req.query.teamb){
              if(req.query.id){
                  var challenge = mongoose.model('challenges', challengesSchema);
                  challenge.findOneAndUpdate({ '_id': challengeId},{$set:{ 
                      sport: challengeSport,
                      teamA: challengeTeamA,
                      teamB: challengeTeamB}}, function(err, news) {
                  challenge.find({ '_id': challengeId}, function (err, challenges) {
                      if (err) return handleError(err);
                      res.send(JSON.stringify(challenges))
                      })
                  })
              }
              else{
                  res.send(JSON.stringify("[{Empty ID}]"))
              }
          }
          else{
              res.send(JSON.stringify("[{Empty teamB}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty teamA}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty sport}]"))
  }
});

//create challange
app.put("/challenges", function(req,res,next){
  var challengeSport = req.query.sport;
  var challengeTeamA = req.query.teama;
  var challengeTeamB = req.query.teamb;
  if(req.query.sport){
      if(req.query.teama){
          if(req.query.teamb){
              var newChallenge = {
                  type: "3",
                  sport: challengeSport,
                  teamA: challengeTeamA,
                  teamB: challengeTeamB
              }
              new challengesModel(newChallenge).save();
              res.send(JSON.stringify(newChallenge))
          }
          else{
              res.send(JSON.stringify("[{Empty teamB}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty teamA}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty sport}]"))
  }
});

//delete challenge
app.delete("/challenges", function(req,res,next){
  var challengeId = req.query.id;
  if(req.query.id){
      var challange = mongoose.model('challenges', challengesSchema);
      challange.findOneAndRemove({ '_id': challengeId}, function (err, challanges) {
      if (err) return handleError(err);
      res.send(JSON.stringify(challanges))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty ID}]"))
  }
});

//sports crud
app.get("/sports/all", function(req,res,next){
  var sport = mongoose.model('sports', sportsSchema);
  sport.find({}, function (err, sports) {
  if (err) return handleError(err);
  res.send(JSON.stringify(sports))
  })
});

//sports crud
app.get("/sports", function(req,res,next){
  var sportName = req.query.name;
  if(req.query.name){
      var sport = mongoose.model('sports', sportsSchema);
      sport.find({ 'name': sportName}, function (err, sports) {
      if (err) return handleError(err);
      res.send(JSON.stringify(sports))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty name}]"))
  }
});

//update sport
app.post("/sports", function(req,res,next){
  var sportsName = req.query.name;
  var sportsPicture = req.query.picture;
  var sportsId = req.query.id;
  if(req.query.name){
      if(req.query.picture){
          if(req.query.id){
              var sport = mongoose.model('sports', sportsSchema);
              sport.findOneAndUpdate({ '_id': sportsId},{$set:{ 
                  name: sportsName,
                  picture: sportsPicture}}, function(err, news) {
              sport.find({ '_id': sportsId}, function (err, sports) {
                  if (err) return handleError(err);
                  res.send(JSON.stringify(sports))
                  })
              })
          }
          else{
              res.send(JSON.stringify("[{Empty ID}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty teamA}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty name}]"))
  }
});

//create sport
app.put("/sports", function(req,res,next){
  var sportsName = req.query.name;
  var sportsPicture = req.query.picture;
  if(req.query.name){
      if(req.query.picture){
          var newSport = {
              type: "4",
              name: sportsName,
              picture: sportsPicture
          }
          new sportsModel(newSport).save();
          res.send(JSON.stringify(newSport))
      }
      else{
          res.send(JSON.stringify("[{Empty picture}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty name}]"))
  }
});

//delete sport
app.delete("/sports", function(req,res,next){
  var sportsName = req.query.name;
  if(req.query.name){
      var sport = mongoose.model('sports', sportsSchema);
      sport.findOneAndRemove({ 'name': sportsName}, function (err, sports) {
      if (err) return handleError(err);
      res.send(JSON.stringify(sports))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty name}]"))
  }
});

//results crud
app.get("/results", function(req,res,next){
  var resultId = req.query.id;
  if(req.query.id){
      var result = mongoose.model('results', resultSchema);
      result.find({ '_id': resultId}, function (err, results) {
      if (err) return handleError(err);
      res.send(JSON.stringify(results))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty ID}]"))
  }
});

//update result
app.post("/results", function(req,res,next){
  var resultType = req.query.type;
  var resultInfo = req.query.info;
  var resultUrl = req.query.url;
  var resultId = req.query.id;
  if(req.query.type){
      if(req.query.info){
          if(req.query.url){
              if(req.query.id){
                  var result = mongoose.model('results', resultSchema);
                  result.findOneAndUpdate({ '_id': resultId},{$set:{ 
                      typeResult: resultType,
                      info: resultInfo,
                      url: resultUrl}}, function(err, results) {
                  result.find({ '_id': resultId}, function (err, results) {
                      if (err) return handleError(err);
                      res.send(JSON.stringify(results))
                      })
                  })
              }
              else{
                  res.send(JSON.stringify("[{Empty ID}]"))
              }
          }
          else{
              res.send(JSON.stringify("[{Empty url}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty info}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty type}]"))
  }
});

//create result
app.put("/results", function(req,res,next){
  var resultType = req.query.type;
  var resultInfo = req.query.info;
  var resultUrl = req.query.url;
  if(req.query.type){
      if(req.query.info){
          if(req.query.url){
              var newResult = {
                  type: "5",
                  typeResult: resultType,
                  info: resultInfo,
                  url: resultUrl
              }
              new resultsModel(newResult).save();
              res.send(JSON.stringify(newResult))
          }
          else{
              res.send(JSON.stringify("[{Empty url}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty info}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty type}]"))
  }
});

//delete result
app.delete("/results", function(req,res,next){
  var resultId = req.query.id;
  if(req.query.id){
      var result = mongoose.model('results', resultSchema);
      result.findOneAndRemove({ '_id': resultId}, function (err, results) {
      if (err) return handleError(err);
      res.send(JSON.stringify(results))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty ID}]"))
  }
});

//teams crud
app.get("/teams", function(req,res,next){
  var teamsName = req.query.name;
  if(req.query.name){
      var team = mongoose.model('teams', teamsSchema);
      team.find({ 'name': teamsName}, function (err, teams) {
      if (err) return handleError(err);
      res.send(JSON.stringify(teams))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty name}]"))
  }
});

//update team
app.post("/teams", function(req,res,next){
  var teamsMembers = req.query.members.split(",");
  var teamsName = req.query.name;
  var teamsPicture = req.query.picture;
  var teamsId = req.query.id;
  if(req.query.picture){
      if(req.query.name){
          if(req.query.members){
              if(req.query.id){
                  var team = mongoose.model('teams', teamsSchema);
                  team.findOneAndUpdate({ '_id': teamsId},{$set:{ 
                      members: teamsMembers,
                      name: teamsName,
                      picture: teamsPicture}}, function(err, teams) {
                  team.find({ '_id': teamsId}, function (err, teams) {
                      if (err) return handleError(err);
                      res.send(JSON.stringify(teams))
                      })
                  })
              }
              else{
                  res.send(JSON.stringify("[{Empty ID}]"))
              }
          }
          else{
              res.send(JSON.stringify("[{Empty members}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty name}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty picture}]"))
  }
});

//create team
app.put("/teams", function(req,res,next){
  var teamsMembers = req.query.members.split(",");
  var teamsName = req.query.name;
  var teamsPicture = req.query.picture;
  if(req.query.picture){
      if(req.query.name){
          if(req.query.members){
              var newTeam = {
                  type: "2",
                  members: teamsMembers,
                  name: teamsName,
                  picture: teamsPicture
              }
              new teamsModel(newTeam).save();
              res.send(JSON.stringify(newTeam))
          }
          else{
              res.send(JSON.stringify("[{Empty url}]"))
          }
      }
      else{
          res.send(JSON.stringify("[{Empty info}]"))
      }
  }
  else{
      res.send(JSON.stringify("[{Empty type}]"))
  }
});

app.delete("/teams", function(req,res,next){
  var teamId = req.query.id;
  if(req.query.id){
      var team = mongoose.model('teams', teamsSchema);
      team.findOneAndRemove({ '_id': teamId}, function (err, teams) {
      if (err) return handleError(err);
      res.send(JSON.stringify(teams))
      })
  }
  else{
      res.send(JSON.stringify("[{Empty ID}]"))
  }
});