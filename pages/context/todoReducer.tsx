import {

    GET_TODO,
    UPDATE_TODO,
    CREATE_TODO

} from './types'


export const reducer = (state: Record<string, never>, action: Record<string, unknown>) => {

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
            };

        default:
    }
    return state
}