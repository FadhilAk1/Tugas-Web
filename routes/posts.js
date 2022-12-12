var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM data ORDER BY id asc', function (err, rows) {
        if (err) {
            res.render('data', {
                data: ''
            });
        } else {
            res.render('crud/index', {
                data: rows // <-- data posts
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('crud/create', {
        nama: '',
        nim: '',
        jurusan: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    let{nama, nim, jurusan} = req.body;
    let errors  = false;

    if(nama.length === 0 || nim.length === 0 || jurusan.length === 0) {
        errors = true;
        res.render('crud/create', {
            nama: nama,
            nim: nim,
            jurusan: jurusan
        })
    }

    // if no error
    if(!errors) {
        let formData = {
            nama: nama,
            nim: nim,
            jurusan: jurusan
        }
        
        connection.query('INSERT INTO data SET ?', formData, function(err, result) {
            if (err) {
                console.log('error')
                 
                res.render('crud/create', {
                    nama: formData.nama,
                    nim: formData.nim,
                    jurusan: formData.jurusan                  
                })
            } else {                
                res.redirect('/posts');
            }
        })
    }

})

/**
 * EDIT POST
 */
 router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM data WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            res.redirect('/posts')
        }
        else {
            res.render('crud/edit', {
                id: rows[0].id,
                nama: rows[0].nama,
                nim: rows[0].nim,
                jurusan: rows[0].jurusan
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.post('/update/:id', function(req, res, next) {
    let id = req.params.id;
    let{nama, nim, jurusan} = req.body;
    let errors  = false;

    if(nama.length === 0 || nim.length === 0 || jurusan.length === 0) {
        errors = true;
        res.render('crud/edit', {
            id: req.params.id,
            nama: nama,
            nim: nim,
            jurusan: jurusan
        })
    }

    if( !errors ) {   
 
        let formData = {
            nama: nama,
            nim: nim,
            jurusan: jurusan
        }

        connection.query('UPDATE data SET ? WHERE id = ' + id, formData, function(err, result) {
            if (err) {
                res.render('crud/edit', {
                    id: req.params.id,
                    nama: formData.nama,
                    nim: formData.nim,
                    jurusan: formData.jurusan  
                })
            } else {

                res.redirect('/posts');
            }
        })
    }
})

/**
 * DELETE POST
 */
 router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM data WHERE id = ' + id, function(err, result) {
        if (err) {
            res.redirect('/posts')
        } else {
            res.redirect('/posts')
        }
    })
})


module.exports = router;