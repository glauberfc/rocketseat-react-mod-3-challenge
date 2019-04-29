import { call, put, select } from 'redux-saga/effects'

import api from '../../services/api'
import { UsersActions } from '../ducks/users'
import { ModalActions } from '../ducks/modal'

export default function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.username}`)

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id))

    if (isDuplicated) {
      yield put(UsersActions.addUserFailure('This user already exists'))
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        username: data.login,
        avatar: data.avatar_url,
        coordinates: action.payload.coordinates,
      }

      yield put(UsersActions.addUserSuccess(userData))
    }
  } catch (e) {
    yield put(UsersActions.addUserFailure('Error on trying to add the user'))
  } finally {
    yield put(ModalActions.hideModal())
  }
}
