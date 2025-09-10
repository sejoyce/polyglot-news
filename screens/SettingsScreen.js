import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LanguageContext } from '../context/LanguageContext';

export default function SettingsScreen() {
  const { languages, setLanguages } = useContext(LanguageContext);
  const availableLanguages = ['Spanish', 'French', 'German', 'Chinese', 'Japanese', 'English'];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const [languageInput, setLanguageInput] = useState(availableLanguages[0]);
  const [levelInput, setLevelInput] = useState('A1');

  const handleAddLanguage = () => {
    if (!languageInput) return;
    setLanguages((prev) => [...prev, { language: languageInput, level: levelInput }]);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Languages You Are Learning</Text>

      {/* Input row */}
      <View style={styles.inputRow}>
        {/* Language dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={languageInput}
            onValueChange={(itemValue) => setLanguageInput(itemValue)}
            style={styles.picker}
          >
            {availableLanguages.map((lang) => (
              <Picker.Item key={lang} label={lang} value={lang} />
            ))}
          </Picker>
        </View>

        {/* Level buttons + Add button row */}
        <View style={styles.levelAddRow}>
          <View style={styles.levelRow}>
            {levels.map((lvl) => (
              <TouchableOpacity
                key={lvl}
                onPress={() => setLevelInput(lvl)}
                style={[
                  styles.levelButton,
                  lvl === levelInput ? styles.levelSelected : styles.levelUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.levelText,
                    lvl === levelInput ? styles.levelTextSelected : styles.levelTextUnselected,
                  ]}
                >
                  {lvl}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add button aligned to top */}
          <TouchableOpacity onPress={handleAddLanguage} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List of added languages */}
      <FlatList
        data={languages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.languageCard}>
            <Text style={styles.languageText}>
              {item.language} ({item.level})
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveLanguage(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No languages added yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { marginBottom: 16 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
  },
  picker: { height: 50, width: '100%' },

  // Row with level buttons + Add button
  levelAddRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // aligns Add button to top
  },

  // Level buttons container
  levelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1, // take remaining space
  },

  levelButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  levelSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
  levelUnselected: { backgroundColor: '#fff', borderColor: '#007bff' },
  levelText: { fontWeight: 'bold' },
  levelTextSelected: { color: '#fff' },
  levelTextUnselected: { color: '#007bff' },

  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
    alignSelf: 'flex-start', // ensures it stays at top of row
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  languageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    marginBottom: 8,
  },
  languageText: { fontSize: 16 },
  removeButton: { backgroundColor: '#ff3b30', paddingHorizontal: 8, borderRadius: 4 },
  removeText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
});
