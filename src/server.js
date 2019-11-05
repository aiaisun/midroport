const express = require('express');
const url = require('url');
const bodyParser = require('body-parser');
var app = express();
const db = require(__dirname + '/db-connect');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
    res.render('home')
});

app.get('/exhibition', function (req, res) {
    const output = {
        pageTitle: 'Exhibition',
        data:"",
        totalPages:"",
    };
    res.render('exhibition', output)
});

// app.get('/expo/:page?', (req, res) => {
//     const itemPerPage = 5;
//     const output = {
//         title: "Exhibition",
//         itemPerPage: itemPerPage,
//     };
//     let page = req.params.page || 1;
//     output.page = page;
//     output.pageHead = 'exhibition';

//     let sqlExhibitionNum = "SELECT COUNT(1) num FROM exhibition";
//     let sqlExhibition = `SELECT * FROM exhibition LIMIT ${(page - 1) * itemPerPage}, ${itemPerPage}`;

//     db.query(sqlExhibitionNum, (error, results) => {

//         output.totalNum = results[0].num;
//         output.totalPages = Math.ceil(output.totalNum / itemPerPage);

//         if( page < 1 || page > output.totalPages) {
//             return res.redirect('/expo');
//         }

//         db.query(sqlExhibition, (error, results) => {
//             output.data = results;
            
//             // res.json(output);
//             res.render('exhibition', output)
//         });
//     });
// })

app.get('/expo/:page?/:place?', (req, res) => {
    console.log("hi")
    const itemPerPage = 5;
    const output = {
        title: "Exhibition",
        itemPerPage: itemPerPage,
    };
    let page = req.params.page || 1;
    let place = req.params.place;
    console.log(req.params.page)
    console.log(place)
    output.page = page;
    output.pageHead = 'exhibition';

    let sqlExhibitionNum = "SELECT COUNT(1) num FROM exhibition";
    let sqlExhibition = `SELECT * FROM exhibition LIMIT ${(page - 1) * itemPerPage}, ${itemPerPage}`;

    let sqlExhibitionNumOfHS = "SELECT COUNT(1) num FROM exhibition where place=`華山`";
    let sqlExhibitionOfHS = `SELECT * FROM exhibition where place='華山' LIMIT ${(page - 1) * itemPerPage}, ${itemPerPage}`;
    
    if(true) {
        console.log("yes")
        db.query(sqlExhibitionNumOfHS, (error, results) => {

            output.totalNum = results[0].num;
            output.totalPages = Math.ceil(output.totalNum / itemPerPage);
    
            if( page < 1 || page > output.totalPages) {
                return res.redirect('/expo');
            }
    
            db.query(sqlExhibitionOfHS, (error, results) => {
                output.data = results;
                
                // res.json(output);
                res.render('exhibition', output)
            });
        });


    }else{

    
    db.query(sqlExhibitionNum, (error, results) => {

        output.totalNum = results[0].num;
        output.totalPages = Math.ceil(output.totalNum / itemPerPage);

        if( page < 1 || page > output.totalPages) {
            return res.redirect('/expo');
        }

        db.query(sqlExhibition, (error, results) => {
            output.data = results;
            
            // res.json(output);
            res.render('exhibition', output)
        });
    });
    }
})

app.get('/expo/1?place=huashan', (req, res)=>{
    let sqlHS= "SELECT * FROM exhibition where place=`華山`";
    db.query(sqlHS,(error,results)=>{
        res.json(results);
    }) 

});

app.listen(3000, function () {
    console.log('server start');
});





