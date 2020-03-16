var express = require('express')
var router = express.Router()
var request = require('request')
// var bodyParser = require('body-parser')
// var app = express()
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: true }));
var webApiDomain = ''
if (process.env.NODE_ENV === 'production') {
    webApiDomain = 'http://api.ghogus.com/clientes/'
} else {
    webApiDomain = 'http://localhost:3000/clientes/'
}

/* GET lista de clientes */
router.route('/').get((req, res) => {
    res.render('index', {
        page: 'client/clientes',
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
router.route('/new').get((req, res, next) => {
    res.render('index', {
        page: 'client/cliente',
        action: 'new',
        title: 'Cadastrar Cliente',
        subtitle: 'Preencha os dados abaixo para salvar o cliente.',
        doc: {}
    })
})

/* POST insert customer */
router.post('/new', (req, res, next) => {
    request.post(webApiDomain, {
        json: {
            'nome': req.body.nome,
            'idade': parseInt(req.body.idade),
            'uf': req.body.uf
        }
    }, (err, response, body) => {
        if (err) { return console.log(err) }
        res.redirect('/clientes')
    })
})

/* GET edit customer  */
router.get('/edit/:id', (req, res) => {
    request.get(webApiDomain + req.params.id, (err, result) => {
        if (err) { return console.log(err) }
        res.render('index', {
            page: 'client/cliente',
            action: 'edit',
            title: 'Editar Cliente',
            subtitle: 'Altere os dados abaixo para editar o cliente.',
            doc: JSON.parse(result.body)
        })
    })
})

/* POST patch customer */
router.post('/edit/:id', (req, res) => {
    request.patch(webApiDomain + req.params.id, {
        json: {
            'nome': req.body.nome,
            'idade': parseInt(req.body.idade),
            'uf': req.body.uf
        }
    }, (err, response, body) => {
        if (err) { return console.log(err) }
        res.redirect('/clientes')
    })
})

/* GET deleteOne */ // OCORRE NO SCRIPTS.JS
// router.get('/delete/:id', function (req, res) {
//     console.log('aqui...')
//     var id = req.params.id
//     request.delete(webApiDomain + id, (err, result) => {
//         if (err) { return console.log(err) }
//         res.render('index', {
//         page: 'client/clientes',
//         title: 'Listagem de Clientes'
//         })
//     })
// })

module.exports = router