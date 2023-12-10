import { StyleSheet } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";
import HoopSquadLogoPin from "../../assets/HoopSquadLogoPin.png";

const GoogleMap = (props) => {
  return (
    <MapView
      style={[styles.googleMap, props.openModal && { opacity: 0.1 }]}
      initialRegion={{
        latitude: props.Latitude,
        longitude: props.Longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      provider={PROVIDER_GOOGLE}
    >
      <Marker
        coordinate={{
          latitude: props.Latitude,
          longitude: props.Longitude,
        }}
        pinColor="#FF0000"
        title={props.locationName}
        image={HoopSquadLogoPin}
      />
    </MapView>
  );
};

GoogleMap.defaultProps = {
  openModal: false,
  locationName: "",
};

const styles = StyleSheet.create({
  googleMap: {
    width: "100%",
    height: 200,
    marginBottom: 80,
  },
});
export default GoogleMap;
