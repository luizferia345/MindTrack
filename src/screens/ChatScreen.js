import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { theme } from '../theme';

const SYSTEM_PROMPT = `Você é um assistente de apoio emocional empático e acolhedor do app MindTrack.
Use técnicas de Terapia Cognitivo-Comportamental (TCC) de forma natural e acessível.
REGRAS IMPORTANTES:
- NUNCA faça diagnósticos clínicos
- NUNCA prescreva medicamentos
- Sempre sugira buscar um profissional em situações de crise
- Se o usuário demonstrar risco de se machucar, forneça imediatamente o CVV: 188
- Responda sempre em português brasileiro
- Seja caloroso, direto e prático
- Mantenha respostas concisas (máximo 3 parágrafos)`;

const SUGGESTIONS = ['Estou ansioso', 'Preciso relaxar', 'Técnicas de respiração'];

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! 💙 Estou aqui para te ouvir. Como você está se sentindo agora?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Desculpe, não consegui responder. Tente novamente.';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Erro de conexão. Verifique sua internet e tente novamente.' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={s.screen}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.avatarBox}><Text style={{ fontSize: 18 }}>🤖</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.headerTitle}>Assistente MindTrack</Text>
            <Text style={s.headerSub}>● Online · baseado em TCC</Text>
          </View>
          <View style={s.badge}><Text style={s.badgeText}>IA ativa</Text></View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={s.messages}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, i) => (
            <View
              key={i}
              style={[
                s.bubble,
                msg.role === 'assistant' ? s.bubbleAI : s.bubbleUser,
              ]}
            >
              <Text style={[
                s.bubbleText,
                msg.role === 'assistant' ? s.bubbleTextAI : s.bubbleTextUser,
              ]}>
                {msg.content}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={[s.bubble, s.bubbleAI, { paddingVertical: 14 }]}>
              <ActivityIndicator size="small" color={theme.accent} />
            </View>
          )}
        </ScrollView>

        {/* Suggestions */}
        <View style={s.suggestions}>
          {SUGGESTIONS.map((sug) => (
            <TouchableOpacity
              key={sug}
              style={s.suggestion}
              onPress={() => sendMessage(sug)}
              activeOpacity={0.7}
            >
              <Text style={s.suggestionText}>{sug}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input */}
        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            placeholder="Escreva aqui..."
            placeholderTextColor={theme.textMuted}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[s.sendBtn, (!input.trim() || loading) && { opacity: 0.4 }]}
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
            activeOpacity={0.8}
          >
            <Text style={s.sendBtnText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: theme.border,
    backgroundColor: theme.bg,
  },
  avatarBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: theme.accentSoft,
    borderWidth: 1, borderColor: theme.accent + '33',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 14, fontWeight: '700', color: theme.textPrimary },
  headerSub:   { fontSize: 11, color: theme.green, fontWeight: '500' },
  badge: {
    backgroundColor: theme.purpleSoft, borderWidth: 1,
    borderColor: theme.purple + '33', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { fontSize: 11, color: theme.purple, fontWeight: '600' },
  messages: { flex: 1 },
  bubble: {
    maxWidth: '78%', padding: 12, borderRadius: 16,
  },
  bubbleAI: {
    backgroundColor: theme.surface, borderWidth: 1,
    borderColor: theme.border, borderTopLeftRadius: 4, alignSelf: 'flex-start',
  },
  bubbleUser: {
    backgroundColor: theme.accentSoft, borderWidth: 1,
    borderColor: theme.accent + '44', borderTopRightRadius: 4, alignSelf: 'flex-end',
  },
  bubbleText:     { fontSize: 13, lineHeight: 20 },
  bubbleTextAI:   { color: theme.textPrimary },
  bubbleTextUser: { color: theme.accent },
  suggestions: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 6,
    paddingHorizontal: 16, paddingBottom: 8,
  },
  suggestion: {
    backgroundColor: theme.surface, borderWidth: 1,
    borderColor: theme.border, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  suggestionText: { fontSize: 11, color: theme.textSecondary },
  inputRow: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-end',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: theme.surface, borderTopWidth: 1, borderTopColor: theme.border,
  },
  input: {
    flex: 1, backgroundColor: theme.bg, borderRadius: 12,
    borderWidth: 1, borderColor: theme.border,
    paddingHorizontal: 14, paddingVertical: 10,
    color: theme.textPrimary, fontSize: 14, maxHeight: 100,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: theme.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
