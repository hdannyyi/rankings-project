const express = require('express'),
    router = express.Router(),
    RankingsModel = require('../models/rankings');

//GET home page
router.get('/', async (req, res, next) => {
    const topics = await RankingsModel.getAllTopics();
    const topicsStatus = await RankingsModel.getAllClassStatus();

    res.render('template', {
        locals: {
            title: 'Class Rankings',
            topics: topics,
            topicsStatus: topicsStatus
        },
        partials: {
            partial: 'partial-index'
        }
    });
});

//POST home page
router.post('/update', (req, res) => {
    console.log(req.body);

    for (let key in req.body) {
        RankingsModel.update(key, req.body[key]);
    }

    res.status(200).redirect('/');
});

module.exports = router;
