/**
 * Types
 */
export const ModalTypes = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
}

/**
 * Reducer
 */
const initialState = {
  visible: false,
  coordinates: null,
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case ModalTypes.SHOW:
      return { visible: true, coordinates: action.payload.coordinates }
    case ModalTypes.HIDE:
      return { ...initialState }
    default:
      return state
  }
}

/**
 * Action creators
 */
export const ModalActions = {
  showModal: coordinates => ({
    type: ModalTypes.SHOW,
    payload: { coordinates },
  }),
  hideModal: () => ({
    type: ModalTypes.HIDE,
  }),
}
