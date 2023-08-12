const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();
const path = require('path');
const methodOverride = require('method-override');
//require('dotenv').config();
const PORT = 3000;
//const PORT = parseInt(process.env.PORT);

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Secret, revisar",
    resave: false,
    saveUninitialized: false,
}));


app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.resolve(__dirname, './public')));

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));

//Template Engine
app.set("view engine", "ejs");

// Routers
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require('./routes/mainRoutes');

app.use('/', adminRoutes);
app.use('/user', mainRoutes);



// Error 404 
//app.use((req,res,next)=>{
//    res.status(404).render('not-found')
//})
