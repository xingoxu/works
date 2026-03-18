const fs = require('node:fs/promises');
const path = require('node:path');

const { defineConfig } = require('vite');
const { rootDir, renderSite } = require('./index-src/render-site');

const watchedFiles = [
  path.join(rootDir, 'index-src/index.hbs'),
  path.join(rootDir, 'index-src/index.md'),
  path.join(rootDir, 'index-src/css/style.css'),
  path.join(rootDir, 'CNAME'),
];

module.exports = defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    {
      name: 'works-site',
      transformIndexHtml: {
        order: 'pre',
        async handler() {
          return renderSite();
        },
      },
      configureServer(server) {
        watchedFiles.forEach((file) => {
          server.watcher.add(file);
        });
      },
      handleHotUpdate(context) {
        if (!watchedFiles.includes(context.file)) {
          return;
        }
        context.server.ws.send({ type: 'full-reload' });
        return [];
      },
      async closeBundle() {
        const from = path.join(rootDir, 'CNAME');
        const to = path.join(rootDir, 'dist/CNAME');
        try {
          await fs.copyFile(from, to);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error;
          }
        }
      },
    },
  ],
});
