export default { title: 'Menu-Local-Task' };
import faker from 'faker';

import menuLocalTask from './menu-local-task.twig';
import drupalAttribute from 'drupal-attribute';
// TODO: .scss don't work in storbook yet
import './menu-local-task.scss';
import './menu-local-task.css';
import './menu-local-task.js';
export const menu_local_task = () => (
  menuLocalTask({
    attributes: new drupalAttribute(),
    is_active: false,
    link: faker.lorem.word()
  })
);

export const menu_local_task_active = () => (
  menuLocalTask({
    attributes: new drupalAttribute(),
    is_active: true,
    link: faker.lorem.word()
  })
);