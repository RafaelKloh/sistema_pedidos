function Usuario(conexao) {
    this._conexao = conexao
    this._crypto = require('crypto')
}

Usuario.prototype.cadastroUsuarios = function (dados, callback) {
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`insert into usuario set nome = '${dados.nome}' , senha = '${dados.senha}' , email = '${dados.email}' , id_tipo_usuario = 1`, callback)
}

Usuario.prototype.getUsuarioByEmail = function (email, callback) {
    this._conexao.query(`select * from usuario where email = '${email}'`, callback)
}

Usuario.prototype.getUsuario = function (dados, callback) {
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`select * from usuario where email = '${dados.email}' and senha = '${dados.senha}'`, callback)
}

Usuario.prototype.getUsuarioById = function (id, callback) {
    this._conexao.query(`select * from usuario where id = ${id}`, callback)
}

Usuario.prototype.editarUsuario = function(dados, idUsuario, callback) {
    this._conexao.query(`update usuario set nome = '${dados.nome}', email = '${dados.email}' where id = ${idUsuario}`, callback)
}

Usuario.prototype.selectProdutos = function (callback) {
    this._conexao.query(`select * from produto`, callback)
}

Usuario.prototype.selectUsuario = function (idUsuario,callback) {
    this._conexao.query(`select * from usuario where id_usuario = ${idUsuario}`, callback)
}



module.exports = function () {
    return Usuario;
}