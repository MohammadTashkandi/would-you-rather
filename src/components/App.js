import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Header from './Header'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'
import Register from './Register'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <Header />
        {
          this.props.loading
            ? (null)
            : (
              <div className='app'>
                <Switch>
                  <Route path='/' exact render={() => (<Home />)} />
                  <ProtectedRoute path='/add' render={() => (<NewQuestion />)} />
                  <ProtectedRoute path='/leaderboard' render={() => (<Leaderboard />)} />
                  <ProtectedRoute path='/questions/:id' render={() => (<QuestionPage />)} />
                  <Route path='/register' render={() => (<Register />)} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  loading: Object.keys(questions).length === 0
})

export default connect(mapStateToProps)(App);
