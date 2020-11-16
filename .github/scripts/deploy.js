const ghpages = require('gh-pages');

ghpages.publish(
  'build',
  {
    repo: `https://${process.env.GH_TOKEN}@github.com/deleonn/react-movie-app.git`,
    silent: true,
  },

  (err) => {
    if (err) {
      console.error(err);
      process.exit(err.errno || 0);
    }

    console.log('Deployed to https://deleonn.github.io/react-movie-app/');
  }
);
