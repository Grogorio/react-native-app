import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { autobind } from 'core-decorators'
import { IBusStop, IBusLineMap } from '../../models'
import { theme, isIOS } from '../../utils'
import { colors } from '../../styles'
import { IDrawLatLng, BusLineDirection } from '../../models/bus-line'
import { MapMarker } from './map-marker'

export class Map extends React.Component<IBusLineMap> {
  private map: MapView

  public render(): React.ReactNode {
    const { line, showUserPosition, disableZoom, disableMovement } = this.props
    if (!line) return null
    let region = line.direction === BusLineDirection.forward ? line.forthRegion : line.forthRegion
    if (!region) {
      const middlePoint = line.drawStops[Math.floor(line.drawStops.length / 2)]
      region = {
        latitude: middlePoint.location.latitude,
        longitude: middlePoint.location.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      }
    }
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          ref={component => this.map = component}
          customMapStyle={theme}
          style={styles.map}
          initialRegion={region}
          cacheEnabled={true}
          loadingEnabled={true}
          zoomControlEnabled={false}
          showsScale={false}
          showsMyLocationButton={false}
          showsUserLocation={showUserPosition}
          zoomEnabled={!disableZoom}
          pitchEnabled={!disableMovement}
          scrollEnabled={!disableMovement}
          rotateEnabled={!disableMovement}
          moveOnMarkerPress={!disableMovement}
          mapPadding={{ bottom: isIOS ? 0 : 40, top: 0, left: 0, right: 0 }}
        >
          {this.drawPolylines(line.drawRoute)}
          {this.drawMarkers(line.drawStops)}
        </MapView>
      </View>
    )
  }

  @autobind
  private drawMarkers(stops: IBusStop[]): React.ReactNode {
    return stops
      .filter(x => (this.props.hideNoUsedStops ? x.isSelected : x))
      .map(x => (
        <MapMarker
          key={x.name}
          stop={x}
          disableCallouts={this.isCalloutDisabled(x)}
          hideCallouts={this.props.hideCallouts}
          onStopSelected={this.props.onStopSelected}
          onMarkerPress={this.onMarkerPress}
        />
      ))
  }

  @autobind
  private onMarkerPress(stop: IBusStop): void {
    this.map.animateToRegion({
      latitude: stop.location.latitude,
      longitude: stop.location.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    }, 350)
  }

  private isCalloutDisabled(stop: IBusStop): boolean {
    const { disableCallouts, pickedOriginBusStop, pickedDestinationBusStop, line } = this.props
    if (disableCallouts) return true

    const stopIndex = line.drawStops.indexOf(stop)

    const originIndex = pickedOriginBusStop
      ? line.drawStops.indexOf(pickedOriginBusStop)
      : null

    const destinationIndex = pickedDestinationBusStop
      ? line.drawStops.indexOf(pickedDestinationBusStop)
      : null

    // TODO: Refactor whenever there's time...
    if (stopIndex === originIndex || stopIndex === destinationIndex) return false
    else if (!originIndex && !destinationIndex) return false
    else if (stopIndex < destinationIndex && !originIndex) return false
    else if (stopIndex > originIndex && !destinationIndex) return false
    else return true
  }

  @autobind
  private drawPolylines(lines: IDrawLatLng[]): React.ReactNode {
    return lines
      .filter(x => x.line.length)
      .map((x, i) => (
        <Polyline
          key={i}
          coordinates={x.line}
          strokeColor={x.isDisabled ? colors.greyDark : colors.yellow}
          strokeWidth={5}
          lineCap={'round'}
          lineJoin={'round'}
        />
      ))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
