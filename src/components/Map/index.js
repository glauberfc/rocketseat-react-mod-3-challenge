import React, { Component } from 'react'
import MapGL, { Marker } from 'react-map-gl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Avatar } from './styles'
import { ModalActions } from '../../store/ducks/modal'

class Map extends Component {
  state = {
    viewport: {
      latitude: -21.975923,
      longitude: -46.780686,
      zoom: 15,
      width: window.innerWidth,
      height: window.innerHeight,
    },
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const { viewport } = this.state
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    })
  }

  handleViewportChange = viewport => this.setState({ viewport })

  handleMapClick = (e) => {
    console.log(e.lngLat)
    const [longitude, latitude] = e.lngLat
    const { showModal } = this.props

    showModal({ latitude, longitude })
  }

  render() {
    const { users } = this.props
    const { viewport } = this.state
    return (
      <MapGL
        {...viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={this.handleViewportChange}
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
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
