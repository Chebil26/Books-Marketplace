import {
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,



} from "../constants/blogConstants"


export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true}

        case POST_CREATE_SUCCESS:
            return { loading: false, success: true , post: action.payload}

        case POST_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case POST_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const postUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case POST_UPDATE_REQUEST:
            return { loading: true }

        case POST_UPDATE_SUCCESS:
            return { loading: false, success: true, readingChallenge: action.payload }

        case POST_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case POST_UPDATE_RESET:
            return { readingChallenge: {} }

        default:
            return state
    }
}
