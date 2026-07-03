import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { palette, money } from '../components/styles';

export default function EarningsScreen({ navigation, route }) {
  const themeMode = route.params?.themeMode || 'light';
  const c = palette(themeMode); const styles = makeStyles(c);
  const deliveries = [12.5, 15.3, 10, 8]; const total = 156.8;
  return <View style={styles.page}>
    <View style={styles.header}><View style={{width:26}}/><Text style={styles.title}>Ganhos</Text><Text style={styles.help}>?</Text></View>
    <ScrollView contentContainerStyle={{padding:22}}>
      <View style={styles.segment}><Text style={styles.segmentActive}>Diário</Text><Text style={styles.segmentText}>Semanal</Text><Text style={styles.segmentText}>Mensal</Text></View>
      <Text style={styles.date}>Hoje</Text><Text style={styles.total}>{money(total)}</Text><Text style={styles.count}>4 entregas</Text>
      <View style={styles.card}><Row label="Valor das entregas" value={money(124.8)} c={c}/><Row label="Taxa ChamaBebidas" value="- R$ 18,72" red c={c}/><Row label="Promoções" value="+ R$ 50,72" green c={c}/><View style={styles.line}/><Row label="Saldo" value={money(total)} green bold c={c}/></View>
      <Text style={styles.section}>Histórico de ganhos</Text>
      {deliveries.map((v,i)=><View style={styles.history} key={i}><Text style={styles.bag}>▣</Text><View style={{flex:1}}><Text style={styles.histTitle}>Entrega</Text><Text style={styles.histTime}>{['19:27','18:45','17:50','16:30'][i]}</Text></View><Text style={styles.histValue}>{money(v)}</Text></View>)}
    </ScrollView>
    <View style={styles.tabs}><TouchableOpacity onPress={() => navigation.navigate('Home',{themeMode})}><Text style={styles.tab}>⌂\nInício</Text></TouchableOpacity><Text style={[styles.tab,{color:c.yellow}]}>$\nGanhos</Text><Text style={styles.tab}>▮\nDesempenho</Text><Text style={styles.tab}>●\nConta</Text></View>
  </View>
}
function Row({label,value,c,green,red,bold}){return <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}><Text style={{color:c.text,fontSize:16,fontWeight:bold?'800':'400'}}>{label}</Text><Text style={{color:green?c.green:red?c.red:c.text,fontSize:16,fontWeight:'800'}}>{value}</Text></View>}
function makeStyles(c){return StyleSheet.create({page:{flex:1,backgroundColor:c.bg},header:{height:110,paddingTop:44,paddingHorizontal:24,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:c.card},title:{fontSize:22,fontWeight:'900',color:c.text},help:{fontSize:22,color:c.text,borderWidth:1,borderColor:c.muted,width:28,height:28,borderRadius:14,textAlign:'center'},segment:{flexDirection:'row',backgroundColor:c.card2,borderRadius:22,padding:4},segmentActive:{flex:1,backgroundColor:c.yellow,borderRadius:18,textAlign:'center',padding:10,fontWeight:'900',color:'#111'},segmentText:{flex:1,textAlign:'center',padding:10,color:c.muted,fontWeight:'700'},date:{textAlign:'center',color:c.muted,fontSize:16,marginTop:26},total:{textAlign:'center',color:c.text,fontSize:42,fontWeight:'900',marginTop:8},count:{textAlign:'center',color:c.text,fontSize:17,fontWeight:'700',marginBottom:22},card:{backgroundColor:c.card,borderRadius:16,padding:18,borderWidth:1,borderColor:c.line},line:{height:1,backgroundColor:c.line,marginVertical:8},section:{fontSize:18,fontWeight:'900',color:c.text,marginTop:28,marginBottom:10},history:{flexDirection:'row',alignItems:'center',backgroundColor:c.card,borderRadius:14,padding:16,marginBottom:10,borderWidth:1,borderColor:c.line},bag:{fontSize:26,color:c.yellow,marginRight:14},histTitle:{fontSize:16,fontWeight:'800',color:c.text},histTime:{color:c.muted,marginTop:3},histValue:{fontSize:17,fontWeight:'900',color:c.text},tabs:{backgroundColor:c.card,borderTopWidth:1,borderTopColor:c.line,paddingTop:10,paddingBottom:16,paddingHorizontal:26,flexDirection:'row',justifyContent:'space-between'},tab:{textAlign:'center',color:c.muted,fontSize:12}})}
