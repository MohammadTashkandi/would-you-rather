import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleRegisterUser } from '../actions/users'
import { addNotification } from '../utils/helpers'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

class Register extends React.Component {

    state = {
        username: '',
        avatarURL: '',
        name: '',
    }

    handleChange = (e) => {
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { username, name, avatarURL } = this.state

        this.props.handleRegisterUser(username, name, avatarURL)
            .then(() => {
                addNotification('Success', 'Registered successfully!', 'success')
                this.props.history.push('/') 
            })
    }

    onClick = (avatarURL) => {
        this.setState(() => ({
            avatarURL
        }))
    }

    render() {

        if (this.props.authedUser !== null) {
            addNotification('Error', 'You must be signed out to register', 'danger')
            this.props.history.push('/')
        }

        const { avatarURL } = this.state

        const maleIcon = 'https://img.icons8.com/color/120/000000/user-male.png'
        const femaleIcon = 'https://img.icons8.com/color/120/000000/user-female.png'

        return (
            <Card className='text-center'>
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                onChange={this.handleChange}
                                type='text'
                                name='username'
                                value={this.state.username}
                                placeholder='Enter desired username'
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={this.handleChange}
                                type='text'
                                name='name'
                                value={this.state.name}
                                placeholder='Enter desired name'
                                required
                            />
                        </Form.Group>
                        <Form.Group className='choose-icon'> 
                            <Image
                                className={avatarURL===maleIcon && 'chosen'}
                                style={{cursor: 'pointer'}}
                                onClick={() => this.onClick(maleIcon)}
                                src={maleIcon}
                            />
                            <Image
                                className={avatarURL===femaleIcon && 'chosen'}
                                style={{cursor: 'pointer'}}
                                onClick={() => this.onClick(femaleIcon)}
                                src={femaleIcon}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit' className='btn-extend btn-register' variant='primary'>Register</Button>
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

export default withRouter(connect(mapStateToProps, {
    handleRegisterUser
})(Register))