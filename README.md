
# ShiftOS — Futuro do Trabalho

Plataforma composta por:

- **Painel Web (Next.js + Prisma)** para criar e gerenciar microatividades, acompanhar candidaturas e registrar mensagens.
- **App Mobile (Expo / React Native)** para profissionais visualizarem microatividades, se candidatarem e acompanharem o status.
- **Landing Page** opcional para apresentação da solução.

A solução aborda o tema **Futuro do Trabalho**, explorando microjobs, flexibilidade e economia sob demanda.

---

## 🎯 Persona

**Nome:** Rafa Sousa  
**Idade:** 34 anos  
**Contexto:** profissional buscando migração para o trabalho digital e procurando atividades curtas e flexíveis.

**Principais dores:**
- Dificuldade de comprovar habilidades práticas.
- Pouca flexibilidade em trabalhos tradicionais.
- Necessidade de renda complementar rápida.

**Como o ShiftOS ajuda:**
- Oferece microatividades rápidas, claras e pagas.
- Processo de candidatura simples pelo app.
- Dashboard para controle de candidaturas e mensagens.

---

## 🧠 Relação com o “Futuro do Trabalho”

- **Microjobs e microatividades** como modelo central.
- **Trabalho flexível e descentralizado**, alinhado à gig economy.
- **Economia orientada a habilidades**, valorizando práticas reais.
- **Tecnologia como habilitadora**, com plataforma integrada web + mobile.

---

## 🧱 Arquitetura da Solução

```
/
├── web-nextjs/      → Painel web + backend (Next.js + Prisma)
├── mobile-expo/     → Aplicativo mobile (Expo / React Native)
└── design-system/   → Tokens compartilhados
```

Fluxo geral:
1. Recrutador cria microatividades no painel web.
2. Mobile consome `GET /api/opportunities`.
3. Candidato se candidata via `POST /api/applications`.
4. Painel exibe candidaturas, contatos e mensagens.
5. Dashboard apresenta métricas gerais.

---

## 🧰 Tecnologias

### Web
- Next.js
- Prisma ORM
- Tailwind CSS
- SQLite (dev)

### Mobile
- Expo
- React Native
- React Navigation
- Ionicons

---

## 🚀 Como Rodar

### Web / Backend

```
cd web-nextjs
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.cjs
npm run dev
```

API local:
```
http://localhost:3000/api/opportunities
```

---

### Mobile

```
cd mobile-expo
npm install
npm start
```

Para Android emulador:
```
http://10.0.2.2:3000
```

Para dispositivo físico:
```
http://SEU-IP-LOCAL:3000
```

---

## 📱 Funcionalidades

### Web (Recrutador)
- Criar atividades
- Listar e editar oportunidades
- Ver candidaturas com dados de contato
- Registrar mensagens por candidatura
- Dashboard com métricas

### Mobile (Candidato)
- Listar oportunidades
- Ver descrição e valor
- Enviar candidatura
- Acompanhar status das candidaturas
- Perfil da persona (Rafa)

---

## ♿ Acessibilidade

- Layout dark com contraste adequado
- Títulos claros e hierarquia visual
- Elementos interativos com toque confortável
- Navegação simples e direta (3 abas fixas)
- Textos com tamanho mínimo de leitura

---

## 📄 Licença

Projeto acadêmico — FIAP.
