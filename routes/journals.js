const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const {GridFSBucket} = require('mongo');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const bcrypt = require('bcryptjs');


// DB Config
const db = require('../config/keys').MongoURI;
mongoose.set('useFindAndModify', false);


//journalsItem model
const model = require('../models/Item');
const JournalsItem = model.journalsItem;
const Item = JournalsItem;

require("./get/generic")({router:router,Item:Item,renderedPage:'journals'});

require("./post/generic")({router:router,Item:Item});

require("./post/delete")({router:router,Item:Item});

require("./post/edit")({router:router,Item:Item});


module.exports = router;
