import _ from "lodash";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ScreenPembelianCreate = ({ navigation }) => {
  const [pembelian, setPembelian] = useState({});
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState({});
  const [complete, setComplete] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInput = (name, value) => {
    setPembelian((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    setComplete(false);
    const debounce = _.debounce(() => {
      setComplete(true);
    }, 500);

    debounce();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => {}} />
        <Appbar.Content title="Buat Transaksi Pembelian" />
        <Appbar.Action icon="trash-can-outline" onPress={() => {}} />
      </Appbar.Header>
      {complete && (
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
            <TextInput
              value={pembelian.faktur}
              onChangeText={(text) => handleInput("faktur", text)}
              label="Nomor Faktur"
              editable={false}
              right={<TextInput.Icon onPress={() => {}} icon="reload" />}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
};

export default ScreenPembelianCreate;
