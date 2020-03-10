var express = require('express');
var router = express.Router();

/* GET home c/ findAll */
router.get('/', function (req, res) {
    global.db.findAll('customers', (err, docs) => {
        if (err) { return console.log(err); }
        res.render('index', {
            page: 'clientes',
            title: 'Listagem de Clientes',
            docs
        });
    })
})

/* POST findByName  */
router.post('/search', function (req, res, next) {
    var query = req.body.buscar;
    if (query == "" || typeof query === "undefined") {
        res.redirect('/clientes');
    } else {
        global.db.findByName('customers', query, (err, docs) => {
            if (err) { return console.log(err); }
            res.render('index', {
                page: 'clientes',
                title: 'Listagem de Clientes',
                docs
            });
        })
    }
});

/* GET new  */
router.get('/new', function (req, res, next) {
    res.render('index', {
        page: 'new',
        title: 'Novo Cliente'
    });
});

/* POST insert  */
router.post('/new', function (req, res, next) {
    var nome = req.body.nome;
    var idade = parseInt(req.body.idade);
    var uf = req.body.uf;
    global.db.insertOne('customers', { nome, idade, uf }, (err, result) => {
        if (err) { return console.log(err); }
        res.redirect('/clientes');
    })
});

/* GET findById  */
router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    global.db.findById('customers', id, (err, docs) => {
        if (err) { return console.log(err); }
        res.render('index', {
            page: 'edit',
            title: 'Editar Cliente',
            doc: docs[0]
        });
    })
});

/* POST updateOne */
router.post('/edit/:id', function (req, res) {
    var id = req.params.id;
    var nome = req.body.nome;
    var idade = parseInt(req.body.idade);
    var uf = req.body.uf;
    global.db.updateOne('customers', id, { nome, idade, uf }, (err, result) => {
        if (err) { return console.log(err); }
        res.redirect('/clientes');
    });
});

/* GET deleteOne */
router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    global.db.deleteOne('customers', id, (err, result) => {
        if (err) { return console.log(err); }
        res.redirect('/clientes');
    });
});

module.exports = router;