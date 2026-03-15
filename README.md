# NuVio Agent Kit

Dieses Paket gibt deinem VS Code Agenten alle zentralen Regeln, damit das NuVio Corporate Design konsistent umgesetzt wird.

## Enthalten

1. `AGENTS.md`
   Zentrale Masterregel für allgemeine Coding Agenten

2. `.github/copilot-instructions.md`
   Zusatzregeln für GitHub Copilot und ähnliche Workflows

3. `.cursor/rules/nuvio-design.mdc`
   Regeldatei für Cursor kompatible Agenten

4. `design/NUVIO_AGENT_DESIGN_SHEET.md`
   Vollständiges Design Sheet

5. `design/NUVIO_COMPONENT_RULES.md`
   UI Regeln für Buttons, Cards, Hero, Navbar, Sections, Footer, Formulare

6. `design/NUVIO_BRAND_VOICE.md`
   Sprachstil, Headlines, CTA Logik

7. `design/NUVIO_MOTION_RULES.md`
   Regeln für Animation, Timing und Interaktion

8. `design/NUVIO_TAILWIND_GUIDE.md`
   Tailwind Umsetzung des Systems

9. `design/design-tokens.json`
   Maschinenlesbare Design Tokens

10. `design/tailwind-theme-snippet.ts`
    Beispiel Snippet für Tailwind Theme Erweiterungen

11. `design/nuvio-globals-example.css`
    Beispiel für Utility und Surface Klassen

12. `prompts/NUVIO_UI_TASK_PROMPT.md`
    Vorlage für konkrete Aufgaben an den Agenten

13. `checklists/NUVIO_UI_REVIEW_CHECKLIST.md`
    Schnelle Qualitätskontrolle vor Abgabe

14. `examples/NUVIO_HERO_BRIEF.md`
    Beispielbriefing für einen Hero im NuVio Stil

## Empfohlene Nutzung

Lege die Dateien im Projektroot ab oder merge die Struktur direkt in dein bestehendes Projekt.

## Beste Reihenfolge

1. `AGENTS.md` aktiv nutzen
2. `design/design-tokens.json` und `tailwind-theme-snippet.ts` als technische Grundlage nehmen
3. Bei jeder UI Aufgabe die Vorlage aus `prompts/NUVIO_UI_TASK_PROMPT.md` verwenden
4. Vor finaler Abgabe gegen `checklists/NUVIO_UI_REVIEW_CHECKLIST.md` prüfen

## Wichtig

Dieses System gilt für die Eigenmarke NuVio.
Es ist nicht als pauschaler Stilstandard für Kundenprojekte gedacht.
