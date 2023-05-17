import _ from "lodash";
import { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { Appbar, Divider, List, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ServiceBaseHumanDate,
  ServiceBaseIsDuplicateArray,
  ServiceBaseRandomID,
} from "../../services/ServiceBase";
import WidgetPemasokChoice from "../../widgets/pemasok/WidgetPemasokChoice";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";

const ScreenPembelianCreate = ({ navigation }) => {
  const [pembelian, setPembelian] = useState({});
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState({});
  const [complete, setComplete] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInput = (name, value) => {
    if (name === "tanggal") setShowDatePicker(false);
    setPembelian((values) => ({ ...values, [name]: value }));
  };

  const randomFaktur = () => {
    handleInput("faktur", ServiceBaseRandomID("BELI"));
  };

  const addPemasok = (pemasok) => {
    const debounce = _.debounce(() => setPemasok(pemasok), 100);
    debounce();
  };

  const update = (item) => {
    const debounce = _.debounce(() => {
      setDaftarItemBeli((values) => {
        const items = [...values];
        const b = items.find((value) => value.kodeBarang === item.kodeBarang);
        const i = items.findIndex(
          (value) => value.kodeBarang === item.kodeBarang
        );

        b.jumlahBeli = b.jumlahBeli + 1;
        b.subtotal = b.jumlahBeli * b.hargaBeli;
        items[i] = b;
        return items;
      });
    }, 100);

    debounce();
  };

  const add = (item) => {
    const debounce = _.debounce(() => {
      const payload = {
        kodeBarang: item.kodeBarang,
        namaBarang: item.namaBarang,
        hargaBeli: item.hargaBeli,
        jumlahBeli: 1,
        subtotal: 1 * item.hargaBeli,
      };

      setDaftarItemBeli((values) => [...values, payload]);
    }, 100);

    debounce();
  };

  const addOrUpdate = (item) => {
    const isDuplicate = ServiceBaseIsDuplicateArray(
      daftarItemBeli,
      item.kodeBarang,
      "kodeBarang"
    );

    if (isDuplicate) {
      update(item);
    } else {
      add(item);
    }
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
              right={
                <TextInput.Icon onPress={() => randomFaktur()} icon="reload" />
              }
            />
            <TextInput
              label="Tanggal"
              editable={false}
              value={`${ServiceBaseHumanDate(pembelian.tanggal) || ""}`}
              right={
                <TextInput.Icon
                  onPress={() => setShowDatePicker(true)}
                  icon="calendar"
                />
              }
            />
          </View>
          <Divider />
          {showDatePicker && (
            <DateTimePicker
              value={pembelian.tanggal || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, value) => handleInput("tanggal", value)}
            />
          )}

          <WidgetPemasokChoice onPress={addPemasok} />

          {pemasok.kodePemasok && (
            <List.Item
              title={pemasok.namaPemasok}
              description={pemasok.teleponPemasok}
            />
          )}

          <Divider />

          <WidgetBarangChoice onPress={addOrUpdate} />
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
};

export default ScreenPembelianCreate;
