const express = require("express");
const app = express();

app.use(express.json());


const video = [
    { id: 1, name: 'video1' },
    { id: 2, name: 'video2' },
    { id: 1, name: 'video3 ' }

]

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.post('/api/videos', (req, res) => {
    if (!req.body.name || req.body.length < 3) {
        res.status(400).send("Name is required and should be 3 char")
        return;
    }

    const videos = {
        id: video.length + 1,
        name: req.body.name
    };
    video.push(videos);
    res.send(videos);
});

app.get('/api/video', (req, res) => {
    res.send([video]);
});

app.get('/api/video/:id', (req, res) => {
    const storevideo = video.find(c => c.id === parseInt(req.params.id));
    if (!storevideo) res.status(404).send("The video is not found ")
    res.send(storevideo);
});


app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});


const port = process.env.PORT || 7000;

app.listen(port, () => (
    console.log(`app is running at ${port}...`)
))