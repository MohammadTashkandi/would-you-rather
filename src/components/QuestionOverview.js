import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

class QuestionOverview extends React.Component {

    redirectToQuestionPage = () => {
        this.props.history.push(`/questions/${this.props.question.id}`)
    }

    render() {

        const { author, question } = this.props

        return (
            <Card className='question-overview'>
                <Card.Header>
                    {author.name} asks:
                </Card.Header>
                <Card.Body>
                    <div className='question-body'>
                        <div className='img'><Image src={author.avatarURL} rounded /></div>
                        <div className='text-center question-info'>
                            <p>Would you rather</p>
                            <p>...{question.optionOne.text.slice(0, 5)}...</p>
                            <Button onClick={this.redirectToQuestionPage} className='btn-extend' >View Poll</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = ({ questions, users }, { id }) => {
    const question = questions[id]
    const author = question ? users[question.author] : null

    return {
        question,
        author
    }
}

export default withRouter(connect(mapStateToProps)(QuestionOverview))