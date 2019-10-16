import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { addNotification } from '../utils/helpers'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Login extends React.Component {

    state={
        user: ''
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            user: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.user === '') {
            addNotification('Error', 'Please select a user', 'danger')
        } else {
            const { from } = this.props.location.state || { from: { pathname: '/' }}
            console.log(from)
            this.props.dispatch(setAuthedUser(this.state.user))
            this.props.history.push(from)
        }
    }

    handleRegisterClick = (e) => {
        this.props.history.push('/register')
    }

    render() {

        const { users } = this.props

        return (
            <Card className='text-center'>
                <Card.Header>Welcome to Would You Rather</Card.Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group style={{marginTop: '1rem'}}>
                        <Form.Control as='select' onChange={this.handleChange} value={this.state.user}>
                            <option hidden disabled defaultChecked value=''>-- Select User --</option>
                            {
                                Object.keys(users).map((userId) => (
                                    <option key={userId} value={userId}>{users[userId].name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' className='btn-extend' variant='primary'>Sign in</Button>
                    </Form.Group>
                    <Form.Group>
                        <Button className='btn-extend btn-register' onClick={this.handleRegisterClick} variant='primary'>Register</Button>
                    </Form.Group>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = ({users}) => ({
    users,
})

export default withRouter(connect(mapStateToProps)(Login))