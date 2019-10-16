import { showLoading, hideLoading } from 'react-redux-loading'
import { registerUser } from '../utils/api'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const SAVE_NEW_QUESTION_USER = 'SAVE_NEW_QUESTION_USER'
export const REGISTER_USER = 'REGISTER_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveUserAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function saveNewQuestionInUser(formattedQuestion) {
    return {
        type: SAVE_NEW_QUESTION_USER,
        formattedQuestion
    }
}

function saveUser(formattedUser) {
    return {
        type: REGISTER_USER,
        formattedUser
    }
}

export function handleRegisterUser(username, name, avatarURL) {
    return (dispatch) => {
        dispatch(showLoading())

        return registerUser(username, name, avatarURL)
         .then((formattedUser) => {
            dispatch(saveUser(formattedUser))
            dispatch(hideLoading())
         })
    }
}