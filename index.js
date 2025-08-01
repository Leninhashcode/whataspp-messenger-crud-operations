const express = require('express');

const mongoose = require('mongoose')
const path = require('path')
const app = express();
const chat = require('./data/chat');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
const port = 3000;

main().then(()=> {
    console.log("sever connected")
}).catch((err)=> {
    console.log(err)

})


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}
app.get('/',async(req,res)=> {
    let chats = await chat.find();

    res.render('index', {chats})
})
app.get('/post/:id/edit',async(req,res)=> {
    let {id}=req.params
    let newchat =await chat.findById(id)
    res.render('edit',{chat:newchat})
})
app.get('/new',(req,res)=> {
    res.render('newchat')
})
app.post('/edit/:id/',async(req,res)=> {
    let {id} =  req.params
    let message =req.body.message
    let updatechat = await chat.findByIdAndUpdate(id,{message:message},{new:true})
    console.log(updatechat)
    res.redirect('/')
    
})
app.post('/delete/:id',async(req,res)=> {
    let {id} = req.params

    let updatechat = await chat.findByIdAndDelete(id)
    
    res.redirect('/')
})
app.post('/new',(req,res)=> {
    let {from, to, message }=req.body
    let newchat1 = new chat ({
        from :from,
        to: to,
        message:message,
        
    });
    
    

  newchat1.save().then((data)=> {
    console.log(data)
    res.redirect('/')
  }).catch((err)=>err)

})
app.listen(port,()=> {
    console.log("running on port : 3000")
})

