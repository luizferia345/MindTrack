import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Dimensions,
} from 'react-native';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const MOODS = [
  { emoji: '😞', label: 'Péssimo', bg: theme.redSoft,    color: theme.red },
  { emoji: '😕', label: 'Ruim',    bg: theme.yellowSoft, color: theme.yellow },
  { emoji: '😐', label: 'Ok',      bg: theme.accentSoft, color: theme.accent },
  { emoji: '🙂', label: 'Bem',     bg: theme.greenSoft,  color: theme.green },
  { emoji: '😄', label: 'Ótimo',   bg: theme.purpleSoft, color: theme.purple },
];

function SliderRow({ label, value, color }) {
  const pct = value / 10;
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={s.sliderHeader}>
        <Text style={s.sliderLabel}>{label}</Text>
        <Text style={[s.sliderValue, { color }]}>{value}/10</Text>
      </View>
      <View style={s.track}>
        <View style={[s.fill, { width: `${pct * 100}%`, backgroundColor: color }]} />
        <View style={[s.thumb, { left: `${pct * 100}%` }]} />
      </View>
      <View style={s.sliderEnds}>
        <Text style={s.sliderEnd}>Nenhuma</Text>
        <Text style={s.sliderEnd}>Intensa</Text>
      </View>
    </View>
  );
}

export default function CheckinScreen({ onDone }) {
  const [mood, setMood] = useState(2);

  return (
    <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}>

      {/* Progress bar */}
      <View style={s.topRow}>
        <TouchableOpacity><Text style={{ fontSize: 18, color: theme.textSecondary }}>←</Text></TouchableOpacity>
        <Text style={s.topTitle}>Check-in diário</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={s.progressRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[s.progressBar, i === 0 && s.progressBarActive]} />
        ))}
      </View>

      {/* Mood question */}
      <View style={s.question}>
        <Text style={s.questionEmoji}>{MOODS[mood].emoji}</Text>
        <Text style={s.questionTitle}>Como está seu humor agora?</Text>
        <Text style={s.questionSub}>Seja honesto — só você vê isso</Text>
      </View>

      {/* Mood buttons */}
      <View style={s.moodRow}>
        {MOODS.map((m, i) => (
          <TouchableOpacity
            key={m.label}
            style={[
              s.moodBtn,
              { backgroundColor: i === mood ? m.bg : theme.surface,
                borderColor: i === mood ? m.color + '66' : theme.border },
            ]}
            onPress={() => setMood(i)}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 22 }}>{m.emoji}</Text>
            <Text style={[s.moodLabel, { color: i === mood ? m.color : theme.textMuted }]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sliders */}
      <View style={s.card}>
        <SliderRow label="Nível de ansiedade" value={6} color={theme.accent} />
        <SliderRow label="Qualidade do sono"  value={8} color={theme.green} />
      </View>

      <TouchableOpacity style={s.btn} onPress={onDone} activeOpacity={0.85}>
        <Text style={s.btnText}>Continuar →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20 },
  topRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingTop: 16, paddingBottom: 12,
  },
  topTitle: { fontSize: 16, fontWeight: '700', color: theme.textPrimary },
  progressRow: { flexDirection: 'row', gap: 4, marginBottom: 24 },
  progressBar: {
    flex: 1, height: 3, borderRadius: 2, backgroundColor: theme.border,
  },
  progressBarActive: { backgroundColor: theme.accent },
  question: { alignItems: 'center', paddingVertical: 20 },
  questionEmoji: { fontSize: 52, marginBottom: 12 },
  questionTitle: {
    fontSize: 18, fontWeight: '700', color: theme.textPrimary,
    textAlign: 'center', marginBottom: 8,
  },
  questionSub: { fontSize: 13, color: theme.textSecondary, marginBottom: 24 },
  moodRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  moodBtn: {
    flex: 1, aspectRatio: 0.85,
    borderRadius: 12, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  moodLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  card: {
    backgroundColor: theme.surface, borderRadius: 16,
    borderWidth: 1, borderColor: theme.border, padding: 16, marginBottom: 16,
  },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sliderLabel: { fontSize: 12, fontWeight: '600', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  sliderValue: { fontSize: 12, fontWeight: '700' },
  track: {
    height: 6, backgroundColor: theme.border, borderRadius: 3,
    position: 'relative', marginBottom: 4,
  },
  fill: { height: '100%', borderRadius: 3 },
  thumb: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#fff', position: 'absolute',
    top: -6, marginLeft: -9,
    shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sliderEnds: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderEnd: { fontSize: 10, color: theme.textMuted },
  btn: {
    paddingVertical: 14, borderRadius: 14,
    backgroundColor: theme.accent, alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
