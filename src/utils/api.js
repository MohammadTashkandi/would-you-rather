import { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion, _registerUser } from './_DATA'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}

export function saveQuestion(question) {
    return _saveQuestion(question)
}

export function registerUser(username, name, avatarURL) {
    return _registerUser(username, name, avatarURL)
}