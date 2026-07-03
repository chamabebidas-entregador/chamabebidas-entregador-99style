import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function HomeScreenNovo() {

  const abrirWhatsApp = () => {
    Linking.openURL('https://wa.me/5515999999999');
    // Troque pelo seu número
  };

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>🍔 DELLYS LANCHES</Text>

      <Text style={styles.titulo}>
        JÁ ESTAMOS ATENDENDO!
      </Text>

      <Text style={styles.subtitulo}>
        Faça seu pedido agora mesmo
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={abrirWhatsApp}
      >
        <Text style={styles.textoBotao}>
          PEDIR NO WHATSAPP
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  logo: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  subtitulo: {
    color: '#FFD700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40
  },

  botao: {
    backgroundColor: '#25D366',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 10
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
