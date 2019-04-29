import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import './styles.css'

import { ModalActions } from '../../store/ducks/modal'
import { UsersActions } from '../../store/ducks/users'

class AddUser extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      visible: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      coordinates: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ]),
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
  }

  state = {
    userInput: '',
  }

  handleInputChange = e => this.setState({ userInput: e.target.value })

  handleFormSubmit = (e) => {
    e.preventDefault()

    const { loading } = this.props

    if (loading) return

    const { userInput } = this.state

    if (!userInput) return

    const {
      addUserRequest,
      modal: { coordinates },
    } = this.props

    addUserRequest(userInput, coordinates)
    this.setState({ userInput: '' })
  }

  handleHideModal = () => {
    const { hideModal } = this.props
    hideModal()
    this.setState({ userInput: '' })
  }

  render() {
    const { modal, loading } = this.props
    const { userInput } = this.state

    return (
      <Modal
        isOpen={modal.visible}
        onRequestClose={this.handleHideModal}
        contentLabel="Add user modal"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <h2>Add new user</h2>
        <form onSubmit={this.handleFormSubmit} className="form">
          <input
            placeholder="Github username"
            value={userInput}
            onChange={this.handleInputChange}
          />
          <div className="buttons-container">
            <button type="button" onClick={this.handleHideModal}>
              Cancel
            </button>
            <button type="submit">
              {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  loading: state.users.loading,
})

const mapDispatchToProps = dispatch => bindActionCreators({ ...ModalActions, ...UsersActions }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser)
