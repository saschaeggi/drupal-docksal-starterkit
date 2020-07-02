// Configures Storybook's "manager" UI that wraps the preview, and also configures addons panel.
import { addons } from '@storybook/addons';
import unicTheme from './unicTheme';

addons.setConfig({
  panelPosition: 'bottom',
  theme: unicTheme
})
