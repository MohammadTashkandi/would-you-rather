import { store } from 'react-notifications-component'

export function hasVoted(questions, id, authedUser) {
    return (questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser))
}

export function userVote(question, authedUser) {
    if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
        if (question.optionOne.votes.includes(authedUser)) {
            return 'optionOne'
        } else {
            return 'optionTwo'
        }
    }

    return false
}

export function getVotesInfo(question) {
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = Math.fround((optionOneVotes / totalVotes) * 100)
    const optionTwoPercentage = Math.fround((optionTwoVotes / totalVotes) * 100)

    return {
        optionOneVotes,
        optionTwoVotes,
        totalVotes,
        optionOnePercentage,
        optionTwoPercentage
    }
}

export function calculateScore(user) {
    const answeredQuestions = Object.keys(user.answers).length
    const createdQuestions = user.questions.length
    const score = answeredQuestions + createdQuestions

    return score
}

export function addNotification(title, message, type) {
    store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 3000 },
        dismissable: { click: true }
    })
}