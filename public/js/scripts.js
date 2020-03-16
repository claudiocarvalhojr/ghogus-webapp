const success = 'success'
const info = 'info'
const danger = 'danger'

var webApiDomain = ''
var hostName = location.hostname;

if (hostName === 'localhost') {
    webApiDomain = 'http://localhost:3000/clientes/'
} else {
    webApiDomain = 'http://api.ghogus.com/clientes/'
}

$(document).ready(function () {
    var register_id = '';
    loadTable()
    $('.alert').hide()
    function loadTable() {
        const tbody = $('table > tbody')
        tbody.empty()
        let count = 0;
        $.getJSON(webApiDomain, function (data) {
            data.forEach(item => {
                count++
                let linha = '<tr id="' + item._id + '" title="' + item.nome + '"><td id="colId">' + count + '</td><td id="colNome">' + item.nome + '</td><td>' + item.idade + '</td><td>' + item.uf + '</td><td><a href="/clientes/edit/' + item._id + '" type="button" id="btnEdit" class="btn btn-md btn-info" title="Editar"><span class="glyphicon glyphicon-edit"></span></a></td><td><button type="button" id="btnRemove" class="btn btn-md btn-danger" data-id="' + item._id + '" data-toggle="modal" data-target="#modalConfirm" title="Excluir"><span class="glyphicon glyphicon-remove"></span></button></td></tr>'
                tbody.append(linha)
            })
        })
    }
    function deleteCustomer(id, callback) {
        $.ajax({
            url: webApiDomain + id,
            method: 'DELETE',
            success: function (result) {
                alertMessage('#msgDelete')
                loadTable()
            }
        })
    }
    function alertMessage(id, message) {
        $(id).html(message)
        // $(id).fadeIn( 1000 ).delay( 1000 ).fadeOut(1000)
        $(id).slideDown( 1000 ).delay( 1000 ).slideUp(1000)
        // $(id).slideToggle( 1000 ).delay( 1000 ).slideToggle( 1000 )
    }
    function alertMessage(id) {
        // $(id).fadeIn( 1000 ).delay( 1000 ).fadeOut(1000)
        $(id).slideDown( 1000 ).delay( 1000 ).slideUp(1000)
        // $(id).slideToggle( 1000 ).delay( 1000 ).slideToggle( 1000 )
    }
    $('body').on('click', 'table > tbody tr td button', function () {
        register_id = $(this).attr("data-id")
        let nome = $('table > tbody tr#' + register_id).find('#colNome').text()
        let cod = $('table > tbody tr#' + register_id).find('#colId').text()
        $('.modal-body').text('Excluir o cliente: ' + cod + ' - ' + nome + '?')
    })
    $('#btnClear').on('click', function() {
        clearForm()
    })
    function clearForm() {
        $('#tfNome').val('')
        $('#tfIdade').val('')
        $('#cbUf').val('RS')
    }
    var modalConfirm = function (callback) {
        $('#btnModalCancel').on('click', function () {
            callback(false)
            $('#modalConfirm').modal('hide')
        })
        $('#btnModalConfirm').on('click', function () {
            callback(true)
            $('#modalConfirm').modal('hide')
        })
    }
    modalConfirm(function (confirm) {
        if (confirm) {
            deleteCustomer(register_id, function () {
                $('table > tbody tr#' + register_id).remove()
            })
        }
    })
})
