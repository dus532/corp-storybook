import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context(`../app`, true, /\.stories\.jsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
