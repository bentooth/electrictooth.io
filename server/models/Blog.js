const mongoose = require('mongoose')
, Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id           : Number
,   post_url      : String 
,   title         : String
,   body          : String
,   img           : String
,   sc_id         : String
,   yt_id         : String
,   et_stream     : String
,   et_artist     : String
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;