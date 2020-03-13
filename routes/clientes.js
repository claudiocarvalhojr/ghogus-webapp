var express = require('express')
var router = express.Router()

var request = require('request')

var webApiDomain = ''

if (process.env.NODE_ENV !== 'production') {
    webApiDomain = 'http://api.ghogus.com/clientes/'
else 
    webApiDomain = 'http://localhost:3000/clientes/'

/* GET lista de clientes */
router.get('/', function (req, res) {

    console.log('Environment: ' + process.env.NODE_ENV)

    res.render('index', {
        page: 'clientes',
        title: 'Listagem de Clientes'
    })
})

/* POST findByName  */ // REVER!!!
// router.post('/search', function (req, res, next) {
//     var query = req.body.buscar
//     if (query == "" || typeof query === "undefined") {
//         res.redirect('/clientes')
//     } else {
//         global.db.findByName('customers', query, (err, docs) => {
//             if (err) { return console.log(err) }
//             res.render('index', {
//                 page: 'clientes',
//                 title: 'Listagem de Clientes',
//                 docs
//             })
//         })
//     }
// })

/* GET new customer */
router.get('/new', function (req, res, next) {

    console.log('Environment: ' + process.env.NODE_ENV)

    res.render('index', {
        page: 'new',
        title: 'Novo Cliente'
    })
})

/* POST insert customer */
router.post('/new', function (req, res, next) {
    var nome = req.body.nome
    var idade = parseInt(req.body.idade)
    var uf = req.body.uf
    request.post(webApiDomain, { json: { 'nome': nome, 'idade': idade, 'uf': uf } }, (err, response, body) => {
        if (err) { return console.log(err) }
        res.render('index', {
            page: 'clientes',
            title: 'Listagem de Clientes'
        })
    })
})

/* GET edit customer  */
router.get('/edit/:id', function (req, res) {
    var id = req.params.id
    request.get(webApiDomain + id, (err, result) => {
        if (err) { return console.log(err) }
        res.render('index', {
            page: 'edit',
            title: 'Editar Cliente',
            doc: JSON.parse(result.body)
        })
    })
})

/* POST patch customer */
router.post('/edit/:id', function (req, res) {
    var id = req.params.id
    var nome = req.body.nome
    var idade = parseInt(req.body.idade)
    var uf = req.body.uf
    request.patch(webApiDomain + id, { json: { 'nome': nome, 'idade': idade, 'uf': uf } }, (err, response, body) => {
        if (err) { return console.log(err) }
        res.render('index', {
            page: 'clientes',
            title: 'Listagem de Clientes'
        })
    })
})

/* GET deleteOne */ // OCORRE NO SCRIPTS.JS
// router.get('/delete/:id', function (req, res) {
//     console.log('aqui...')
//     var id = req.params.id
//     request.delete(webApiDomain + id, (err, result) => {
//         if (err) { return console.log(err) }
//         res.render('index', {
//             page: 'clientes',
//             title: 'Listagem de Clientes'
//         })
//     })
// })

module.exports = router