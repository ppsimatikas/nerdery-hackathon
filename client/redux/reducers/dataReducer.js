import { DATA_LOADED } from '../actions/dataCreator';

const initialState = null;

export default function reduce(state = initialState, action) {
    switch (action.type) {
      case DATA_LOADED:
          return action.payload;
      default:
          return state;
    }
}
