const success = 'success'
const info = 'info'
const danger = 'danger'

$(document).ready(function () {
    const webApiDomain = 'http://api.ghogus.com/clientes/'
    // const webApiDomain = 'http://localhost:3000/clientes/'
    var register_id = '';
    loadTable()
    $('.alert').hide()
    // $('#btnList,#btnRegister').click(function () {
    //     $('#divListagem,#divCadastro').toggle();
    // })
    // $('form').submit(function (event) {
    //     event.preventDefault()
    //     if ($('input[name="nome"]').val() === '' || $('input[name="idade"]').val() === '') {
    //         alertMessage('#msgErrorSave')
    //         return
    //     }
    //     const data = $(this).serializeArray()
    //     updateDatabase(data, loadTable)
    //     $('#divListagem,#divCadastro').toggle()
    // })
    // function updateDatabase(data, callback) {
    //     const json = {}
    //     data.forEach(item => json[item['name']] = item['value'])
    //     $.post(webApiDomain + '/clientes', json, function (data) {
    //         alertMessage('#msgSave')
    //         loadTable()
    //     })
    // }
    function loadTable() {
        const tbody = $('table > tbody')
        tbody.empty()
        let count = 0;
        $.getJSON(webApiDomain, function (data) {
            data.forEach(item => {
                count++
                let linha = '<tr id="' + item._id + '" title="' + item.nome + '"><td id="colId">' + count + '</td><td id="colNome">' + item.nome + '</td><td>' + item.idade + '</td><td>' + item.uf + '</td><td><a href="/clientes/edit/' + item._id + '" type="button" id="btnEdit" class="btn btn-md btn-info"><span class="glyphicon glyphicon-edit"></span></a></td><td><button type="button" id="btnRemove" class="btn btn-md btn-danger" data-id="' + item._id + '" data-toggle="modal" data-target="#modalConfirm"><span class="glyphicon glyphicon-remove"></span></button></td></tr>'
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
        $(id).show(1000, function () {
            setTimeout(function () { $(id).hide(1000) }, 1000)
        })
    }
    function alertMessage(id) {
        $(id).show(1000, function () {
            setTimeout(function () { $(id).hide(1000) }, 1000)
        })
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
