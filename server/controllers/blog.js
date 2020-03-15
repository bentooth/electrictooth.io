const Blog = require('../models/Blog');
const fs = require('fs')

function getBlog(req, res) {
    var perPage = 5;
    var page = req.params.page || 1

    return Blog
        .find()
        .sort({ _id: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, posts) {

            Blog.count().exec(function (err, count) {
                if (err) return next(err)
                res.json({
                    posts: posts,
                    current: Number(page),
                    pages: Math.ceil(count / perPage)
                })
            })
        });
}

function findBlogPost(req, res) {

    const query = req.params.post_url

    return Blog.find({ post_url: query }, (err, post) => {

        if (err || post.length < 1) {
            console.log('Song id not found')
            res.json({ err: 'Song id not found' })
        }

        res.json(post[0])
    });
}

function submitBlog(req, res) {
    const payload = req.body;

    Blog.create(payload, (err) => {
        if (err) console.log('something went wrong')
    });

    res.end();
}

function streamAudio(req, res) {
    let music = `./uploads/${req.params.title}`
    let stat = fs.statSync(music);
    range = req.headers.range;
    let readStream;

    res.status(206)

    if (range !== undefined) {
        let parts = range.replace(/bytes=/, '').split('-');

        let partial_start = parts[0];
        let partial_end = parts[1];

        if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
            return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
        }

        let start = parseInt(partial_start, 10);
        let end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
        let content_length = (end - start) + 1;

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': content_length,
            'Content-Range': 'bytes ' + start + '-' + end + '/' + stat.size,
        })

        readStream = fs.createReadStream(music, { start: start, end: end });

    } else {
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size,
        })

        readStream = fs.createReadStream(music);
    }

    readStream.on('open', function () {

        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function (err) {
        res.end(err);
    });

}

module.exports = {
    getBlog,
    findBlogPost,
    submitBlog,
    streamAudio
}