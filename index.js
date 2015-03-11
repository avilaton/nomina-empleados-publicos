var fs = require('fs'),
  fetchSrv = require('./get.js');

function save (name, data) {
  fs.writeFile('scrapes/'+ name + '.html', data, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log('Saving %s.html', name);
      }
  });
}

fetchSrv.getAgentes(function (err, data) {
  save('agentes', data);
});

fetchSrv.getFuncionarios(function (err, data) {
  save('funcionarios', data);
});