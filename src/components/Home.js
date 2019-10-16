import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import QuestionList from './QuestionList'

class Home extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.authedUser
                    ? (<QuestionList />)
                    : (<Login />)
                }
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser
})

export default connect(mapStateToProps)(Home)