import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv"

const app = express();
const port = 4000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function checkItems() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  
  items = result.rows;
  console.log(items);

  return items;
}

app.get("/", async (req, res) => {

  const items = await checkItems();  
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysOfWeek = new Date();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthOfYear = new Date();

  const dayOfMonth = new Date();
  
  let today = days[daysOfWeek.getDay()] + ", " + months[monthOfYear.getMonth()] + " " + dayOfMonth.getDate();


  res.render("index.ejs", {
    listTitle: today,
    listItems: items,
  });
});

app.post("/add", async (req, res) => {

  const item = req.body.newItem;

  await db.query("INSERT INTO items (title) VALUES ($1)", [
    item,
  ]);
  
  res.redirect("/");
});

app.post("/edit", async(req, res) => {

  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);

  res.redirect("/");

});

app.post("/delete", async (req, res) => {

  const input = req.body.deleteItemId;
  console.log(input);

  await db.query("DELETE FROM items WHERE id = ($1)", [input]);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
