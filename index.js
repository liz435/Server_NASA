
import express from "express"
import fetch from "node-fetch"

const app = express();

const port = process.env.PORT|| 3001

app.use(express.json());

app.get("/", async (req, res)=>{
    res.json("add date after/    formated as '2022-09-22' ex. 127.0.0.1/2022-09-22    The service give you information about an astroid on the date you searched")
})

app.get("/:date", async (req, res)=>{
    const dateThis = req.params.date;
    const response = await fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date="+ dateThis +"&end_date="+ dateThis +"&api_key=kEUozmDTguvnQPEtSsYX6J0zXWJjQ5tKapgRwbct")
    const body = await response.json();
    const newID = body.near_earth_objects[dateThis][1].id;
    const theName = body.near_earth_objects[dateThis][1].name;
    const diameter = body.near_earth_objects[dateThis][1].estimated_diameter.meters.estimated_diameter_min;
    const missDistance = body.near_earth_objects[dateThis][1].miss_distance;
    // res.json(newID);
    const alert = body.near_earth_objects[dateThis][1].is_potentially_hazardous_asteroid;
    res.json({"name": theName,
        "esimated diameter" : diameter,
            "id": newID,
            "alert":alert,
            "miss distance":missDistance

})
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

