require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const passportU = require('./passport');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));


const uri = `mongodb+srv://chamwhy:${process.env.MONGOOSE_PASSWORD}@cluster0.e1bmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})


app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

passportU();




app.get('/', (req, res) => {
    console.log('test :', req.user);
    res.send(req.user);
})

app.get('/login', passport.authenticate('naver', { authType: 'reprompt' }));

app.get('/login/auth/naver/callback', 
    passport.authenticate('naver', { failureRedirect: '/' }),
    (req, res) => {
        console.log("user:", req.user);
        res.redirect('/');
    },
);


app.get('/send', async (req, res) => {
    const data = {
        article: {
            cafeId: "30716059",
            cclTypes: [],
            contentJson: "{\"document\":{\"version\":\"2.6.0\",\"theme\":\"default\",\"language\":\"ko-KR\",\"components\":[{\"id\":\"SE-b80b47d3-f3d7-4adb-94e4-31290b083336\",\"layout\":\"default\",\"value\":[{\"id\":\"SE-351cd857-76a3-4892-9566-bbdc05301739\",\"nodes\":[{\"id\":\"SE-46d4bbd5-22e6-42cb-9548-3ced8e612cbf\",\"value\":\"안되냐?\",\"@ctype\":\"textNode\"}],\"@ctype\":\"paragraph\"}],\"@ctype\":\"text\"}]},\"documentId\":\"\"}",
            editorVersion: 4,
            enableComment: true,
            enableCopy: false,
            enableScrap: false,
            externalOpen: false,
            from: "pc",
            headId: 1,
            menuId: 1,
            naverOpen: false,
            open: false,
            parentId: 0,
            subject: "fetch 테스트",
            tagList: [],
            useAutoSource: false,
            useCcl: false,
        }
    }
    const result = await fetch('https://openapi.naver.com/v1/cafe/30716059/menus/1/articles', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: data
    })
    console.log(result.json());
    res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
    console.log("opened");
});