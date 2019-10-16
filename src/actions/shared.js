import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, saveUserAnswer, saveNewQuestionInUser } from './users'
import { receiveQuestions, saveAnswerInQuestions, saveNewQuestion } from './questions'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
         .then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
         })
    }
}

export function handleSaveAnswer(info) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestionAnswer(info)
         .then(() => {
             dispatch(saveAnswerInQuestions(info))
             dispatch(saveUserAnswer(info))
             dispatch(hideLoading())
         })
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestion(question)
         .then((formattedQuestion) => {
            dispatch(saveNewQuestion(formattedQuestion))
            dispatch(saveNewQuestionInUser(formattedQuestion))
            dispatch(hideLoading())
         })
    }
}