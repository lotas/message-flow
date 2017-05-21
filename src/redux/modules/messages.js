import {getMessages} from '../../api';

const LOAD = 'mf/messages/LOAD';
const LOAD_NEXT = 'mf/messages/LOAD_NEXT';
const LOADED = 'mf/messages/LOADED';
const ERROR = 'mf/messages/ERROR';

export const DEFAULT_PAGE_SIZE = 50;

const initialState = {
  loading: false,
  messages: [],
  error: false,
  skip: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        skip: 0,
        loading: true,
        messages: [],
        error: false
      };

    case LOAD_NEXT:
      return {
        ...state,
        loading: true,
        skip: state.skip + DEFAULT_PAGE_SIZE,
        error: false
      };

    case LOADED:
      return {
        ...state,
        loading: false,
        messages: state.messages.concat(action.messages)
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default: return state;
  }
}

// Action Creators

function loadStart() {
  return { type: LOAD };
}

function loadNextStart() {
  return { type: LOAD_NEXT };
}

function messagesLoaded(messages) {
  return { type: LOADED, messages };
}

function loadingError(error) {
  return { type: ERROR, error };
}

export function loadMessages() {
  return loadMessagesThunk(loadStart());
}

export function loadNextPage(limit, skip) {
  return loadMessagesThunk(loadNextStart());
}

function loadMessagesThunk(initialAction) {
  return (dispatch, getState) => {
    dispatch(initialAction);
    getMessages(DEFAULT_PAGE_SIZE, getState().messages.skip)
      .then((messages) => dispatch(messagesLoaded(messages)))
      .catch((error) => dispatch(loadingError(error)));
  }
}