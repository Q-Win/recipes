import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  recipes: [
    { name: 'This is recipe 1' },
    { name: 'This is recipe 2' },
    { name: 'This is recipe 3' },
  ],
});
