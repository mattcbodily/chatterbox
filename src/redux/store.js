import {createStore} from 'redux';
import memberReducer from './memberReducer';

export default createStore(memberReducer);