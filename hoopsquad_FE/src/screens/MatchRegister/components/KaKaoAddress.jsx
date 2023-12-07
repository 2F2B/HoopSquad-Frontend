import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import { Ionicons } from "@expo/vector-icons";

const KaKaoAddress = (props) => {
  return (
    <Modal>
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
          <TouchableOpacity onPress={() => props.setAddressModalOpen(false)}>
            <Ionicons
              name="chevron-back"
              size={30}
              color="black"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>주소 등록</Text>
        </View>
      </View>
      <Postcode
        style={{ width: "100%", height: "100%" }}
        jsOptions={{ animation: true, hideMapBtn: true }}
        onSelected={(data) => {
          props.setAddress(data.address);
          props.setAddressModalOpen(false);
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    justifyContent: "space-between",
    borderBottomColor: "#E2E2E2",
  },
  headerTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
});
export default KaKaoAddress;
