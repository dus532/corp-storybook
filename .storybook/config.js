import { configure } from '@storybook/react';

// 3. Load a X.story.js file for each of your components/X.js:
configure(require.context('../app', true, /\.story\.js$/), module);
