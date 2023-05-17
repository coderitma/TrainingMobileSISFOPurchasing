import _ from "lodash";
import { useState, useEffect } from "react";
import { Modal } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  List,
  Portal,
  Provider,
} from "react-native-paper";

const WidgetPemasokChoice = () => {
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => setComplete(true), 500);
    debounce();
  }, []);

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            animationType="fade"
            style={{ backgroundColor: "#ffffff" }}
            visible={visible}>
            <Appbar.Header>
              <Appbar.Action
                icon="arrow-left"
                onPress={() => setVisible(false)}
              />
              <Appbar.Content title="Pilih Pemasok" />
            </Appbar.Header>
          </Modal>
        </Portal>

        <List.Section style={{ paddingHorizontal: 16 }}>
          <List.Item
            title="Pilih Pemasok"
            onPress={() => setVisible(true)}
            left={() => (
              <>
                {!complete && <ActivityIndicator animating={!complete} />}
                {complete && <List.Icon icon="account-search-outline" />}
              </>
            )}></List.Item>
        </List.Section>
      </Provider>
    </>
  );
};

export default WidgetPemasokChoice;
