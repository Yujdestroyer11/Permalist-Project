import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;
const API_URL = "http://localhost:5000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/random", async (req, res) => {    
    try {
        const response = await axios.get(API_URL + "/random");    
        const result = response.data;
        res.render("index.ejs", { rSong: result });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: "No song that match your criteria.",
        });
      }
});  

app.post("/submit", async (req, res) => {
    try {
      const bType = req.body.type;
      const bYear = req.body.year;
      const response = await axios.get("http://localhost:5000/filter/random", {
        params: {
          type: bType,
          year: bYear,
        },
      });    
      const result = response.data;
      console.log(result);
      res.render("index.ejs", { data: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "No song that match your criteria.",
      });
    }
});  
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 