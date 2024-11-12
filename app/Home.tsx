import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Tipe data untuk menu
type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  screen: string;
};

// Data menu
const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Customer',
    icon: <Ionicons name="people" size={50} color="#4CAF50" />,
    screen: 'CustomerScreen',
  },
  {
    id: '2',
    title: 'Paket',
    icon: <MaterialIcons name="local-laundry-service" size={50} color="#FF9800" />,
    screen: 'PaketScreen',
  },
  {
    id: '3',
    title: 'Metode Pembayaran',
    icon: <Ionicons name="card" size={50} color="#2196F3" />,
    screen: 'PaymentMethodScreen',
  },
  {
    id: '4',
    title: 'Transaksi',
    icon: <MaterialIcons name="receipt" size={50} color="#F44336" />,
    screen: 'TransactionScreen',
  },
];

// Komponen Home
const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  // Fungsi navigasi ke halaman tertentu
  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  // Render setiap item menu
  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleNavigate(item.screen)}
    >
      {item.icon}
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kasir Laundry</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default HomeScreen;

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: 140,
    height: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: '#555',
  },
});
