import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'
import { addNotification } from '../utils/helpers'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewQuestion extends React.Component {

    state = {
        optionOne: '',
        optionTwo: ''
    }

    onChange = (e) => {
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newQuestion = {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: this.props.authedUser
        }

        this.props.dispatch(handleSaveQuestion(newQuestion))
         .then(() => {
             addNotification('Sucess', 'Question added!', 'success')
             this.props.history.push('/')
         })
    }

    render() {

        const { authedUser } = this.props

        if (authedUser===null) {
            addNotification('Error', 'Please login first', 'danger')
            return <Redirect to='/' />
        }

        return (
            <Card>
                <Card.Header>Create New Question</Card.Header>
                <Card.Body>
                    <p>Complete the question:</p>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <h5>Would You Rather...</h5>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' name='optionOne' onChange={this.onChange} value={this.state.optionOne} placeholder='Enter Option One Text Here' required />
                        </Form.Group>
                        <Form.Group className='text-center'>
                            <h6>OR</h6>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' name='optionTwo' onChange={this.onChange} value={this.state.optionTwo} placeholder='Enter Option Two Text Here' required />
                        </Form.Group>
                        <Form.Group className='text-center'>
                            <Button type='submit' className='btn-extend'>Submit</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser
})

export default withRouter(connect(mapStateToProps)(NewQuestion))