import { persistentReducer } from 'redux-pouchdb';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const journal = (state = {count: 0}, action) => {
  switch(action.type) {
  case INCREMENT:
  console.log(state.count + 1);
    return { count: state.count + 1 };
  case DECREMENT:
    return { count: state.count - 1 };
  default:
    return state;
  }
};

export default persistentReducer(journal, 'journal');
