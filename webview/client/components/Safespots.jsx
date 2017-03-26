import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { Link }  from 'react-router';
import Star from 'react-icons/lib/md/star';
import Location from 'react-icons/lib/md/add-location';
import Right from 'react-icons/lib/fa/chevron-right';
import StarRatingComponent from 'react-star-rating-component';
import { FormControl, Button } from 'react-bootstrap'
import Header from './App';
import cn from 'classnames';
import Slider from 'react-slick';
import Time from 'react-icons/lib/md/access-time'
import Calendar from 'react-icons/lib/fa/calendar'
import { find } from 'lodash'
import Add from 'react-icons/lib/fa/plus'
import Remove from 'react-icons/lib/fa/minus-circle'
import { when } from 'mobx'

const StyledMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.ref}
    defaultZoom={19}
    defaultCenter={props.center}
  >
    {props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker);
      const onCloseClick = () => props.onCloseClick(marker);
      return (
        <Marker
          key={index}
          position={new google.maps.LatLng(marker.lat, marker.lng)}
          title={(index + 1).toString()}
          onClick={onClick}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div className='marker-body' style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
                  <b>{marker.title}</b>
                  <p>{marker.address}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {!marker.fav && (
                    <Button bsStyle="success" style={{ width: 60, height: 34, marginBottom: 10 }} onClick={() => props.handleSelectSafespot(marker)}><Add /></Button>
                  )}
                  <FormControl type='number' style={{ width: 60 }} value={0} />
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
));

@observer
export default class SafeSpots extends Component {
  constructor() {
    super()
    this.state = {
      markers: null,
      favs: [],
      center: null,
      edit: false,
    }
  }
  componentDidMount() {
    this.props.tradesStore.getPlaces();
    when(
      () => this.props.tradesStore.places,
      () => {
        const favs = this.props.tradesStore.places.favorites;
        const markers = this.props.tradesStore.places.places;
        const center = { lat: this.props.tradesStore.places.location.lat, lng: this.props.tradesStore.places.location.lng }
        markers.forEach((item) => {
          item.fav = !!find(favs, { id: item.id })
        })
        this.setState({
          markers, favs, center
        })
      }
    )
  }
  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    })
  }
  handleCloseClick = (targetMarker) => {
    this.setState({
      loaded: false,
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    })
  }
  handleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }
  handleSelectSafespot = (marker) => {
    const markers = this.state.markers
    const favs = this.state.favs
    markers.forEach((item) => {
      if (item.id === marker.id) {
        item.fav = true
      }
    })
    favs.push(marker)
    this.setState({ favs, markers })
    this.props.tradesStore.setFavorite(marker.id)
  }
  handleRemoveSafespot = (favorite) => {
    const markers = this.state.markers
    let favs = this.state.favs
    markers.forEach((item) => {
      if (item.id === favorite.id) {
        item.fav = false
      }
    })
    favs = favs.filter((item) => item.id !== favorite.id)
    this.setState({ markers, favs })
    this.props.tradesStore.removeFavorite(favorite._id)
  }
  render() {
    const { tradesStore } = this.props;
    console.log(this.state.center);
    return (
      <div>
        <Header title="SafeSpots" />
        <section className="tags-page" style={{marginTop: 60}}>
          {/* <div className='safespot-controls'>
            <FormControl type='text' onChange={this.handleChangeDate} value={this.state.date} />
          </div> */}
          {tradesStore.places && <StyledMapExampleGoogleMap
            containerElement={
              <div
                style={{ height: 400, position: 'relative' }}
              />
            }
            mapElement={
              <div
                style={{ height: '100%' }}
              />
            }
            handleSelectSafespot={this.handleSelectSafespot}
            onMarkerClick={this.handleMarkerClick}
            onCloseClick={this.handleCloseClick}
            markers={this.state.markers}
            center={this.state.center}
          />}
          {this.state.favs.length > 0 && <div className="selected-safespot">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <h4>Your saved SafeSpots</h4>
              <Button bsStyle={this.state.edit ? 'primary' : 'default'} onClick={this.handleEdit} style={{ marginLeft: 'auto' }}>Edit</Button>
            </div>
            {this.state.favs.map((item) => (
              <div style={{ display: 'flex', width: '100%', alignItems: 'center' }} key={item.id}>
                <b style={{ lineHeight: '32px' }}>{item.title}</b>
                {this.state.edit && <Button onClick={() => this.handleRemoveSafespot(item)} style={{ marginLeft: 'auto' }}><Remove/></Button>}
              </div>
            ))}
          </div>}
        </section>
      </div>
    );
  }
}
SafeSpots.contextTypes = {
  router: React.PropTypes.object.isRequired
};
