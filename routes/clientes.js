var express = require('express')
var router = express.Router()

var request = require('request')

/* GET lista de clientes */
router.get('/', function (req, res) {
    res.render('index', {
        page: 'clientes',
        title: 'Listagem de Clientes'
    })
})

/* POST findByName  */
router.post('/search', function (req, res, next) {
    var query = req.body.buscar
    if (query == "" || typeof query === "undefined") {
        res.redirect('/clientes')
    } else {
        global.db.findByName('customers', query, (err, docs) => {
            if (err) { return console.log(err) }
            res.render('index', {
                page: 'clientes',
                title: 'Listagem de Clientes',
                docs
            })
        })
    }
})

/* GET new customer */
router.get('/new', function (req, res, next) {
    res.render('index', {
        page: 'new',
        title: 'Novo Cliente'
    })
})

/* POST insert customer */

router.post('http://localhost:3000/clientes', function (req, res, next) {
    var nome = req.body.nome
    var idade = parseInt(req.body.idade)
    var uf = req.body.uf
    // global.db.insertOne('customers', { nome, idade, uf }, (err, result) => {
    //     if (err) { return console.log(err) }
    //     res.redirect('/clientes')
    // })
})

/* GET edit customer  */
router.get('/edit/:id', function (req, res) {
    var id = req.params.id
    var webApiDomain = 'http://localhost:3000/clientes/' + id
    request.get(webApiDomain, (err, result) => {
        if (err) { return console.log(err) }
        res.render('index', {
            page: 'edit',
            title: 'Editar Cliente',
            doc: JSON.parse(result.body)
        })
    })
})

/* POST edit customer */
router.post('/edit/:id', function (req, res) {
    var id = req.params.id
    var nome = req.body.nome
    var idade = parseInt(req.body.idade)
    var uf = req.body.uf
    const webApiDomain = 'http://localhost:3000/clientes/' + id
    request.patch(webApiDomain, {json: {'nome': nome,'idade':idade,'uf':uf}}, (err, response, body) => {
        if (err) { return console.log(err) }
        res.render('index', {
            page: 'clientes',
            title: 'Listagem de Clientes'
        })
    })
})

/* GET deleteOne */
router.get('/delete/:id', function (req, res) {
    var id = req.params.id
    global.db.deleteOne('customers', id, (err, result) => {
        if (err) { return console.log(err) }
        res.redirect('/clientes')
    })
})

module.exports = router