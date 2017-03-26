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
import find from 'lodash/find'
import Add from 'react-icons/lib/fa/plus'
import Remove from 'react-icons/lib/fa/minus-circle'
import { when } from 'mobx'

const StyledMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
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
                  {!marker.selected && (
                    <Button bsStyle="success" style={{ width: 60, height: 34, marginBottom: 10 }} onClick={() => props.handleSelectSafespot(marker)}><Add /></Button>
                  )}
                  <FormControl type='number' style={{ width: 60 }} value={0}/>
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
export default class TradePlace extends Component {
  constructor() {
    super()
    this.state = {
      selected: null,
      date: null,
      time: null,
      markers: null
    }
  }
  componentDidMount() {
    this.props.tradesStore.getPlaces();
    when(
      () => this.props.tradesStore.places,
      () => this.setState({ markers: this.props.tradesStore.places.places })
    )
  }
  handleAccept = () => {
    const { date, time, selected } = this.state
    const data = {
      finishedAt: new Date(`${date} ${time}`),
      safespot: selected.id
    }
    this.props.tradesStore.acceptTrade(this.context.router, data);
  }
  handleChangeDate = (e) => {
    this.setState({ date: e.target.value });
  }
  handleChangeTime = (e) => {
    this.setState({ time: e.target.value });
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
  handleSelectSafespot = (marker) => {
    const markers = this.state.markers
    markers.forEach((item) => {
      if (item.id === marker.id) {
        item.selected = true
      }
    })
    this.setState({ selected: marker, markers })
  }
  handleRemoveSafespot = () => {
    const markers = this.state.markers
    markers.forEach((item) => {
      if (item.id === this.state.selected.id) {
        item.selected = false
      }
    })
    this.setState({ markers, selected: null })
  }
  render() {
    const { tradesStore } = this.props;
    return (
      <div>
        <Header title="Suggest a time & place..." close
                closeAction={() => this.context.router.push('/feed')}/>
        <section className="tags-page" style={{marginTop: 60}}>
          <div className='safespot-controls'>
            <FormControl type='date' onChange={this.handleChangeDate} value={this.state.date} />
            <Calendar/>
            <Time/>
            <FormControl type='time' onChange={this.handleChangeTime} value={this.state.time} style={{ width: 180 }} />
          </div>
          {tradesStore.places && <StyledMapExampleGoogleMap
            containerElement={
              <div
                style={{ height: 400, position: 'relative', marginTop: 20 }}
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
            // center={new google.maps.LatLng(53.5111153, 49.2638412)}
            center={new google.maps.LatLng(tradesStore.places.location.lat, tradesStore.places.location.lng)}
          />}
          {this.state.selected && (
            <div className="selected-safespot">
              <Button bsStyle="danger" bsSize="large" onClick={this.handleRemoveSafespot} style={{ float: 'right', height: 40 }}><Remove /></Button>
              <b>Selected Safespot</b>
              <p>{this.state.selected.title}</p>
              <p>{this.state.selected.address}</p>
            </div>
          )}
          <div className='tags-footer'>
            <div onClick={this.state.selected && this.handleAccept} className={cn({
              "btn": true,
              "btn-link": true,
              "next": true,
              "disabled": !this.state.selected
            })}>
              Send<Right/></div>
          </div>
        </section>
      </div>
    );
  }
}
TradePlace.contextTypes = {
  router: React.PropTypes.object.isRequired
};
