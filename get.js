var BASE_URL = 'http://muniweb1.santafeciudad.gov.ar/sistperso/personal_buscar.php?valor=ObtenerAgentesPorApellidoNombre&dato=%20',
  FUNCIONARIOS = 'http://muniweb1.santafeciudad.gov.ar/sistperso/personal_buscar.php?valor=ObtenerAgentesPorApellidoNombre&dato=%20&tipoAgen=F',
  request = require('request'),
  fs = require('fs');

function save (school_id, data) {
  fs.writeFile('raw/'+ school_id + '.html', data, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("Saving html for school: %s", school_id);
      }
  });
}

exports.getAgentes = function (callback) {
  request(BASE_URL + '&tipoAgen=P', function (err, response, data) {
    if (err) return console.error(err);
    callback(null, data);
  });
}

exports.getFuncionarios = function (callback) {
  request(BASE_URL + '&tipoAgen=F', function (err, response, data) {
    if (err) return console.error(err);
    callback(null, data);
  });
}
