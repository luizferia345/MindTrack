import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { theme } from '../theme';

const FEATURES = [
  { icon: '📊', title: 'Acompanhe seu humor', desc: 'Check-ins diários para visualizar sua evolução' },
  { icon: '🤖', title: 'Suporte com IA',      desc: 'Converse a qualquer hora, baseado em TCC' },
  { icon: '🔍', title: 'Identifique padrões', desc: 'Descubra o que impacta seu bem-estar' },
];

export default function OnboardingScreen({ onStart }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.logoBox}>
        <Text style={styles.logoEmoji}>🧠</Text>
      </View>

      <Text style={styles.title}>Seu companheiro de saúde mental</Text>
      <Text style={styles.subtitle}>
        Acompanhe seu humor, identifique padrões e receba suporte personalizado com IA.
      </Text>

      <View style={styles.featureList}>
        {FEATURES.map((f) => (
          <View key={f.title} style={styles.featureItem}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <View style={styles.featureTexts}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={onStart} activeOpacity={0.85}>
        <Text style={styles.btnText}>Começar agora →</Text>
      </TouchableOpacity>
      <Text style={styles.fine}>Gratuito para começar · Sem cartão</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: theme.bg,
  },
  logoBox: {
    width: 80, height: 80,
    borderRadius: 24,
    backgroundColor: theme.accentSoft,
    borderWidth: 1,
    borderColor: theme.accent + '33',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoEmoji: { fontSize: 40 },
  title: {
    fontSize: 26, fontWeight: '800',
    color: theme.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
  },
  featureList: { width: '100%', gap: 10, marginBottom: 32 },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.border,
  },
  featureIcon: { fontSize: 20, marginTop: 1 },
  featureTexts: { flex: 1 },
  featureTitle: { fontSize: 13, fontWeight: '600', color: theme.textPrimary, marginBottom: 2 },
  featureDesc:  { fontSize: 12, color: theme.textSecondary, lineHeight: 18 },
  dots: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.border },
  dotActive: { width: 20, backgroundColor: theme.accent },
  btn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: theme.accent,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  fine: { fontSize: 12, color: theme.textMuted, marginTop: 12 },
});
