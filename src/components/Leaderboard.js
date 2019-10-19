import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { calculateScore, addNotification } from '../utils/helpers'
import UserRank from './UserRank'

class Leaderboard extends React.Component {
    render() {

        const { userIds, authedUser } = this.props

        return (
            <div>
                {
                    userIds.map((id) => (<UserRank key={id} uid={id} />))
                }
            </div>
        )
    }
}

const mapStateToProps = ({ users, authedUser }) => ({
    userIds: Object.keys(users)
        .sort((a, b) => calculateScore(users[b]) - calculateScore(users[a])),
    authedUser
})

export default withRouter(connect(mapStateToProps)(Leaderboard))