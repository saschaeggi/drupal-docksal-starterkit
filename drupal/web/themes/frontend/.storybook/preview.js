import Twig from 'twig';
import twigDrupal from 'twig-drupal-filters';
import { addParameters, addDecorator } from '@storybook/html';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';

// import base styling
import '../styles/storybook.scss';

// Add the filters to Twig instance.
twigDrupal(Twig);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  },
  // sort stories alphabetically
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
    inlineStories: true,
  },
});

addDecorator(withA11y);
