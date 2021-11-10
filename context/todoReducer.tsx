import {

    GET_TODO,
    UPDATE_TODO,
    LOGIN,

} from './types'

interface stateData {
    data: unknown | any
}

interface actionTypes {
    payload: string,
    type: string
}

export const reducer = (state: stateData, action: actionTypes) => {

    switch (action.type) {
        case GET_TODO:
            return {
                ...state,
                data: action.payload,
            };

        case UPDATE_TODO:
            return {
                ...state,
                data: action.payload
            }
        

        default:
    }
    return state
}