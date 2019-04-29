import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './styles.css'
import { UsersActions } from '../../store/ducks/users'

const UsersList = ({ users, removeUser }) => (
  <div className="left-bar">
    {!users.data.length && <p>Not users added</p>}
    <ul>
      {users.data.map(user => (
        <li key={user.id}>
          <div>
            <img src={user.avatar} alt={user.name} />
            <div className="user-info">
              <h2>{user.name}</h2>
              <h3>{user.username}</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                removeUser(user.id)
              }}
            >
              Remove
            </button>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Arrow
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

UsersList.propTypes = {
  users: PropTypes.shape({}).isRequired,
  removeUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = dispatch => bindActionCreators(UsersActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList)
