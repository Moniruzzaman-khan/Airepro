import express from "express"
import userRoutes from "./routes/api.js"
import cors from "cors"
import cron from "node-cron"
import axios from "axios"

const app = express()

const tempDB = {};


async  function getSalesData(lat,lon){
    try{
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`;
        const response = await axios.get(url);
        const data = response.data;
        tempDB[new Date().toUTCString()] = data;
    } catch (e) {
        console.log(e);
    }
}


cron.schedule("* * * * * *",async () => {
    console.log("Running cron")
    await getSalesData(40.7128, -74.006);
})

app.get('/sales',(req,res) => {
    return res.json(tempDB)
})



app.use(express.json())
app.use(cors())

app.use("/", userRoutes)

app.listen(5000,()=>{
    console.log("App is running at port: 5000")
})
