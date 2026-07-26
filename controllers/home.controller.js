function index(_req, res) {
  res.render('home/index', { title: 'GeoDiary' });
}
module.exports = { index };
