import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'
import { userVote, addNotification } from '../utils/helpers'

class QuestionPage extends React.Component {
    render() {

        const { authedUser, question } = this.props

        if (authedUser===null) {
            addNotification('Error', 'Please login first', 'danger')
            return <Redirect to='/' />
        }

        const vote = userVote(question, authedUser)
        // userVote return false if the user hasn't voted yet, and returns the vote if he did

        return (
            <React.Fragment>
                {
                    vote === false
                    ? (<UnansweredQuestion />)
                    : (<AnsweredQuestion />)
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ questions, authedUser }, ownProps) => ({
    question: questions[ownProps.match.params.id],
    authedUser
})

export default withRouter(connect(mapStateToProps)(QuestionPage))