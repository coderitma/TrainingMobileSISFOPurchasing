import { useState } from "react";

const ScreenPembelianCreate = ({ navigation }) => {
  const [pembelian, setPembelian] = useState({});
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState({});
  const [complete, setComplete] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInput = (name, value) => {
    setPembelian((values) => ({ ...values, [name]: value }));
  };
};

export default ScreenPembelianCreate;
