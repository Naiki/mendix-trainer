# Mendix Trainer — iPhone Anleitung

## Installation (als App auf dem Home-Bildschirm)

1. Öffne **Safari** auf deinem iPhone
2. Gehe zu der URL, die der Server anzeigt (z.B. `http://192.168.178.81:3000`)
3. Tippe unten auf das **Teilen-Symbol** (□↑)
4. Scrolle nach unten und tippe **"Zum Home-Bildschirm"**
5. Tippe **"Hinzufügen"**

Die App erscheint jetzt als Icon auf deinem Home-Bildschirm und öffnet sich im Vollbild — ohne Safari-Leiste.

> **Wichtig:** Nur Safari unterstützt PWA-Installation auf iOS. Chrome/Firefox funktionieren nicht.

---

## Voraussetzungen

- Dein PC und dein iPhone müssen im **selben WLAN** sein
- Der Server muss auf dem PC laufen (`node server.js` oder Doppelklick auf `start.bat`)
- Die Handy-URL wird beim Serverstart angezeigt

---

## Offline-Nutzung

Nach dem ersten Laden funktioniert die App **komplett offline**:

- Alle 269 Fragen werden lokal gespeichert
- Dein Fortschritt bleibt im Browser-Speicher erhalten
- Kein Internet nötig zum Lernen

---

## Tägliche Erinnerung

1. Öffne die App
2. Aktiviere den Schalter **"Tägliche Erinnerung"** auf der Startseite
3. Wähle deine gewünschte Uhrzeit
4. Erlaube Benachrichtigungen wenn gefragt

> Push-Notifications funktionieren nur als installierte PWA (siehe Schritt 1-5 oben).

---

## Bedienung

| Aktion | Geste |
|--------|-------|
| Antwort wählen | Auf die Option tippen |
| Nächste Frage | Auf den blauen Button tippen |
| Quiz abbrechen | "← Abbrechen" oben links |
| Prüfungssimulation | Unter der Exam-Kategorie "Starten" |

---

## Tipps für die Zertifizierung

- **Jeden Tag 10-15 Minuten** üben (Streak halten!)
- **Prüfungssimulation** mindestens 3x vor der echten Prüfung machen
- **Falsche Antworten wiederholen** — der Button erscheint nach jedem Quiz
- Die App priorisiert automatisch Fragen, die du oft falsch beantwortest (Spaced Repetition)
- Ziel: Alle Kategorien auf **≥80%** in der Statistik

---

## Fehlerbehebung

**App lädt nicht auf dem iPhone:**
- Prüfe ob PC und iPhone im selben WLAN sind
- Prüfe ob der Server läuft (`node server.js`)
- Versuche die IP-Adresse direkt im Safari einzugeben

**Fortschritt verloren:**
- Der Fortschritt liegt im lokalen Browser-Speicher
- Safari → Einstellungen → "Websitedaten löschen" löscht auch den Fortschritt
- Tipp: Nicht den Safari-Cache leeren wenn du den Fortschritt behalten willst

**Benachrichtigungen kommen nicht:**
- Stelle sicher, dass die App als PWA installiert ist (nicht nur im Browser)
- iPhone Einstellungen → Benachrichtigungen → Safari → aktivieren
- Die App muss mindestens 1x nach der Installation geöffnet worden sein
