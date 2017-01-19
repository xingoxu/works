var metaMarked = require('meta-marked');
var path = require('path');
var contentWithMeta = metaMarked(require('fs').readFileSync(path.join(__dirname,'./index.md'), 'utf8'));

module.exports = {
  title: contentWithMeta.meta.title,
  articleEntry: contentWithMeta.html,
};