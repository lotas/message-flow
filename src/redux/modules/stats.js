import {getStats} from '../../api';

const LOAD_STATS = 'mf/stats/LOAD_STATS';
const STATS_LOADED = 'mf/stats/STATS_LOADED';
const ERROR = 'mf/stats/ERROR';

const initialState = {
  loading: false,
  total: null,
  today: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_STATS:
      return {
        ...state,
        loading: true
      };

    case STATS_LOADED:
      return {
        ...state,
        loading: false,
        today: action.today,
        total: action.total
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        today: null,
        total: null,
        error: action.error
      };

    default: return state;
  }
}

// Action Creators

function loadStatsStart() {
  return { type: LOAD_STATS };
}

function statsLoaded(stats) {
  const {total, today} = stats;
  return { type: STATS_LOADED, total, today };
}

function loadingError(error) {
  return { type: ERROR, error };
}

export function loadStats() {
  return (dispatch, getState) => {
    dispatch(loadStatsStart());

    return getStats()
            .then((stats) => dispatch(statsLoaded(stats)))
            .catch((error) => dispatch(loadingError(error)));
  }
}