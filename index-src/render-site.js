const fs = require('node:fs/promises');
const path = require('node:path');

const matter = require('gray-matter');
const Handlebars = require('handlebars');
const { marked } = require('marked');

const rootDir = path.resolve(__dirname, '..');
const templatePath = path.join(__dirname, 'index.hbs');
const markdownPath = path.join(__dirname, 'index.md');

marked.setOptions({
  headerIds: false,
  mangle: false,
});

Handlebars.registerHelper('formatDate', (value) => formatDate(value));
Handlebars.registerHelper('toISOString', (value) => new Date(value).toISOString());

async function renderSite() {
  const [templateSource, markdownSource] = await Promise.all([
    fs.readFile(templatePath, 'utf8'),
    fs.readFile(markdownPath, 'utf8'),
  ]);

  const { data, content } = matter(markdownSource);
  const template = Handlebars.compile(templateSource);

  return template({
    title: data.title,
    description: createDescription(content),
    date: data.date,
    updateDate: new Date(),
    articleEntry: marked.parse(content),
    stylesheetHref: '/index-src/css/style.css',
  });
}

function createDescription(markdown) {
  return markdown
    .replace(/[#>*`\-\[\]\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
}

function formatDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

module.exports = {
  rootDir,
  renderSite,
};
