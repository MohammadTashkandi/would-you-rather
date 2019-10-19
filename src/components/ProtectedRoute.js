import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { addNotification } from '../utils/helpers'


// I had a problem where the app crashed because in the Route component (in the app.js file) I used render instead of component
// So to solve that I check what is being used first. Now this will handle both situations
const ProtectedRoute = ({
    component: Component = null, // If I used component then use it otherwise = null
    render: Render = null, // If I used render then use it otherwise = null
    ...rest
}) => (
        <Route {...rest} render={(props) => {
            if (rest.isLoggedIn) { // You will find the props from redux in "rest"
                if (Render !== null) {
                    return Render(props)
                } else if (Component !== null) {
                    return <Component {...props} />
                } else {
                    console.log('An error has occured')
                    return null
                }
            } else {
                addNotification('Error', 'Please login first', 'danger')
                return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            }
        }}
        />
    )

const mapStateToProps = ({ authedUser }) => ({
    isLoggedIn: authedUser !== null
})

export default connect(mapStateToProps)(ProtectedRoute)
