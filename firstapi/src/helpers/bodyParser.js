
function bodyParser(request, callback) {
  /**
 * Recebendo o body do Post
 * As mensagens do body sao enviadas aos poucos(streams)
 * entao e preciso criar um event list para ficar ouvindo as mensagens
 */
  let body = ''

  request.on('data', (chunk) => {
    body += chunk
  })

  request.on('end', () => {
    body = JSON.parse(body)
    request.body = body
    //callback vai chamar o endpoint de criar usuario assim que terminar de inserir os dados no body
    callback()
  })
}

module.exports = bodyParser