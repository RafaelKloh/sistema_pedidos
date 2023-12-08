const { request } = require("express")
const session = require("express-session")
const usuarios = require("../rotas/usuarios")

module.exports.cadastrar = function (app, req, res) {
    const dados = req.body

    req.assert('nome', 'Voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'Voce deve preencher o campo email').notEmpty()
    req.assert('senha', 'Voce deve preencher o campo senha').notEmpty()
    req.assert('senha', 'O campo senha deve ter no minimo 6 caracteres').len(6)

    let erros = []
    erros = req.validationErrors() ? req.validationErrors() : [];

    if (dados.senha != dados.confirmarSenha) {
        erros.push({ msg: 'as senhas não conferem' })
    }

    else if (erros == []) {
        erros = false
    }

    if (erros.length > 0) {
        res.render('usuarios/cadastro', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuarios(conexao)
    modelUsuario.getUsuarioByEmail(dados.email, function (error, result) {
        if (result.length > 0) {

            let erros = [{ msg: 'Este e-mail já está em uso' }]
            res.render('usuarios/cadastro', { erros: erros, usuario: dados })
        }
        else {
            modelUsuario.cadastroUsuarios(dados, function (error, result) {
                res.redirect('/')
            })
        }
    })
}

module.exports.renderCadastro = function (app, req, res) {
    res.render('usuarios/cadastro', { erros: {}, usuario: {} })
}

module.exports.login = function (app, req, res) {

    res.render('usuarios/login', { erros: {}, usuario: {} })
}
module.exports.validar = function (app, req, res) {
    const dados = req.body
    req.assert('email', 'Voce de preencher o campo email').notEmpty()
    req.assert('senha', 'Voce de preencher o campo senha').notEmpty()

    const erros = req.validationErrors()

    if (erros) {
        res.render('usuarios/login', { erros: erros, usuario: dados })
        return
    }
    else {
        const conexao = app.config.conexao
        const modelUsuario = new app.app.models.modelUsuarios(conexao)

        modelUsuario.getUsuario(dados, function (error, result) {

            if (result.length <= 0) {
                let erros = [{ msg: 'Usuario nao encontrado, verifique seus dados e tente novamente' }]
                res.render('usuarios/login', { erros: erros, usuario: dados })
            }

            else {
                req.session.id_tipo_usuario = result[0].id_tipo_usuario
                req.session.id_usuario = result[0].id_usuario
                console.log(req.session.id_tipo_usuario)
                if (result[0].id_tipo_usuario == 1) {
                    res.render('usuarios/menu', { erros: {}, usuario: {} })
                }
                else if (result[0].id_tipo_usuario == 2) {
                    res.render('admin/menu', { erros: {}, usuario: {} })
                }
            }
        })
    }
}

module.exports.logar = function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }
    res.render('usuarios/menu')
}

// module.exports.renderCadastro = function (app, req, res) {
//     res.render('usuarios/cadastro', { erros: {}, usuario: {} })
// }

module.exports.editarUsuario = function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }

    const conexao = app.config.conexao
    const modelUsuarios = new app.app.models.modelUsuarios(conexao)
    const idUsuario = req.session.id_usuario

    modelUsuarios.selectUsuario(idUsuario, function (error, result) {
        res.render('usuarios/editarUsuario', { erros: {}, usuario: result})
    })
    
}

module.exports.salvar = function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelUsuarios = new app.app.models.modelUsuarios(conexao)
    const idUsuario = req.session.id_usuario

    req.assert('nome', 'Voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'Voce deve preencher o campo email').notEmpty()

    modelUsuarios.editarUsuario(dados, idUsuario, function (error, result) {
        res.render('usuarios/menu', { erros: {}, usuario: dados })
        req.session.id_usuario = result[0].id_usuario
        console.log(dados, req.session.id_usuario)
    })
}

module.exports.renderLista = function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuarios(conexao)

    modelUsuario.selectProdutos(function (error, result) {
        res.render('usuarios/listaProdutos', { erros: {}, produtos: result })
    })
}

module.exports.logout = async function (app, req, res) {

    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    const idUsuario = req.session.id_usuario
    const selectPedidoAberto = await modelAdmin.selectPedidoAberto(idUsuario)

    if(selectPedidoAberto.length > 0){
     await modelAdmin.cancelarPedido(idUsuario)
    }
    req.session.destroy()
    res.redirect('/')
}

module.exports.addCarrinho = async function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idUsuario = req.session.id_usuario

    let pedidoAberto = await modelAdmin.selectPedidoAberto(idUsuario)
    console.table(pedidoAberto)


    if (pedidoAberto.length <= 0) {
        await modelAdmin.criarPedido(idUsuario)
        pedidoAberto = await modelAdmin.selectPedidoAberto(idUsuario)
    }

    const pedido = req.session.id_pedido = pedidoAberto[0].id_pedido
    const idProduto = dados.idProduto

    const constaCarrinho = await modelAdmin.constaCarrinho(pedido, idProduto)
    if (constaCarrinho.length <= 0) {
        await modelAdmin.addCarrinho(pedido, idProduto)
    }
    else {
        await modelAdmin.updateQuantidade(pedido, idProduto)
    }

    res.redirect('/usuario/listaProdutos')
}

module.exports.RenderCarrinho = async function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idUsuario = req.session.id_usuario

    let pedidoAberto = await modelAdmin.selectPedidoAberto(idUsuario)
    console.table(pedidoAberto)

    if (pedidoAberto == undefined) {
        const erros = [{ msg: "Não existe o pedido" }]
        res.render('/carrinho', { erros: erros })
        return
    }

    let valorTotal = 0
    const idPedido = pedidoAberto[0].id_pedido

    const selectProdutosCarrinho = await modelAdmin.selectProdutosCarrinho(idPedido)
    for (let i = 0; i < selectProdutosCarrinho.length; i++) {
        selectProdutosCarrinho[i]["produto"] = await modelAdmin.ProdutosSelect(selectProdutosCarrinho[i].id_produto)
        valorTotal += selectProdutosCarrinho[i].quantidade * selectProdutosCarrinho[i]["produto"][0].preco
    }
    console.table(selectProdutosCarrinho)

    res.render('usuarios/listaCarrinho', { erros: {}, produtos: selectProdutosCarrinho, valorTotal: valorTotal.toFixed(2) })
}

module.exports.editarCarrinho = function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }

    const dados = req.body

    res.render('usuarios/editarCarrinho', { erros: {}, quantidade: dados.qtd, idProduto: dados.idProduto, idPedido: dados.idPedido })
}

module.exports.salvarEditCarrinho = async function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    const idPedido = dados.idPedido
    const idProduto = dados.idProduto
    const quantidade = dados.qtdCarrinho

    await modelAdmin.salvarEditCarrinho(idPedido, idProduto, quantidade)

    const pedidoAberto = req.session.id_pedido

    let valorTotal = 0

    const selectProdutosCarrinho = await modelAdmin.selectProdutosCarrinho(pedidoAberto)
    for (let i = 0; i < selectProdutosCarrinho.length; i++) {
        selectProdutosCarrinho[i]["produto"] = await modelAdmin.ProdutosSelect(selectProdutosCarrinho[i].id_produto)
        valorTotal += selectProdutosCarrinho[i].quantidade * selectProdutosCarrinho[i]["produto"][0].preco
    }


    res.render('usuarios/listaCarrinho', { erros: {}, produtos: selectProdutosCarrinho, valorTotal: valorTotal.toFixed(2) })
}

module.exports.excluirCarrinho = async function (app, req, res) {

    const dados = req.body
    const idProduto = dados.idProduto
    const idPedido = dados.idPedido
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    await modelAdmin.excluirCarrinho(idPedido, idProduto)

    const pedidoAberto = req.session.id_pedido

    let valorTotal = 0

    const selectProdutosCarrinho = await modelAdmin.selectProdutosCarrinho(pedidoAberto)
    for (let i = 0; i < selectProdutosCarrinho.length; i++) {
        selectProdutosCarrinho[i]["produto"] = await modelAdmin.ProdutosSelect(selectProdutosCarrinho[i].id_produto)
        valorTotal += selectProdutosCarrinho[i].quantidade * selectProdutosCarrinho[i]["produto"][0].preco
    }


    res.render('usuarios/listaCarrinho', { erros: {}, produtos: selectProdutosCarrinho, valorTotal: valorTotal.toFixed(2) })
}

module.exports.renderFinalizarPedido = async function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }

    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idUsuario = req.session.id_usuario
    let pedidoAberto = await modelAdmin.selectPedidoAberto(idUsuario)
    let valorTotal = 0
    const idPedido = pedidoAberto[0].id_pedido

    const selectFormaPagamento = await modelAdmin.selectFormaPagamento()
    const selectProdutosCarrinho = await modelAdmin.selectProdutosCarrinho(idPedido)
    for (let i = 0; i < selectProdutosCarrinho.length; i++) {
        selectProdutosCarrinho[i]["produto"] = await modelAdmin.ProdutosSelect(selectProdutosCarrinho[i].id_produto)
        valorTotal += selectProdutosCarrinho[i].quantidade * selectProdutosCarrinho[i]["produto"][0].preco
    }

    res.render('usuarios/finalizarPedido', { erros: {}, produtos: selectProdutosCarrinho, valorTotal: valorTotal.toFixed(2),formaPagamento:selectFormaPagamento })
}

module.exports.validarPedido = async function (app, req, res) {
    if(req.session.id_usuario == undefined){
        res.redirect('/')
        return
    }
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idUsuario = req.session.id_usuario
    const formaPagamento = dados.idFormaPagamento
    let finalizarPedido = await modelAdmin.finalizarPedido(idUsuario,formaPagamento)

    res.render('usuarios/menu', { erros: {}, usuario: {} })
}


