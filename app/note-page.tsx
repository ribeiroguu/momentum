import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

export default function NotePage() {
  const [editando, setEditando] = useState(false)
  const [texto, setTexto] = useState('...')

  return (
    <View style={estilos.container}>
      <TouchableOpacity onPress={() => alert('ir para outra tela')}>
        <Text style={estilos.seta}>←</Text>
      </TouchableOpacity>

      <Text style={estilos.titulo}>Título da nota</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {editando ? (
          <TextInput style={estilos.textoEditavel} multiline value={texto} onChangeText={setTexto} />
        ) : (
          <Text style={estilos.texto}>{texto}</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={estilos.botao} onPress={() => setEditando(!editando)}>
        <Text style={estilos.icone}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  seta: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
  },
  textoEditavel: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  icone: {
    color: 'white',
    fontSize: 20,
  },
})
