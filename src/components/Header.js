import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { removeAuthedUser } from '../actions/authedUser'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'

class Header extends React.Component {

    state = {
        activeKey: '/'
    }

    handleRedirect = (selectedKey) => {
        this.props.history.push(selectedKey)
        if (this.props.authedUser) {
            this.setState({
                activeKey: `${selectedKey}`
            })
        }
    }

    handleLogout = () => {
        this.props.dispatch(removeAuthedUser())
        this.setState({
            activeKey: '/'
        })
        this.props.history.push('/')
    }

    render() {

        const { authedUser, user } = this.props

        const { activeKey } = this.state

        return (
            <Nav
                onSelect={this.handleRedirect}
                className='header'
            >
                <Nav.Item>
                    <Nav.Link eventKey='/' className={activeKey==='/' && 'active-header'}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='/add' className={activeKey==='/add' && 'active-header'}>New Question</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='/leaderboard' className={activeKey==='/leaderboard' && 'active-header'}>Leaderboard</Nav.Link>
                </Nav.Item>
                <Nav.Item className='user-header'>
                    {
                        authedUser
                            ? (<span>
                                <img className='header-img' src={user.avatarURL} />
                                {authedUser}
                                <Button className='btn-logout' onClick={this.handleLogout}>Logout</Button>
                            </span>)
                            : (null)
                    }
                </Nav.Item>
            </Nav>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => ({
    user: users[authedUser],
    authedUser
})

export default withRouter(connect(mapStateToProps)(Header))