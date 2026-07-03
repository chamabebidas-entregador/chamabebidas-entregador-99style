import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { getOrders, updateOrder } from '../services/api';
import { palette, money } from '../components/styles';

export default function OrderScreen({ navigation, route }) {
  const themeMode = route.params?.themeMode || 'light';
  const id = route.params?.id;
  const c = palette(themeMode);
  const styles = makeStyles(c);
  const [order, setOrder] = useState(null);
  const [pin, setPin] = useState('');
  const [code, setCode] = useState('');

  async function load() {
    const data = await getOrders();
    setOrder(data.find(o => o.id === id) || data[0]);
  }
  useEffect(() => { load().catch(() => Alert.alert('Erro', 'Pedido não encontrado')); }, []);

  async function accept() {
    const updated = await updateOrder(order.id, { status: 'driver_accepted' });
    setOrder(updated);
    Alert.alert('Sucesso', 'Entrega aceita.');
  }
  async function pickup() {
    if (pin !== String(order.pinRetirada)) return Alert.alert('Código inválido', 'PIN da adega incorreto.');
    const updated = await updateOrder(order.id, { status: 'picked_up' });
    setOrder(updated);
    Alert.alert('Retirada confirmada', 'Agora siga para o cliente.');
  }
  async function deliver() {
    if (code !== String(order.deliveryCode)) return Alert.alert('Código inválido', 'Código do cliente incorreto.');
    await updateOrder(order.id, { status: 'delivered' });
    Alert.alert('Finalizado', 'Pedido entregue com sucesso.');
    navigation.navigate('Earnings', { themeMode });
  }

  if (!order) return <View style={styles.page}><Text style={styles.title}>Carregando...</Text></View>;
  const items = order.items || [];
  return <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>
    <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.close}>×</Text></TouchableOpacity><Text style={styles.headTitle}>Novo pedido</Text><View style={{width:30}} /></View>
    <View style={styles.container}>
      <View style={styles.rowBetween}><Text style={styles.yellowText}>Entrega • ChamaBebidas</Text><Text style={styles.timer}>Aceitar</Text></View>
      <Text style={styles.price}>{money(order.total)}</Text>
      <Text style={styles.sub}>Status: {order.status}</Text>
      <InfoCard dot={c.yellow} title="Adega" name={order.storeName || 'Adega'} desc={`Pedido ${order.id}`} c={c} styles={styles} />
      <InfoCard dot={c.green} title="Cliente" name={order.customerName || 'Cliente'} desc={order.address || 'Endereço não informado'} c={c} styles={styles} />
      <View style={styles.card}><Text style={styles.cardTitle}>Itens</Text>{items.map((it, i) => <Text key={i} style={styles.item}>{it.quantity}x {it.name} • {money(it.price)}</Text>)}</View>
      {['pending','preparing','ready'].includes(order.status) && <TouchableOpacity style={styles.yellowBtn} onPress={accept}><Text style={styles.btnText}>Aceitar pedido</Text></TouchableOpacity>}
      {order.status === 'driver_accepted' && <View style={styles.card}><Text style={styles.cardTitle}>Código da adega</Text><TextInput value={pin} onChangeText={setPin} keyboardType="numeric" placeholder="PIN de retirada" placeholderTextColor={c.muted} style={styles.input}/><TouchableOpacity style={styles.yellowBtn} onPress={pickup}><Text style={styles.btnText}>Confirmar retirada</Text></TouchableOpacity></View>}
      {order.status === 'picked_up' && <View style={styles.card}><Text style={styles.cardTitle}>Código do cliente</Text><TextInput value={code} onChangeText={setCode} keyboardType="numeric" placeholder="Código de entrega" placeholderTextColor={c.muted} style={styles.input}/><TouchableOpacity style={styles.yellowBtn} onPress={deliver}><Text style={styles.btnText}>Finalizar entrega</Text></TouchableOpacity></View>}
      <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.refuse}>Voltar</Text></TouchableOpacity>
    </View>
  </ScrollView>
}
function InfoCard({ dot, title, name, desc, styles }){return <View style={styles.card}><View style={{flexDirection:'row',gap:12}}><View style={[styles.dot,{backgroundColor:dot}]} /><View style={{flex:1}}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.name}>{name}</Text><Text style={styles.desc}>{desc}</Text></View><Text style={styles.phone}>☎</Text></View></View>}
function makeStyles(c){return StyleSheet.create({page:{flex:1,backgroundColor:c.bg},header:{height:110,paddingTop:44,paddingHorizontal:24,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:c.card},close:{fontSize:38,color:c.text},headTitle:{fontSize:22,fontWeight:'800',color:c.text},container:{padding:22},rowBetween:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},yellowText:{color:c.yellow,fontWeight:'700',fontSize:16},timer:{backgroundColor:'rgba(255,204,0,.18)',color:c.text,paddingHorizontal:12,paddingVertical:8,borderRadius:8,fontWeight:'800'},price:{fontSize:42,fontWeight:'900',color:c.text,marginTop:16},sub:{fontSize:17,color:c.muted,marginVertical:8},card:{backgroundColor:c.card,borderRadius:16,padding:18,marginTop:12,borderWidth:1,borderColor:c.line},dot:{width:12,height:12,borderRadius:6,marginTop:6},cardTitle:{fontSize:16,fontWeight:'700',color:c.text},name:{fontSize:17,fontWeight:'800',color:c.text,marginTop:4},desc:{fontSize:15,color:c.muted,marginTop:4},phone:{fontSize:26,color:c.text},item:{fontSize:16,color:c.text,marginTop:8},yellowBtn:{backgroundColor:c.yellow,borderRadius:14,paddingVertical:16,alignItems:'center',marginTop:20},btnText:{fontSize:20,fontWeight:'900',color:'#111'},refuse:{textAlign:'center',fontSize:17,color:c.muted,marginTop:20,fontWeight:'700'},input:{borderWidth:1,borderColor:c.line,borderRadius:12,padding:14,fontSize:18,color:c.text,marginTop:14}})}
