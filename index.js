
import express from "express"
import fetch from "node-fetch"

const app = express();

const port = process.env.PORT|| 3001

app.use(express.json());

app.get("/", async (req, res)=>{
    res.json("add date after /   formated as '2022-09-22' ")
})

app.get("/date/:date", async (req, res)=>{
    const dateThis = req.params.date;
    const response = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date="+ dateThis +"&end_date="+ dateThis +"&api_key=kEUozmDTguvnQPEtSsYX6J0zXWJjQ5tKapgRwbct")
    const body = await response.json();
    const newID = body.near_earth_objects[dateThis][1].id;

    // console.log(body)
    res.json(newID);
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

