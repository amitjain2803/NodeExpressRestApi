// server.js


/*
/api/upload	                    POST	    Upload a file to ./uploads folder. (Form-type: "Form-Data", Key-Type: uploadFile)
/api/students	                GET	        Get all the students.
/api/students	                POST	    Create a student.
/api/students/:student_id	    GET	        Get a single student.
/api/students/:student_id	    PUT	        Update a student with new info.
/api/students/:student_id	    DELETE	    Delete a student.
*/


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // Body parser for JSON parsing
var fileUpload = require('express-fileupload');
var util = require("util");
var fs = require("fs"); // this is to upload a file to the server


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});





//Upload API

router.route('/upload')

    .post(function(req, res){

        if (!req.files)
            return res.status(400).json({ message :'No files were uploaded.'});

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        var uploadFile = req.files.uploadfile;

        // Use the mv() method to place the file somewhere on your server
        uploadFile.mv(__dirname+'/uploads/'+uploadFile.name, function(err) {
            if (err)
                return res.status(500).send(err);
            res.json({ message :'File uploaded!'});
        });

    });




// API for all students.
router.route('/students')

       .post(function(req, res){
            //console.log('coming to students ',req.body.name);
           res.json({ message: 'Push to the database '+req.body.name });
            // add to database
       })
        // get all the students (accessed at GET http://localhost:8080/api/bears)

       .get(function(req, res) {
          // console.log('get from the database ')
           res.json({ message: 'get from the database ' });
       });


// API specific to a student.
router.route('/students/:student_id')

        .get(function(req,res){
            res.json({message:'get the student with id = '+req.params.student_id});
        })

        .put(function(req,res){
            res.json({message:'find and update student with id ='+req.params.student_id})
        })

        .delete(function(req,res){
            res.json({message:'find and delete student with id ='+req.params.student_id})
        });



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to my api!' });
});


// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);