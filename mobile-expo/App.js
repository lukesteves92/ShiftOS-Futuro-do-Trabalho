import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const getApiUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  const extraUrl = Constants.expoConfig?.extra?.apiUrl;

  if (envUrl && envUrl.length > 0) return envUrl;
  if (extraUrl && extraUrl.length > 0) return extraUrl;

  // Emulador Android fala com o host usando 10.0.2.2
  if (Platform.OS === 'android') return 'http://10.0.2.2:3000';

  return 'http://localhost:3000';
};

const API_URL = getApiUrl();

function FeedScreen() {
  const [ops, setOps] = useState([]);

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/api/opportunities`);
      const data = await res.json();
      setOps(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log('Erro ao carregar oportunidades', e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const apply = async (op) => {
    try {
      await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: op.id,
          name: 'Rafa Sousa',
          email: 'rafa.sousa@example.com',
          phone: '+55 11 99999-0000',
          note: 'Gostaria de participar desta microatividade.',
        }),
      });
      alert('Candidatura enviada!');
    } catch (e) {
      console.log('Erro ao enviar candidatura', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>
            {item.title?.charAt(0)?.toUpperCase() || 'S'}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text numberOfLines={2} style={styles.description}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.cardFooter}>
        {item.pay ? <Text style={styles.pay}>{item.pay}</Text> : <View />}
        <TouchableOpacity style={styles.button} onPress={() => apply(item)}>
          <Text style={styles.buttonText}>Candidatar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Oportunidades</Text>
        <Text style={styles.screenSubtitle}>
          Encontre microatividades alinhadas ao seu ShiftOS Passaporte.
        </Text>
      </View>
      <FlatList
        data={ops}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma oportunidade encontrada. Crie algumas no painel web.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function ApplicationsScreen() {
  const [apps, setApps] = useState([]);

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applications`);
      const data = await res.json();
      const filtered = Array.isArray(data)
        ? data.filter((a) => a.email === 'rafa.sousa@example.com')
        : [];
      setApps(filtered);
    } catch (e) {
      console.log('Erro ao carregar candidaturas', e);
    }
  };

  useEffect(() => {
    const id = setInterval(load, 3000);
    load();
    return () => clearInterval(id);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.opportunity?.title || 'Oportunidade'}
      </Text>
      <Text style={styles.description}>
        Status: {item.status || 'PENDING'}
      </Text>
      {item.note ? (
        <Text style={styles.description}>{item.note}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Minhas candidaturas</Text>
        <Text style={styles.screenSubtitle}>
          Acompanhe o status das oportunidades que você se inscreveu.
        </Text>
      </View>
      <FlatList
        data={apps}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Você ainda não se candidatou a nenhuma oportunidade.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Rafa Sousa</Text>
        <Text style={styles.description}>
          Profissional em transição para o futuro do trabalho digital.
        </Text>
        <Text style={styles.description}>
          ShiftOS — Passaporte de microatividades e microjobs.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#050509',
            borderTopColor: '#15151f',
          },
          tabBarActiveTintColor: '#6E56CF',
          tabBarInactiveTintColor: '#7A7A90',
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Atividades') {
              return <Ionicons name="briefcase-outline" size={size} color={color} />;
            }
            if (route.name === 'Candidaturas') {
              return <Ionicons name="list-circle-outline" size={size} color={color} />;
            }
            if (route.name === 'Perfil') {
              return <Ionicons name="person-circle-outline" size={size} color={color} />;
            }
            return null;
          },
        })}
      >
        <Tab.Screen name="Atividades" component={FeedScreen} />
        <Tab.Screen name="Candidaturas" component={ApplicationsScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050509',
  },
  screenHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  screenSubtitle: {
    color: '#A1A1B5',
    fontSize: 13,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#0B0B12',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1B1B2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    color: '#A1A1B5',
    marginTop: 4,
    fontSize: 13,
  },
  pay: {
    color: '#6E56CF',
    fontWeight: '600',
    fontSize: 13,
  },
  cardFooter: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#6E56CF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyText: {
    color: '#7A7A90',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 32,
  },
});
