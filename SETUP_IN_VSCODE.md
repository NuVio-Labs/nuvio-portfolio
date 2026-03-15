# Setup in VS Code

## Ziel

Dieses Paket soll deinem Agenten in VS Code genug Kontext geben, damit NuVio konsistent umgesetzt wird.

## Empfohlene Dateien aktiv nutzen

1. `AGENTS.md`
2. `.github/copilot-instructions.md`
3. `.cursor/rules/nuvio-design.mdc`
4. `design/design-tokens.json`
5. `prompts/NUVIO_MASTER_AGENT_PROMPT.md`

## Schnelle Integration

### GitHub Copilot
1. Lasse `.github/copilot-instructions.md` im Projekt
2. Lasse `AGENTS.md` im Root
3. Nutze bei Aufgaben zusätzlich den Master Prompt

### Cursor oder ähnliche Agenten
1. Lasse `.cursor/rules/nuvio-design.mdc` im Projekt
2. Lasse `AGENTS.md` im Root
3. Nutze bei Bedarf die Prompts aus dem `prompts` Ordner

### Allgemeine VS Code Agenten
1. Referenziere `AGENTS.md` aktiv im Prompt
2. Verweise auf `design/design-tokens.json` für Farben und Tokens
3. Nutze die Checklist vor finalem Merge

## Empfohlener Startsatz für neue Chats

```txt
Nutze strikt die Dateien AGENTS.md, design/design-tokens.json, design/NUVIO_COMPONENT_RULES.md und design/NUVIO_BRAND_VOICE.md als verbindliche Grundlage für alle UI und Frontend Entscheidungen in diesem Projekt.
```

## Best Practice

Gib dem Agenten nie nur den Auftrag "mach es schöner".
Gib ihm stattdessen:
1. Kontext
2. Zielwirkung
3. Technik
4. konkrete Anforderungen
5. Verweis auf die NuVio Regeln

## Technischer Hinweis

Wenn du Tailwind nutzt, übernimm die Tokens aus `design/tailwind-theme-snippet.ts` oder mappe sie in deine bestehende Theme Konfiguration.
