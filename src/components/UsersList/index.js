import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.css'
import { UsersActions } from '../../store/ducks/users'

const UsersList = ({ users, removeUser }) => (
  <div className="left-bar">
    {!users.data.length && (
      <div className="empty-list">
        <div className="exclamation">
          <FontAwesomeIcon icon="exclamation-circle" />
        </div>
        <p>Not users added</p>
      </div>
    )}
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
              <FontAwesomeIcon icon="times-circle" className="remove" />
            </button>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon="chevron-right" className="go-to-page" />
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList)
