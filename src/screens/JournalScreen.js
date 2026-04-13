import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { theme } from '../theme';

const ENTRIES = [
  {
    date: 'Hoje · 20:34',
    mood: '😊', moodLabel: 'Bem',
    moodColor: theme.green, moodBg: theme.greenSoft,
    text: 'Consegui terminar o projeto antes do prazo. Me senti bem mais no controle do que nos últimos dias...',
    tags: ['Trabalho', 'Conquista'], tagColor: theme.green,
  },
  {
    date: 'Ontem · 22:10',
    mood: '😰', moodLabel: 'Ansioso',
    moodColor: theme.yellow, moodBg: theme.yellowSoft,
    text: 'Reunião difícil hoje. Fiquei ruminando sobre o que poderia ter dito de diferente. À noite não conseguia desligar...',
    tags: ['Ansiedade', 'Trabalho'], tagColor: theme.yellow,
  },
  {
    date: '11 abr · 19:45',
    mood: '😔', moodLabel: 'Difícil',
    moodColor: theme.red, moodBg: theme.redSoft,
    text: 'Dia pesado. Me senti isolado e com pouca energia. Tentei sair para caminhar mas não consegui motivação...',
    tags: ['Isolamento', 'Energia baixa'], tagColor: theme.red,
  },
];

export default function JournalScreen() {
  return (
    <View style={s.screen}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.title}>Diário emocional</Text>
          <Text style={s.subtitle}>14 entradas este mês</Text>
        </View>
        <TouchableOpacity style={s.newBtn} activeOpacity={0.8}>
          <Text style={s.newBtnText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}>
        {ENTRIES.map((entry, i) => (
          <TouchableOpacity key={i} style={s.card} activeOpacity={0.75}>
            <View style={s.cardTop}>
              <Text style={s.date}>{entry.date}</Text>
              <View style={[s.moodTag, { backgroundColor: entry.moodBg }]}>
                <Text style={{ fontSize: 12 }}>{entry.mood}</Text>
                <Text style={[s.moodTagText, { color: entry.moodColor }]}>
                  {entry.moodLabel}
                </Text>
              </View>
            </View>
            <Text style={s.text} numberOfLines={3}>{entry.text}</Text>
            <View style={s.tags}>
              {entry.tags.map((tag) => (
                <View
                  key={tag}
                  style={[s.tag, { backgroundColor: entry.tagColor + '22' }]}
                >
                  <Text style={[s.tagText, { color: entry.tagColor }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', paddingTop: 16, paddingBottom: 16,
  },
  title: { fontSize: 20, fontWeight: '800', color: theme.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: theme.textSecondary, marginTop: 2 },
  newBtn: {
    backgroundColor: theme.accentSoft, borderWidth: 1,
    borderColor: theme.accent + '44', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  newBtnText: { color: theme.accent, fontSize: 13, fontWeight: '700' },
  card: {
    backgroundColor: theme.surface, borderRadius: 14,
    borderWidth: 1, borderColor: theme.border, padding: 14, marginBottom: 10,
  },
  cardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  date: { fontSize: 11, color: theme.textMuted, fontWeight: '600' },
  moodTag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
  },
  moodTagText: { fontSize: 11, fontWeight: '700' },
  text: { fontSize: 13, color: theme.textSecondary, lineHeight: 20 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tag: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
});
