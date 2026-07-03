import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

import { getOrders } from './api';
import { palette, money } from './styles';

export default function EarningsScreen({ navigation, route }) {
  const themeMode = route.params?.themeMode || 'light';
  const c = palette(themeMode);
  const styles = makeStyles(c);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getOrders();
      const available = data.filter(o =>
        ['pending', 'preparing', 'ready', 'driver_accepted'].includes(o.status)
      );
      setOrders(available);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível buscar pedidos da API.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const first = orders[0];

  return (
    <View style={styles.page}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>

        <View style={styles.online}>
          <Text style={styles.onlineText}>Online</Text>
          <View style={styles.dot} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home', { themeMode })}>
          <Text style={styles.bell}>Início</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.3557,
          longitude: -47.8569,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <Circle
          center={{ latitude: -23.3557, longitude: -47.8569 }}
          radius={900}
          strokeColor="rgba(255,204,0,.65)"
          fillColor="rgba(255,204,0,.22)"
        />

        <Circle
          center={{ latitude: -23.34, longitude: -47.88 }}
          radius={650}
          strokeColor="rgba(255,204,0,.65)"
          fillColor="rgba(255,204,0,.20)"
        />

        <Marker
          coordinate={{ latitude: -23.3557, longitude: -47.8569 }}
          title="Você"
        />
      </MapView>

      <View style={styles.badge}>
        <Text style={styles.badgeIcon}>▮▮▮</Text>
        <Text style={styles.badgeText}>Região com mais pedidos</Text>
      </View>

      <View style={styles.sheet}>
        {loading ? (
          <ActivityIndicator />
        ) : first ? (
          <>
            <Text style={styles.sheetTitle}>Pedido disponível</Text>
            <Text style={styles.sheetSub}>
              {first.storeName || 'Adega'} • {money(first.total)}
            </Text>

            <TouchableOpacity
              style={styles.yellowBtn}
              onPress={() => navigation.navigate('Order', { id: first.id, themeMode })}
            >
              <Text style={styles.yellowBtnText}>Ver pedido</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.searchCircle}>
              <Text style={styles.search}>⌕</Text>
            </View>

            <Text style={styles.sheetTitle}>Procurando pedidos</Text>
            <Text style={styles.sheetSub}>
              Fique atento, você será notificado quando surgir um pedido.
            </Text>
          </>
        )}

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => navigation.navigate('Home', { themeMode })}>
            <Text style={styles.tab}>⌂{'\n'}Início</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.tab, { color: c.yellow }]}>${'\n'}Ganhos</Text>
          </TouchableOpacity>

          <Text style={styles.tab}>▮{'\n'}Desempenho</Text>
          <Text style={styles.tab}>●{'\n'}Conta</Text>
        </View>
      </View>
    </View>
  );
}

function makeStyles(c) {
  return StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: c.bg,
    },
    topbar: {
      height: 110,
      paddingTop: 42,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: c.card,
    },
    menu: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuText: {
      fontSize: 34,
      color: c.text,
    },
    online: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    onlineText: {
      fontSize: 20,
      fontWeight: '700',
      color: c.text,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: c.green,
    },
    bell: {
      fontSize: 15,
      fontWeight: '800',
      color: c.text,
    },
    map: {
      flex: 1,
      backgroundColor: c.map,
    },
    badge: {
      position: 'absolute',
      top: 150,
      right: 20,
      backgroundColor: c.card,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 8,
      elevation: 4,
    },
    badgeIcon: {
      color: c.yellow,
      fontWeight: '900',
    },
    badgeText: {
      color: c.text,
      fontWeight: '600',
    },
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: c.card,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 24,
      minHeight: 290,
      alignItems: 'center',
    },
    searchCircle: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: c.card2,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
    search: {
      fontSize: 42,
      color: c.yellow,
    },
    sheetTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: c.text,
      textAlign: 'center',
    },
    sheetSub: {
      fontSize: 16,
      color: c.muted,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 18,
    },
    yellowBtn: {
      backgroundColor: c.yellow,
      borderRadius: 14,
      paddingVertical: 16,
      paddingHorizontal: 40,
      width: '100%',
      alignItems: 'center',
    },
    yellowBtnText: {
      fontSize: 18,
      fontWeight: '800',
      color: '#111',
    },
    tabs: {
      borderTopWidth: 1,
      borderTopColor: c.line,
      marginTop: 24,
      paddingTop: 14,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tab: {
      textAlign: 'center',
      color: c.muted,
      fontSize: 12,
    },
  });
}
