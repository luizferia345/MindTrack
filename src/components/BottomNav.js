import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Início',   key: 'Home' },
  { icon: '📓', label: 'Diário',   key: 'Journal' },
  { icon: '✅', label: 'Check-in', key: 'Checkin' },
  { icon: '🤖', label: 'IA',       key: 'Chat' },
  { icon: '📊', label: 'Dados',    key: 'Stats' },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => onNavigate(item.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 10,
    gap: 3,
  },
  itemActive: {
    backgroundColor: theme.accentSoft,
  },
  icon: { fontSize: 20 },
  label: { fontSize: 10, fontWeight: '600' },
  labelActive: { color: theme.accent },
  labelInactive: { color: theme.textMuted },
});
