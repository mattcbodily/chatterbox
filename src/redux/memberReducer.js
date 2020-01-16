const initialState = {
    member: {},
    groups: {}
}

const GET_MEMBER = 'GET_MEMBER';

export function getMember(memberObj){
    return {
        type: GET_MEMBER,
        payload: memberObj
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_MEMBER:
            return {...state, member: payload};
        default:
            return state;
    }
};