import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'

import './styles.css'

import { ModalActions } from '../../store/ducks/modal'
import { UsersActions } from '../../store/ducks/users'

function AddUser({ modal, loading, addUserRequest, hideModal }) {
  const [userInput, setUserInput] = useState(null)

  function handleInputChange(e) {
    setUserInput(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    if (loading) return
    if (!userInput) return

    const { coordinates } = modal

    addUserRequest(userInput, coordinates)
    setUserInput(null)
  }

  function handleHideModal() {
    hideModal()
    setUserInput(null)
  }

  return (
    <ReactModal
      isOpen={modal.visible}
      onRequestClose={handleHideModal}
      contentLabel="Add user modal"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <h2>Add new user</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <input
          placeholder="Github username"
          value={userInput}
          onChange={handleInputChange}
        />
        <div className="buttons-container">
          <button type="button" onClick={handleHideModal}>
            Cancel
          </button>
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Save'}
          </button>
        </div>
      </form>
    </ReactModal>
  )
}

AddUser.propTypes = {
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

const mapStateToProps = state => ({
  modal: state.modal,
  loading: state.users.loading,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ModalActions, ...UsersActions }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser)
