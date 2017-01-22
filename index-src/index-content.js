var metaMarked = require('meta-marked');
var path = require('path');
var contentWithMeta = metaMarked(require('fs').readFileSync(path.join(__dirname,'./index.md'), 'utf8'));

module.exports = {
  title: contentWithMeta.meta.title,
  date: contentWithMeta.meta.date,
  updateDate: new Date(),
  articleEntry: contentWithMeta.html,
};