import React, { useEffect, useReducer } from 'react'
import MapGL, { Marker } from 'react-map-gl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Avatar } from './styles'
import { ModalActions } from '../../store/ducks/modal'

const initialState = {
  latitude: -21.975923,
  longitude: -46.780686,
  zoom: 15,
  width: window.innerWidth,
  height: window.innerHeight,
}

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { ...action.payload }
    case 'resize':
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      }
    default:
      return state
  }
}

function Map({ showModal, users }) {
  const [viewport, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    function resize() {
      dispatch({
        type: 'resize',
        payload: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      })
    }

    window.addEventListener('resize', resize)
    resize()

    return () => window.removeEventListener('resize', resize)
  }, [])

  function handleViewportChange(newViewport) {
    dispatch({ type: 'update', payload: newViewport })
  }

  function handleMapClick(e) {
    const [longitude, latitude] = e.lngLat

    showModal({ latitude, longitude })
  }

  return (
    <MapGL
      {...viewport}
      onClick={handleMapClick}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={handleViewportChange}
    >
      {users.data.map(user => (
        <Marker
          key={user.id}
          latitude={user.coordinates.latitude}
          longitude={user.coordinates.longitude}
        >
          <Avatar src={user.avatar} alt={`${user.name} avatar`} />
        </Marker>
      ))}
    </MapGL>
  )
}

Map.propTypes = {
  showModal: PropTypes.func.isRequired,
  users: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.string,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModalActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
