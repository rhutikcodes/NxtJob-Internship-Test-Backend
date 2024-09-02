import express from 'express'





const app = express()



const PORT = 3000 || process.env.PORT


app.get("/",(req,res)=>{
    return res.send("Hi EveryOne")
})

//-----Middle ware ----
import routes from './Routes/index.js'
import bodyParser from 'body-parser'
app.use(express.json());
app.use(routes);




app.listen(PORT, ()=>
{
    console.log('Server Started at port 3000')
})