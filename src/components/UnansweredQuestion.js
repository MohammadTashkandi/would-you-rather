import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSaveAnswer } from '../actions/shared'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { addNotification } from '../utils/helpers';

class AnsweredQuestion extends React.Component {

    state = {
        answer: ''
    }

    onChange = (e) => {
        e.persist()
        
        this.setState(() => ({
            answer: e.target.value
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (this.state.answer==='') {
            return alert('Please choose an answer')
        }

        const { question, authedUser } = this.props

        const info = {
            authedUser,
            qid: question.id,
            answer: this.state.answer
        }

        this.props.dispatch(handleSaveAnswer(info))
         .then(() => {
             addNotification('Sucess', 'Answer saved!', 'success')
         })
    }

    render() {

        const { question, author } = this.props

        return (
            <Card className='text-center'>
                <Card.Header>
                    {author.name} asks:
                </Card.Header>
                <Card.Body>
                    <div className='question-body'>
                        <div className='img'><Image src={author.avatarURL} rounded /></div>
                        <div className='question-info'>
                            <p>Would you rather</p>
                            <form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <input type='radio' name='answer' value='optionOne' onChange={this.onChange} />
                                    <span style={{marginLeft: '0.5rem'}}>{question.optionOne.text}</span>
                                </Form.Group>
                                <Form.Group>
                                    <input type='radio' name='answer' value='optionTwo' onChange={this.onChange} />
                                    <span style={{marginLeft: '0.5rem'}}>{question.optionTwo.text}</span>
                                </Form.Group>
                                <Form.Group>
                                    <Button type='submit' className='btn-extend'>Submit</Button>
                                </Form.Group>
                            </form>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = ({ questions, users, authedUser }, ownProps) => {
    const question = questions[ownProps.match.params.id]
    const author = users[question.author]

    return {
        question,
        author,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(AnsweredQuestion))