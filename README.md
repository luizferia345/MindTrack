# MindTrack — by Luiz Dias
© 2026 Luiz Dias. Todos os direitos reservados.

# 🧠 MindTrack — App de Saúde Mental com IA

Aplicativo React Native (Expo) para acompanhamento de ansiedade e depressão com IA integrada via API da Anthropic.

---

## 📁 Estrutura do projeto

```
mindtrack/
├── App.js                        ← Navegação principal
├── app.json                      ← Configuração Expo
├── package.json
└── src/
    ├── theme/
    │   └── index.js              ← Cores e tokens de design
    ├── components/
    │   └── BottomNav.js          ← Barra de navegação inferior
    └── screens/
        ├── OnboardingScreen.js   ← Tela de boas-vindas
        ├── HomeScreen.js         ← Dashboard principal
        ├── CheckinScreen.js      ← Check-in diário de humor
        ├── ChatScreen.js         ← Chat com IA (Claude API) ✨
        └── JournalScreen.js      ← Diário emocional
```

---

## 🚀 Como rodar

### 1. Instale as dependências
```bash
cd mindtrack
npm install
``

### 2. Rode o app
```bash
npx expo start


---

## 📱 Telas implementadas

| Tela | Descrição |
|------|-----------|
| Onboarding | Apresentação do app com features |
| Home | Dashboard com streak, stats, gráfico de humor e insight da IA |
| Check-in | Seletor de humor + sliders de ansiedade e sono |
| Chat IA | Conversa em tempo real com Claude (TCC) |
| Diário | Entradas emocionais com tags e filtro de humor |

---

## ⚠️ Aviso importante

Este app é um suporte complementar à saúde mental, **não substitui** atendimento profissional.
Em caso de crise, ligue para o **CVV: 188** (24h, gratuito).
