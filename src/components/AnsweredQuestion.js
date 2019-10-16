import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userVote, getVotesInfo } from '../utils/helpers'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Image from 'react-bootstrap/Image'

class AnsweredQuestion extends React.Component {
    render() {

        const { question, author, authedUser } = this.props
        const vote = userVote(question, authedUser)
        
        const {
            optionOneVotes,
            optionTwoVotes,
            totalVotes,
            optionOnePercentage,
            optionTwoPercentage
        } = getVotesInfo(question)

        return (
            <Card className='text-center'>
                <Card.Header>
                    Asked by {author.name}:
                </Card.Header>
                <Card.Body>
                    <div className='question-body'>
                        <div className='img'><Image src={author.avatarURL} rounded /></div>
                        <div className='question-info'>
                            <h5>Results:</h5>
                            <Card className={vote === 'optionOne' ? ('chosen') : (null)} style={{margin: '10px 0'}}>
                                <p>{question.optionOne.text}</p>
                                <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`} style={{width: '80%', margin: 'auto'}} />
                                <p>{optionOneVotes} out of {totalVotes} votes</p>
                            </Card>
                            <Card className={vote === 'optionTwo' ? ('chosen') : (null)}>
                                <p>{question.optionTwo.text}</p>
                                <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`} style={{width: '80%', margin: 'auto'}} />
                                <p>{optionTwoVotes} out of {totalVotes} votes</p>
                            </Card>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = ({ questions, authedUser, users }, ownProps) => {
    const question = questions[ownProps.match.params.id]
    const author = users[question.author]

    return {
        question,
        author,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(AnsweredQuestion))