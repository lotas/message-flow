import {getAuthUser} from '../../api';

const LOAD_USER = 'mf/auth/LOAD_USER';
const USER_LOADED = 'mf/auth/USER_LOADED';
const ERROR = 'mf/auth/ERROR';

const initialState = {
  loading: false,
  user: null,
  team: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loading: true
      };

    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: action.user,
        team: action.team
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        team: null,
        error: action.error
      };

    default: return state;
  }
}

// Action Creators

function loadUserStart() {
  return { type: LOAD_USER };
}

function userLoaded(user, team) {
  return { type: USER_LOADED, user, team };
}

function loadingError(error) {
  return { type: ERROR, error };
}

export function loadAuth() {
  return (dispatch, getState) => {
    dispatch(loadUserStart());

    return getAuthUser()
            .then((user) => dispatch(userLoaded(user.user, user.team)))
            .catch((error) => dispatch(loadingError(error)));
  }
}