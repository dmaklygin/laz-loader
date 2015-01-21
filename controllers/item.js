var request = require('request');
/**
 * load information from remote server
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next) {

  var link = req.query.link || '';
  var data = { success: true, document: '', message: null };

  if (!link.match(/lazada.vn/g)) {
    var err = new Error('invalid URI');
    err.status = 500;
    return next(err);
  }

  request
    .get(link, { headers: { 'User-Agent': 'User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0)' } })
    .on('response', function(response) {
      response.setEncoding('utf8');
      response
        .on('data', function (chunk) {
          data.document += chunk;
        })
        .on('end', function (response) {
          res.json(data);
        });
    })
    .on('error', next);
};
