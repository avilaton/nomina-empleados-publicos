var $ = require('cheerio'),
  _ = require('lodash'),
  fs = require('fs'),
  csvWriter = require('csv-write-stream'),
  writer = csvWriter(),
  parse_dashboard = require('./parsers/dashboard');

function parser(data) {
  var $html = $.load(data),
    table = $html('.table table'),
    list = []

  table.find('tr').each(function (index, row) {
    var cols = $(row).find('td'),
      name = cols.eq(1).text().trim().toLowerCase(),
      area = cols.eq(2).text().trim().toLowerCase(),
      id = cols.eq(0).find('a').text().trim().toLowerCase();

    if (index === 0) return;

    list.push({
      dni: Number(id),
      name: name,
      area: area
    })
  });

  return list;
}


// Command line usage
var args = process.argv.slice(2);

if (args.length !== 0) {
  var inFilename = args[0],
    outFilename = args[1];
  console.log('Parsing file: ', inFilename);
  fs.readFile(args[0], 'utf8', function (err, data) {
    var list = parser(data);

    list = _.sortBy(list, 'dni');
    writer.pipe(fs.createWriteStream(outFilename))
    _.each(list, function (item, idx) {
      writer.write(item);
    })
    writer.end()

  });
}

module.exports = parser;
