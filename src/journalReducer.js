import { persistentReducer } from 'redux-pouchdb';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const incrementAction = () => ({
  type: INCREMENT
})

export const decrementAction = () => ({
  type: DECREMENT
})

const journal = (state = {journal: 0}, action) => {
  console.log('journal state', state.journal);
  switch(action.type) {
    case INCREMENT:
      return { journal: state.journal + 1 };
    case DECREMENT:
      return { journal: state.journal - 1 };
    default:
      return state;
    }
};

export default persistentReducer(journal, 'journal');
