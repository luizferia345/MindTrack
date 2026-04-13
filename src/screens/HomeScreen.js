import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { theme } from '../theme';

const MOOD_DATA = [
  { day: 'Seg', score: 6, color: theme.yellow },
  { day: 'Ter', score: 4, color: theme.red },
  { day: 'Qua', score: 7, color: theme.green },
  { day: 'Qui', score: 8, color: theme.green },
  { day: 'Sex', score: 5, color: theme.yellow },
  { day: 'Sáb', score: 9, color: theme.accent },
  { day: 'Dom', score: 7, color: theme.accent },
];

const STATS = [
  { value: '7.2', label: 'Humor médio',       color: theme.accent },
  { value: '14',  label: 'Dias monitorados',  color: theme.green },
  { value: '3',   label: 'Insights novos',    color: theme.purple },
];

const MAX_BAR = 80;

export default function HomeScreen({ onCheckin }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Bom dia 👋</Text>
          <Text style={styles.title}>Como você está hoje?</Text>
        </View>
        <View style={styles.bellBox}><Text style={{ fontSize: 18 }}>🔔</Text></View>
      </View>

      {/* Streak */}
      <View style={styles.streak}>
        <Text style={{ fontSize: 16 }}>🔥</Text>
        <Text style={styles.streakText}>7 dias seguidos de check-in</Text>
        <Text style={styles.streakBadge}>Recorde!</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>HUMOR ESTA SEMANA</Text>
        <View style={styles.chartRow}>
          {MOOD_DATA.map((d) => (
            <View key={d.day} style={styles.chartCol}>
              <View
                style={[
                  styles.chartBar,
                  { height: (d.score / 10) * MAX_BAR, backgroundColor: d.color,
                    opacity: d.day === 'Dom' ? 1 : 0.55 },
                ]}
              />
              <Text style={styles.chartLabel}>{d.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Insight */}
      <View style={styles.insight}>
        <Text style={{ fontSize: 20 }}>✨</Text>
        <Text style={styles.insightText}>
          <Text style={styles.insightHL}>Padrão identificado: </Text>
          Você tende a se sentir melhor às{' '}
          <Text style={styles.insightHL}>quintas e sextas</Text>. Seus fins de semana têm sido os melhores!
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.btn} onPress={onCheckin} activeOpacity={0.85}>
        <Text style={styles.btnText}>✅  Fazer check-in de hoje</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20 },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', paddingTop: 16, paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: theme.textSecondary, marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '700', color: theme.textPrimary },
  bellBox: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: theme.surface, borderWidth: 1,
    borderColor: theme.border, alignItems: 'center', justifyContent: 'center',
  },
  streak: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: theme.yellowSoft, borderWidth: 1,
    borderColor: theme.yellow + '44', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16,
  },
  streakText: { flex: 1, fontSize: 13, color: theme.yellow, fontWeight: '600' },
  streakBadge: { fontSize: 11, color: theme.yellow },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statCard: {
    flex: 1, backgroundColor: theme.surface, borderRadius: 14,
    borderWidth: 1, borderColor: theme.border,
    paddingVertical: 14, paddingHorizontal: 12, alignItems: 'center',
  },
  statValue: { fontSize: 26, fontWeight: '800', lineHeight: 30 },
  statLabel: { fontSize: 11, color: theme.textSecondary, marginTop: 4, fontWeight: '500' },
  card: {
    backgroundColor: theme.surface, borderRadius: 16,
    borderWidth: 1, borderColor: theme.border, padding: 16, marginBottom: 12,
  },
  cardTitle: {
    fontSize: 11, fontWeight: '700', color: theme.textSecondary,
    letterSpacing: 1, marginBottom: 12,
  },
  chartRow: { flexDirection: 'row', alignItems: 'flex-end', height: 88, gap: 6 },
  chartCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 4 },
  chartBar: { width: '100%', borderRadius: 4 },
  chartLabel: { fontSize: 10, color: theme.textMuted, fontWeight: '500' },
  insight: {
    flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    backgroundColor: theme.purpleSoft, borderWidth: 1,
    borderColor: theme.purple + '33', borderRadius: 16, padding: 16, marginBottom: 12,
  },
  insightText: { flex: 1, fontSize: 13, color: theme.textPrimary, lineHeight: 20 },
  insightHL: { color: theme.purple, fontWeight: '700' },
  btn: {
    paddingVertical: 14, borderRadius: 14,
    backgroundColor: theme.green, alignItems: 'center', marginTop: 4,
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
