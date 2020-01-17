const initialState = {
    member: {},
    groups: [],
    selectedGroup: null
}

const GET_MEMBER = 'GET_MEMBER';
const GET_GROUPS = 'GET_GROUPS';
const SELECTED_GROUP = 'SELECTED_GROUP';

export function getMember(memberObj){
    return {
        type: GET_MEMBER,
        payload: memberObj
    }
}

export function getGroups(groupArr){
    return {
        type: GET_GROUPS,
        payload: groupArr
    }
}

export function setSelectedGroup(groupId){
    return {
        type: SELECTED_GROUP,
        payload: groupId
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_MEMBER:
            return {...state, member: payload};
        case GET_GROUPS:
            return {...state, groups: payload};
        case SELECTED_GROUP:
            return {...state, selectedGroup: payload};
        default:
            return state;
    }
};