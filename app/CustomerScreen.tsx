import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

type Customer = {
  id: number;
  nama: string;
  no_hp: string;
  alamat: string;
};

export default function CustomerScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Fungsi untuk mengambil data dari API Laravel
  const fetchCustomers = async () => {
    try {
        const response = await fetch('http://10.0.2.2:8000/api/customer');
        const data = await response.json();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  // Mengambil data ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fungsi untuk menangani klik pada customer
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    alert(
      `Nama: ${customer.nama}\nNomor HP: ${customer.no_hp}\nAlamat: ${customer.alamat}`
    );
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelectCustomer(item)}>
      <Text style={styles.name}>{item.nama}</Text>
      <Text style={styles.phone}>{item.no_hp}</Text>
      <Text style={styles.address}>{item.alamat}</Text>
    </TouchableOpacity>
  );

  // Menampilkan indikator loading jika data sedang diambil
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Customer</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4CAF50',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  phone: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
