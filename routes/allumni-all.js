const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const bcrypt = require('bcryptjs');
const axios = require('axios');
var fs = require('fs');

// DB Config
const db = require('../config/keys').MongoURI;
const renderedPage = 'allumni-all';

mongoose.set('useFindAndModify', false);
const { connect } = require('http2');
const { response } = require('express');
const { Console } = require('console');

const PORT = process.env.PORT || 5000;

router.get('/', (req, res) => {
    
    const url1 = `http://localhost:${PORT}/dashboard/allumni-research-scholars/getCardData`;
    const url2 = `http://localhost:${PORT}/dashboard/allumni-internship-students/getCardData`;
    const url3 = `http://localhost:${PORT}/dashboard/allumni-project-fellow/getCardData`;
    const url4 = `http://localhost:${PORT}/dashboard/allumni-visiting-faculty/getCardData`;
    const url5 = `http://localhost:${PORT}/dashboard/allumni-masters-students/getCardData`;
    const url6 = `http://localhost:${PORT}/dashboard/allumni-bachelor-students/getCardData`;

    const request1 = axios.get(url1);
    const request2 = axios.get(url2);
    const request3 = axios.get(url3);
    const request4 = axios.get(url4);
    const request5 = axios.get(url5);
    const request6 = axios.get(url6);
    let filesArray = [];

    axios.all([request1,request2,request3,request4,request5,request6]).then(axios.spread((...responses) =>{
            
        responses.forEach(response => {
            if(Array.isArray(response.data)){
                response.data.forEach(obj =>{
                    let imageURL = encodeURI(`${response.config.url.replace('getCardData','getCardImages')}/images/${obj.image}`);
                    obj = {...obj,imageURL};                    
                    filesArray.push(obj);
                })
            }
        })

        if(filesArray.length == 0){
            // return res.status(404).json({
            //     err: 'No images found'
            //   });
            res.render(renderedPage,{
                files: false
            })
        }

        res.render(renderedPage,{
            files: filesArray
        })
        // res.redirect('back')
    
    })).catch(err =>{
        console.log(err)
    })
    
 })

module.exports = router;
