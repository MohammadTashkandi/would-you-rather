import {
    RECEIVE_USERS,
    SAVE_USER_ANSWER,
    SAVE_NEW_QUESTION_USER,
    REGISTER_USER
} from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_USER_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case SAVE_NEW_QUESTION_USER:
            return {
                ...state,
                [action.formattedQuestion.author]: {
                    ...state[action.formattedQuestion.author],
                    questions: state[action.formattedQuestion.author].questions.concat([action.formattedQuestion.id])
                }
            }
        case REGISTER_USER:
            return {
                ...state,
                [action.formattedUser.id]: action.formattedUser
            }
        default:
            return state
    }
}