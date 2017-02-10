import { persistentReducer } from 'redux-pouchdb-plus';
import { List, Map } from 'immutable';

// actions
const QUESTION_TEMPLATE_EDIT = 'QUESTION_TEMPLATE_EDIT';
export const questionTemplateEditAction = (text, index) => ({
  type: QUESTION_TEMPLATE_EDIT,
  text,
  index
})

const JOURNAL_QUESTION_EDIT = 'JOURNAL_QUESTION_EDIT';
export const journalQuestionEditAction = (date, text, index) => ({
  type: JOURNAL_QUESTION_EDIT,
  date,
  text,
  index
})

const JOURNAL_ANSWER_EDIT = 'JOURNAL_ANSWER_EDIT';
export const journalAnswerEditAction = (date, text, index) => ({
  type: JOURNAL_ANSWER_EDIT,
  date,
  text,
  index
})

// defaults
const DEFAULT_QUESTIONS = List([
  'Biggest wins',
  'Biggest lessons',
  'Emotions / motivation',
  'Feedback to anyone',
  'Need help with',
  'Everything else',
]);

const DEFAULT_STATE = Map({
  questions: DEFAULT_QUESTIONS,
  journal: Map()
});

// helpers
function createOrGetJournalEntry(journal, date, questionTemplates) {
  let entry = journal.get(date);
  if (!Map.isMap(entry)) {
    entry = Map({
      questions: questionTemplates,
      answers: List(Array(questionTemplates.length).fill(''))
    });
  }
  return entry;
}

const journal = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case QUESTION_TEMPLATE_EDIT:
      return state.set('questions', state.get('questions').set(action.index, action.text));
    case JOURNAL_QUESTION_EDIT: {
      const journal = state.get('journal');
      const entry = createOrGetJournalEntry(journal, action.date, state.get('questions'));
      return state.set('journal', journal.set(action.date, entry.set('questions', entry.get('questions').set(action.index, action.text))));
    }
    case JOURNAL_ANSWER_EDIT: {
      const journal = state.get('journal');
      const entry = createOrGetJournalEntry(journal, action.date, state.get('questions'));
      return state.set('journal', journal.set(action.date, entry.set('answers', entry.get('answers').set(action.index, action.text))));
    }
    default:
      return state;
  }
};

export default persistentReducer(journal, {name: 'journal'});
