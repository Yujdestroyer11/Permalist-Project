import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/random", (req, res) => {
    var rSong = songs[(Math.floor(Math.random() * songs.length))];
    res.json(rSong);
});

app.get("/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundSong = songs.find((song) => song.id === id);
    if (!foundSong) return res.status(404).json({ message: "Song not found" });
    res.json(foundSong);
});

app.get("/filter", (req, res) => {
    const type = req.query.type;
    const year = req.query.year;
    const singer = req.query.singer;

    var filter = "";
    
    if (type) {
        filter = songs.filter((song) => song.songType === type);
        res.json(filter);
    } else if (year) {
        filter = songs.filter((song) => song.year === year);
        res.json(filter);
    } else if (singer) {
        filter = songs.filter((song) => song.singer === singer);
        res.json(filter);
    } else {
        return res.status(404).json({ message: "Wrong key input" });
    }
  });

app.get("/filter/random", (req, res) => {
    const type = req.query.type;
    const year = req.query.year;

    const filter = songs.filter((song) => (song.songType === type && song.year === year));
    const rFilter = filter[(Math.floor(Math.random() * filter.length))];
    console.log(rFilter);
    res.json(rFilter);  

});

app.post("/songs", (req, res) => {
    const newSong = {
      id: (songs.length + 1),
      songTitle: req.body.title,
      songType: req.body.type,
      singer: req.body.singer,
      year: req.body.year,
    };
    songs.push(newSong);
    console.log(songs.slice(-1));
    res.json(newSong);
  });

app.patch("/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingSong = songs.find((song) => song.id === id);
    if (!existingSong) return res.status(404).json({ message: "Song not found" });

    const replacementSong = {
      id: id,
      songTitle: req.body.title || existingSong.songTitle,
      songType: req.body.type || existingSong.songType,
      singer: req.body.singer || existingSong.singer,
      year: req.body.year || existingSong.year,
    };
    const searchIndex = songs.findIndex((song) => song.id === id);
    songs[searchIndex] = replacementSong;
    console.log(songs[searchIndex]);  
    res.json(replacementSong);
  });

app.delete("/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = songs.findIndex((song) => song.id === id);
    if (searchIndex > -1) {
      songs.splice(searchIndex, 1);
      res.sendStatus(200);
    } else {
      res
        .status(404)
        .json({ error: `Song with id: ${id} not found. No Song/s were deleted.` });
    }
  });

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });

let songs = [
    
    {
        id: 1, 
        songTitle: "I want it that way",
        songType: "Pop",
        singer: "Backstreet Boys",
        year: "1990",
    }, 
    {
        id: 2, 
        songTitle: "Truth hurts",
        songType: "Pop",
        singer: "Lizzo",
        year: "2010",
    }, 
    {
        id: 3, 
        songTitle: "Party in the USA",
        songType: "Pop",
        singer: "Lizzo",
        year: "2000",
    }, 
    {
        id: 4, 
        songTitle: "I Wanna Dance with Somebody",
        songType: "Pop",
        singer: "Whitney Houston",
        year: "1980",
    }, 
    {
        id: 5, 
        songTitle: "Uptown Funk",
        songType: "Pop",
        singer: "Bruno Mars",
        year: "2010",
    }, 
    {
        id: 6, 
        songTitle: "Baby One More Time",
        songType: "Pop",
        singer: "Britney Spears",
        year: "1990",
    }, 
    {
        id: 7, 
        songTitle: "Take On Me ",
        songType: "Pop",
        singer: "A-ha",
        year: "1980",
    }, 
    {
        id: 8, 
        songTitle: "We belong together",
        songType: "Pop",
        singer: "Mariah Carey",
        year: "2000",
    }, 
    {
        id: 9, 
        songTitle: "Blinding Lights",
        songType: "Pop",
        singer: "The Weekend",
        year: "2020",
    }, 
    {
        id: 10, 
        songTitle: "Circles",
        songType: "Pop",
        singer: "Post Malone",
        year: "2020",
    }, 
    {
        id: 11, 
        songTitle: "All I Have",
        songType: "R&B",
        singer: "Jennifer Lopez",
        year: "2000", 
    }, 
    {
        id: 12, 
        songTitle: "If I Ain't Got You",
        songType: "R&B",
        singer: "Alicia Keys",
        year: "2000", 
    }, 
    {
        id: 13, 
        songTitle: "Say my Name",
        songType: "R&B",
        singer: "Destiny's Child",
        year: "1990", 
    }, 
    {
        id: 14, 
        songTitle: "Rolling in the Deep",
        songType: "R&B",
        singer: "Adele",
        year: "2010", 
    }, 	
    {
        id: 15, 
        songTitle: "Always be my baby",
        songType: "R&B",
        singer: "Mariah Carey",
        year: "1990", 
    }, 
    {
        id: 16, 
        songTitle: "Diamonds",
        songType: "R&B",
        singer: "Rihanna",
        year: "2010", 
    }, 
    {
        id: 17, 
        songTitle: "Never too much",
        songType: "R&B",
        singer: "Luther Vandross",
        year: "1980", 
    }, 
    {
        id: 18, 
        songTitle: "Sweet Love",
        songType: "R&B",
        singer: "Anita Baker",
        year: "1980", 
    }, 
    {
        id: 19, 
        songTitle: "Go crazy",
        songType: "R&B",
        singer: "Chirs Brown",
        year: "2020", 
    }, 
    {
        id: 20, 
        songTitle: "Believe It",
        songType: "R&B",
        singer: "Rihanna",
        year: "2020", 
    }, 
    {
        id: 21, 
        songTitle: "Always",
        songType: "Soft rock",
        singer: "Bon Jovi",
        year: "1990",
    }, 
    {
        id: 22, 
        songTitle: "I'll be there for you",
        songType: "Soft rock",
        singer: "Bon Jovi",
        year: "1990", 
    }, 
    {
        id: 23, 
        songTitle: "More than I can say",
        songType: "Soft rock",
        singer: "Leo Sayer",
        year: "1980", 
    }, 
    {
        id: 24, 
        songTitle: "Should we carry on",
        songType: "Soft rock",
        singer: "Airplay",
        year: "1980", 
    }, 
    {
        id: 25, 
        songTitle: "You found me",
        songType: "Soft rock",
        singer: "The Fray",
        year: "2000", 
    }, 
    {
        id: 26, 
        songTitle: "Hanging by a moment",
        songType: "Soft rock",
        singer: "Lifehouse",
        year: "2000", 
    }, 
    {
        id: 27, 
        songTitle: "Moves like jagger",
        songType: "Soft rock",
        singer: "Maroon 5",
        year: "2010", 
    }, 
    {
        id: 28, 
        songTitle: "Crossfire",
        songType: "Soft rock",
        singer: "Brandon Flowers",
        year: "2010", 
    }, 
    {
        id: 29, 
        songTitle: "Might be right",
        songType: "Soft rock",
        singer: "White Reaper",
        year: "2020", 
    }, 
    {
        id: 30, 
        songTitle: "Caution",
        songType: "Soft rock",
        singer: "The Killers",
        year: "2020", 
    }, 

    {
        id: 31, 
        songTitle: "Master Blaster",
        songType: "Soul",
        singer: "Stevie Wonder",
        year: "1980", 
    }, 
    {
        id: 32, 
        songTitle: "One in a Million You",
        songType: "Soul",
        singer: "Larry Graham",
        year: "1980", 
    }, 
    {
        id: 33, 
        songTitle: "Im your baby tonight",
        songType: "Soul",
        singer: "Whitney Houston",
        year: "1990", 
    }, 
    {
        id: 34, 
        songTitle: "Let's Chill",
        songType: "Soul",
        singer: "Guy",
        year: "1990", 
    }, 
    {
        id: 35, 
        songTitle: "He wasn't a man enough",
        songType: "Soul",
        singer: "The Heat",
        year: "2000", 
    }, 
    {
        id: 36, 
        songTitle: "By your side",
        songType: "Soul",
        singer: "Lover Rock",
        year: "2000", 
    }, 
    {
        id: 37, 
        songTitle: "Free",
        songType: "Soul",
        singer: "Cat Burns",
        year: "2010", 
    }, 
    {
        id: 38, 
        songTitle: "Worth it",
        songType: "Soul",
        singer: "Judi Jackson",
        year: "2010", 
    }, 
    {
        id: 39, 
        songTitle: "One World",
        songType: "Soul",
        singer: "Billy Ocean",
        year: "2020", 
    }, 
    {
        id: 40, 
        songTitle: "Golden",
        songType: "Soul",
        singer: "David Davis",
        year: "2020", 
    }, 
]; 


