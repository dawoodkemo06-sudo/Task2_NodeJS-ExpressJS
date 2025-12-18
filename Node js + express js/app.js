const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))
const User = require('./models/Coustomerschema');
var moment = require('moment'); 
var methodOverride = require('method-override')
app.use(methodOverride('_method'));


//Auto refresh
const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});




const Mydata = require('./models/Coustomerschema');
const { register } = require('module');
app.set('view engine', 'ejs');
app.use(express.static('public'));




app.get('/', (req, res) => {
  User.find()
  .then((result) => {
    console.log(result);
    res.render('index', { arr: result , moment: moment});
  })
  .catch((err) => {
    console.log(err);
  })
})



app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res) => {
    User.findById(req.params.id)
  .then((result) => {
    res.render("user/edit",{obj: result , moment: moment});  })
  .catch((err) => {
    console.log(err);
  })

})



app.get('/view/:id', (req, res) => {
  User.findById(req.params.id)
  .then((result) => {
    res.render("user/view",{obj: result , moment: moment});  })
  .catch((err) => {
    console.log(err);
  })
  
})


app.post("/user/add.html", (req, res) => {
  console.log(req.body)

  User
  .create(req.body)
  .then(() => {
  res.redirect("/")
  })
  .catch((err) => {
    console.log(err);
  }
  )
})


// Delete user
app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
});

//Update user
app.put("/edit/:id", (req, res) => {
console.log(req.body);
User.findByIdAndUpdate(req.params.id, req.body)
.then(() => {
  res.redirect("/");
})
.catch((err) => {
  console.log(err);
  });
});


mongoose.connect(
  'mongodb+srv://kareem:6EBrmur2aa9HlTkP@cluster0.erjzenw.mongodb.net/alldata?retryWrites=true&w=majority'
)
.then(() => {
  console.log("MongoDB Connected Successfully!");
  app.listen(port, () => console.log(`http://localhost:${port}`));
})
.catch(err => console.log("MongoDB connection error:", err));


