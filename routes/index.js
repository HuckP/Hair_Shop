const express = require('express');
const router = express.Router();
const Youtube = require('youtube-node');
const youtube = new Youtube();

let man = '남자 머리';
let woman = '여자 머리';
let limit = 10;
let video_url = [10];
let video_title = [10];
let video_id = [10];

youtube.setKey(process.env.YOUTUBE_API_KEY);

youtube.addParam('order', 'viewCount');
youtube.addParam('type', 'video');

function ysearch(word, limit) {
    if(word == 'woman') {
        word = woman;
    } else {
        word = man;
    }
    youtube.search(word, limit, (err, result) => {
        if (err) {
            console.error(err);
        }
    
        let items = result["items"];
        for (let i in items) {
            let it = items[i];
            video_title[i] = it["snippet"]["title"];
            video_id[i] = it["id"]["videoId"];
            video_url[i] = "https://www.youtube.com/watch?v=" + video_id;
        }
    })
}


router.get('/', (req, res) => {
    res.render('Main');
});

router.get('/info_site', (req, res) => {
    res.render('info_site');
});

router.get('/info_team', (req, res) => {
    res.render('info_team');
});

router.get('/search', (req, res) => {
    res.render('map');
    
});

router.get('/man_youtube', (req, res) => {
    ysearch('man', limit);
    res.render('video', { "url": video_url, "title": video_title, "video_id": video_id });
});

router.get('/woman_youtube', (req, res) => {
    ysearch('woman', limit);
    res.render('video', { "url": video_url, "title": video_title, "video_id": video_id });
});

router.get('/man_hair', (req, res) => {
    res.render('Man_hair');
});

router.get('/woman_hair', (req, res) => {
    res.render('Woman_hair');
});

module.exports = router;