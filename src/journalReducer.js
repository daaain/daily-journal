import { persistentReducer } from 'redux-pouchdb';

const USER_EDIT = 'USER_EDIT';

export const userEditAction = (text) => ({
  type: USER_EDIT,
  text: text
})

const TEMPLATE = `* Biggest wins



* Biggest lessons



* Emotions / motivation



* Feedback to anyone



* Need help with



* Everything else

`;

const journal = (state = {journal: TEMPLATE}, action) => {
  switch(action.type) {
    case USER_EDIT:
      return {
        journal: action.text
      };
    default:
      return state;
    }
};

export default persistentReducer(journal, 'journal');
