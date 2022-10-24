const express = require('express');
const jsonwebtoken = require('jsonwebtoken')
const secret = require('./secret.json')

const router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("./reactjsassignment-5ba49-firebase-adminsdk-a5sb5-6f9fd07d8b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reactjsassignment-5ba49-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database()
const ref = db.ref("/")


const getDatabase = (res) => {
    return ref.once('value', (data) => {
         data
     })
 }



//GET all
router.get('/account',  async (req,res) => {
    const result = await getDatabase();
    res.send(result.val().Users)
})

//Sign up
router.post('/account/signup', async (req,res) => {
    const accountRef = ref.child('Users');
    accountRef.push(req.body);

    const newResult = await getDatabase(res);
    res.send("Success");

    console.log(newResult.val())
})

//SignIn
router.post('/account/signin', async (req,res) => {
    console.log("TYPE OF SECRET", typeof secret)
    //Firebase realtime database
    const data = await getDatabase();

    const accountList = Object.values(data.val().Users);
    const body = req.body

    console.log("user",body)

    const result = accountList.some(
        (item) => item.username == body.username && item.password == body.password
    )
    // const result1 = accountList.filter((item) => item.username == body.username && item.password == body.password)

    // res.send(result1)


    console.log(result)
    result 
        ? res.status(200).json({
            token: jsonwebtoken.sign({username: body.username}, secret.value) 
        }) 
        : res.status(401).json({
            result: "FAILED"
        })




})

router.get('/products',  async (req,res) => {
    const result = await getDatabase();
    res.send(result.val())
})



module.exports = router;