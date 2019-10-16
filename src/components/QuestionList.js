import React from 'react'
import { connect } from 'react-redux'
import QuestionOverview from './QuestionOverview'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { hasVoted } from '../utils/helpers'

class QuestionList extends React.Component {
    render() {

        const { unansweredQuestionsIds, answeredQuestionsIds } = this.props

        return (
            <Tabs defaultActiveKey='unanswered'>
                <Tab eventKey='unanswered' title='Unanswered Questions'>
                    {
                        unansweredQuestionsIds.map((id) => <QuestionOverview key={id} id={id} />)
                    }
                </Tab>
                <Tab eventKey='answered' title='Answered Questions'>
                    {
                        answeredQuestionsIds.map((id) => <QuestionOverview key={id} id={id} />)
                    }
                </Tab>
            </Tabs>
        )
    }
}

const mapStateToProps = ({ questions, authedUser }) => {
    const unansweredQuestionsIds = []
    const answeredQuestionsIds = []
    Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .map((id) => {
            if (hasVoted(questions, id, authedUser)) {
                answeredQuestionsIds.push(id)
            } else {
                unansweredQuestionsIds.push(id)
            }
        })
    
    return {
        unansweredQuestionsIds,
        answeredQuestionsIds
    }
}

export default connect(mapStateToProps)(QuestionList)