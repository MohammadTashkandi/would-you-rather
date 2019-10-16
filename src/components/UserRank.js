import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

class UserRank extends React.Component {
    render() {

        const { user } = this.props

        const answeredQuestions = Object.keys(user.answers).length
        const createdQuestions = user.questions.length
        const score = answeredQuestions + createdQuestions

        return (
            <Card className='text-center'>
                <Card.Body>
                    <div className='leaderboard-card'>
                        <div className='img'><Image src={user.avatarURL} rounded /></div>
                        <div>
                            <h4>{user.name}</h4>
                            <p>Answered questions: {answeredQuestions}</p>
                            <p>Created questions: {createdQuestions}</p>
                        </div>
                        <div>
                            <Card>
                                <Card.Header>Score</Card.Header>
                                <Card.Body>
                                    <div className='circle'>
                                        {score}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )  
    }
}

const mapStateToProps = ({ users }, {uid}) => ({
    user: users[uid]
})

export default connect(mapStateToProps)(UserRank)