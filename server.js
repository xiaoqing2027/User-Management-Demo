var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://maggie:wang456@jello.modulusmongo.net:27017/yS5uduwo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("good");
});

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json


var User = require('./model/user');
app.use('/api', router);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use(express.static(path.join(__dirname, "/www")));



router.get('/', function(req, res){
  res.json({msg:"hahah, this is maggie's API."});
});


router.route("/users")
  .post(function(req, res){
    var user = new User();
     console.log(req.body);
    user.name = req.body.name;
    user.title = req.body.title;
    user.sex = req.body.sex;
    user.age = req.body.age;
    console.log("user");
    console.log(user);
    user.save(function(err){
      if(err){
        console.log("aasdf");
        res.send(err);
      }
      res.json({msg: "create a new user!"});
    });

  })

  .get(function(req, res){
    User.find(function(err, users){
      if(err){
        res.send(err);
      }
      res.json(users);
    });
  });

router.route('/user/:id')
  .get(function(req, res){
      var id = req.params.id;
      User.findById(id, function(err,user){
        if(err){
          res.send(err);
        }
        res.json(user);
      });
  })

  .put(function(req, res){
    User.findById(req.params.id, function(err, user){
      console.log(req.params.id);
        if(err){
          res.send(err);
        }

        user.name = req.body.name;
        user.title = req.body.title;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.save(function(err){
          if(err){
             res.send(err);
          }
          res.json({ message: 'user updated!' });
        });
      });
  })

  .delete(function(req, res){
    var id = req.params.id;
      User.remove({_id: id}, function(err){
        if(err){
          res.send(err);
        }
        console.log("delete user successfully");
        User.find(function(err, users){
          if(err){
            res.send(err);
          }
          res.json(users);
        });
      });

  });



// app.get('/users', function(req, res) {
//     User.find(function(err, users){
//       if(err){
//         res.send(err);
//       }
//       res.json(users);
//     });
// });
//
// app.get('/user/:id', function(req, res) {
//     var id = req.params.id;
//     console.log(req.params.id);
//     User.findById(id, function(err,user){
//       if(err){
//         res.send(err);
//       }
//       res.json(user);
//     });
//
// });
//
// app.post('/user', function(req, res) {
//     var user = new User();
//     user.name = req.body.name;
//     user.title = req.body.title;
//     user.sex = req.body.sex;
//     user.age = req.body.age;
//      user.save(function(err){
//        if(err){
//          console.log("aasdf");
//          res.send(err);
//        }
//        res.json({msg: "create a new user!"});
//      });
// });
//
// app.put('/user/:id', function(req, res) {
//     var id = req.params.id;
//
//     User.findById(id, function(err, user){
//       if(err){
//         res.send(err);
//       }
//       user.name = req.body.name;
//       user.title = req.body.title;
//       user.sex = req.body.sex;
//       user.age = req.body.age;
//       user.save(function(err){
//         if(err){
//            res.send(err);
//         }
//         res.json({ message: 'user updated!' });
//       });
//     });
// });
//
// app.delete('/user/:id', function(req, res) {
//     var id = req.params.id;
//     console.log(id);
//     User.remove({_id: id}, function(err){
//       if(err){
//         res.send(err);
//       }
//       res.json({ message: 'Successfully deleted' });
//     });
// });

app.listen(5000);
console.log("i am alive");
