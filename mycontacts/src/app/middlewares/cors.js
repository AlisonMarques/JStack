module.exports = (request, response, next) => {
  // WildCard -> Curinga * (libera a rota para todos usarem, independente de onde chama.)
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
  next();
}
