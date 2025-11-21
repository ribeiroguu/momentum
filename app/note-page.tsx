import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Trash2, Check } from 'lucide-react-native';
import { useNotes } from '@/hooks/useNotes';
import { colors, typography } from '@/styles/global';

export default function NotePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getNote, updateNote, deleteNote } = useNotes();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      const note = getNote(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id, getNote]);

  const handleSave = async () => {
    if (id) {
      await updateNote(id, title || 'Nota sem título', content);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir nota',
      'Tem certeza que deseja excluir esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (id) {
              await deleteNote(id);
              router.back();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            <Trash2 size={24} color={colors.error} />
          </TouchableOpacity>
          
          {isEditing && (
            <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
              <Check size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Título da nota"
          placeholderTextColor={colors.secondary}
          onFocus={() => setIsEditing(true)}
        />

        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Comece a escrever..."
          placeholderTextColor={colors.secondary}
          multiline
          textAlignVertical="top"
          onFocus={() => setIsEditing(true)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleInput: {
    ...typography.subtitle,
    color: colors.text,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    paddingVertical: 10,
  },
  contentInput: {
    ...typography.context,
    color: colors.text,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    minHeight: 400,
  },
});
