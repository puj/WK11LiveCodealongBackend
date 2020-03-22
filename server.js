import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/wk11codealong"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const Message = mongoose.model('Message', {
  text:String,
  created:{
    type:Date,
    default:Date.now
  }
});

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/messages', async(req, res) => {
  try{
    const messages = await Message.find();
    res.status(200).json(messages);
  }catch(err){
    res.status(400).send(err);
  }
})

app.post('/messages', async (req, res) => {
  try{
    const newMessage= await new Message(req.body).save();
    res.status(200).json(newMessage);
  }catch(err){
    res.status(400).send(err);
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
