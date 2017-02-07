import { persistentReducer } from 'redux-pouchdb';

// actions
const USER_EDIT = 'USER_EDIT';
export const userEditAction = (date, text) => ({
  type: USER_EDIT,
  date: date,
  text: text
})

// defaults
const DEFAULT_QUESTIONS = [
  'Biggest wins',
  'Biggest lessons',
  'Emotions / motivation',
  'Feedback to anyone',
  'Need help with',
  'Everything else',
];

const DEFAULT_STATE = {
  questions: DEFAULT_QUESTIONS,
  journal: {}
};

const journal = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case USER_EDIT:
      return {
        journal: {
          ...state.journal,
          [action.date]: action.text
        }
      };
    default:
      return state;
    }
};

export default persistentReducer(journal, 'journal');
