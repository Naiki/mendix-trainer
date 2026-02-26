// Mendix Advanced Developer - Question Database
// Categories: domain, optimization, xpath, security, performance, ux, errorhandling, logging, integration, testing, java, workflows, mobile, deployment

export const ADVANCED_QUESTIONS = [

// ============ ADVANCED DOMAIN MODELING ============
{
    id: 'adv-dom-001',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was passiert in der Datenbank wenn man Generalization (Vererbung) verwendet?',
    options: [
        'Generalisierung und Spezialisierung werden in getrennten Tabellen gespeichert, die über die gleiche ID verbunden sind',
        'Es gibt eine einzige gemeinsame Tabelle für alles (Single-Table-Inheritance)',
        'Mendix erstellt Views statt Tabellen',
        'Generalization hat keinen Einfluss auf die Datenbank'
    ],
    correct: 0,
    explanation: 'Mendix verwendet Class Table Inheritance: Die Generalisierung hat ihre eigene Tabelle, jede Spezialisierung bekommt eine SEPARATE Tabelle mit ihren zusätzlichen Attributen. Beide teilen sich die gleiche Objekt-ID und werden intern per JOIN verbunden.'
},
{
    id: 'adv-dom-002',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Warum sollte man tiefe Vererbungshierarchien (3+ Ebenen) bei großen Datenmengen vermeiden?',
    options: [
        'Studio Pro erlaubt maximal 3 Ebenen',
        'Jede Abfrage muss alle Ebenen per JOIN verbinden, was die Performance verschlechtert',
        'Es gibt ein hartes Limit von 50 Attributen pro Vererbungskette',
        'Vererbung ist generell in Mendix nicht empfohlen'
    ],
    correct: 1,
    explanation: 'Mendix nutzt Class Table Inheritance (separate Tabellen pro Ebene). Bei tiefen Hierarchien muss jede Abfrage mehrere Tabellen per JOIN verbinden (3 Ebenen = 3 Tabellen = 2 JOINs). Schreiboperationen müssen in mehrere Tabellen gleichzeitig schreiben. Bei großen Datenmengen wird dies zum Performance-Problem.'
},
{
    id: 'adv-dom-003',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist der Unterschied zwischen Association Ownership "Default" und "Both"?',
    options: [
        'Default erlaubt nur Lesen, Both erlaubt Lesen und Schreiben',
        'Default speichert die Referenz auf einer Seite, Both speichert sie auf beiden Seiten',
        'Default ist für 1:1, Both ist für N:M Assoziationen',
        'Es gibt keinen funktionalen Unterschied'
    ],
    correct: 1,
    explanation: 'Bei "Default" wird die Referenz nur auf der Besitzer-Seite gespeichert. Bei "Both" wird sie auf beiden Seiten gespeichert. "Both" wird für Many-to-Many Reference Sets benötigt, hat aber höhere Speicherkosten.'
},
{
    id: 'adv-dom-004',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist ein typisches Pattern für Non-Persistent Entities?',
    options: [
        'Datenbankabfragen cachen',
        'Suchobjekte, Formulardaten die nicht gespeichert werden sollen, oder API-Response-Wrapper',
        'Performance-Optimierung durch weniger Datenbankzugriffe',
        'Verschlüsselung von sensiblen Daten'
    ],
    correct: 1,
    explanation: 'Non-Persistent Entities sind ideal für: Suchobjekte (Suchformular-Parameter), temporäre Formulardaten, API-Response-Wrapper, und allgemein für Daten die nur in der aktuellen Session benötigt werden.'
},
{
    id: 'adv-dom-005',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Wie beeinflusst "Prevent Delete" als Delete Behavior das System?',
    options: [
        'Das Löschen wird komplett deaktiviert',
        'Der Benutzer erhält eine Warnung, kann aber trotzdem löschen',
        'Das Objekt kann nicht gelöscht werden solange assoziierte Objekte existieren',
        'Das Objekt wird als "gelöscht" markiert aber bleibt in der Datenbank'
    ],
    correct: 2,
    explanation: '"Prevent Delete" verhindert das Löschen eines Objekts wenn noch assoziierte Objekte über diese Assoziation existieren. Der Benutzer muss zürst die assoziierten Objekte entfernen oder löschen.'
},
{
    id: 'adv-dom-006',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was sollte man bei Cross-Module Assoziationen beachten?',
    options: [
        'Sie sind nicht möglich',
        'Die Sicherheitsregeln beider Module müssen berücksichtigt werden, und die Abhängigkeit zwischen Modulen steigt',
        'Sie sind nur in eine Richtung nutzbar',
        'Sie erfordern ein separates Bridge-Modul'
    ],
    correct: 1,
    explanation: 'Cross-Module Assoziationen erhöhen die Abhängigkeit zwischen Modulen. Sicherheitsregeln beider Module müssen kompatibel sein. Bei Entity Access müssen beide Seiten der Assoziation Leserechte haben.'
},
{
    id: 'adv-dom-007',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Wann sollte man Generalization statt einer Assoziation verwenden?',
    options: [
        'Immer wenn zwei Entitäten ähnliche Attribute haben',
        'Wenn die Spezialisierung tatsächlich eine "ist-ein" Beziehung zur Generalisierung hat und gemeinsame Logik teilt',
        'Nur wenn mehr als 5 Attribute geteilt werden',
        'Generalization ist veraltet, immer Assoziationen verwenden'
    ],
    correct: 1,
    explanation: 'Generalization ist sinnvoll bei echter "ist-ein" Beziehung (Hund IST ein Tier, Student IST eine Person). Die Spezialisierung erbt Attribute, Assoziationen und Sicherheitslogik. Bei reiner Datenähnlichkeit ist eine Assoziation oft besser.'
},

// ============ DATA OPTIMIZATION ============
{
    id: 'adv-opt-001',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Wann sollte man Indizes auf einer Entität hinzufügen?',
    options: [
        'Immer, auf jedem Attribut',
        'Wenn häufig nach Nicht-ID-Attributen gesucht/sortiert wird und die Tabelle wächst',
        'Nur bei Entitäten mit mehr als 1 Million Objekten',
        'Indizes werden in Mendix automatisch erstellt'
    ],
    correct: 1,
    explanation: 'Indizes sollten erstellt werden wenn häufig nach Attributen gesucht oder sortiert wird die nicht der automatisch indizierte Primärschlüssel (ID) sind. Die Datenmenge ist ein Faktor, aber es gibt keinen festen Schwellenwert -- bereits bei hunderten Objekten können Indizes die Performance verbessern.'
},
{
    id: 'adv-opt-002',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Was ist OQL in Mendix und wie unterscheidet es sich von XPath?',
    options: [
        'OQL ist für NoSQL-Datenbanken, XPath für relationale',
        'OQL ist SQL-ähnlich mit Entity-Namen statt Tabellennamen und erlaubt Aggregationen und Joins die XPath nicht kann',
        'OQL und XPath sind identisch',
        'OQL ist veraltet und durch XPath ersetzt worden'
    ],
    correct: 1,
    explanation: 'OQL (Object Query Language) ähnelt SQL, verwendet aber Entity- und Attribut-Namen statt Tabellen-/Spaltennamen. OQL erlaubt GROUP BY, JOINs und komplexe Aggregationen die mit XPath nicht möglich sind.'
},
{
    id: 'adv-opt-003',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Was ist ein kritischer Unterschied zwischen OQL und XPath bezüglich Security?',
    options: [
        'OQL ist sicherer als XPath',
        'XPath wendet automatisch Entity Access Rules an, OQL NICHT',
        'Beide wenden Security identisch an',
        'OQL hat eigene Security-Regeln'
    ],
    correct: 1,
    explanation: 'KRITISCH: OQL-Abfragen umgehen die Domain Model Security (Entity Access Rules). Man muss bei OQL manuell WHERE-Klauseln hinzufügen um Mandantentrennung oder rollenbasierte Einschränkungen durchzusetzen.'
},
{
    id: 'adv-opt-004',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Wie optimiert man Microflows die große Datenmengen verarbeiten?',
    options: [
        'Alle Daten auf einmal laden und im Speicher verarbeiten',
        'Batch-Verarbeitung: Daten in kleinen Portionen laden, verarbeiten und committen',
        'Parallel-Verarbeitung mit mehreren Microflows',
        'Große Datenmengen sollten nur mit Java-Aktionen verarbeitet werden'
    ],
    correct: 1,
    explanation: 'Batch-Verarbeitung ist der empfohlene Ansatz: Daten in Batches (z.B. 1000er Portionen) laden, verarbeiten und committen. So wird der Speicher nicht überlastet und die Datenbank-Transaktionen bleiben überschaubar.'
},
{
    id: 'adv-opt-005',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Was versteht man unter "Object State" in Mendix?',
    options: [
        'Der Zustand der Datenbank-Verbindung',
        'Der Zustand eines Objekts: New (neu erstellt), Changed (geändert), Committed (gespeichert)',
        'Der Deployment-Status einer App',
        'Die Sichtbarkeit eines Objekts auf der Seite'
    ],
    correct: 1,
    explanation: 'Mendix-Objekte haben drei Zustände: New (im Speicher erstellt, nicht in DB), Changed (in DB vorhanden, aber geändert im Speicher), Committed (Zustand im Speicher = Zustand in DB). Dies beeinflusst Rollback-Verhalten.'
},
{
    id: 'adv-opt-006',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Was ist "Association Prefetching" und wann hilft es?',
    options: [
        'Eine Technik die Assoziationen vor dem Seitenaufruf lädt',
        'Mendix lädt assoziierte Objekte proaktiv in einem einzigen Datenbankaufruf statt N+1 Einzelabrufe',
        'Ein Feature das nur in der Cloud verfügbar ist',
        'Ein Plugin das installiert werden muss'
    ],
    correct: 1,
    explanation: 'Association Prefetching lädt assoziierte Objekte in einer Datenbankabfrage statt für jedes Objekt einzeln (N+1 Problem). Dies verbessert die Performance besonders bei Listen die assoziierte Daten anzeigen.'
},
{
    id: 'adv-opt-007',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Warum sollte man Commits in Schleifen vermeiden?',
    options: [
        'Commits sind in Schleifen nicht erlaubt',
        'Jeder Commit erzeugt eine Datenbank-Transaktion, bei 1000 Objekten = 1000 Transaktionen statt einer',
        'Commits in Schleifen erzeugen Duplikate',
        'Commits in Schleifen sind nicht persistent'
    ],
    correct: 1,
    explanation: 'Jeder Commit in einer Schleife erzeugt eine separate Datenbank-Transaktion. Bei 1000 Objekten = 1000 Round-Trips zur Datenbank. Besser: Objekte in einer Liste sammeln und nach der Schleife einmal committen.'
},
{
    id: 'adv-opt-008',
    category: 'optimization',
    categoryLabel: 'Optimization',
    question: 'Was ist Denormalization und wann ist es in Mendix sinnvoll?',
    options: [
        'Das Entfernen von Indizes für bessere Write-Performance',
        'Redundante Datenspeicherung um teure Joins/Berechnungen bei Lesezugriffen zu vermeiden',
        'Die Normalisierung von Datenmodellen nach Boyce-Codd',
        'Eine Technik um die Datenbank zu verkleinern'
    ],
    correct: 1,
    explanation: 'Denormalization speichert berechnete oder assoziierte Werte redundant, um bei Lesezugriffen teure Joins oder Berechnungen zu vermeiden. Sinnvoll wenn: häufige Reads, seltene Writes, und die Konsistenz gewährleistet werden kann.'
},

// ============ ADVANCED XPATH ============
{
    id: 'adv-xpath-001',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Was passiert wenn man XPath-Constraints in Entity Access Rules verwendet?',
    options: [
        'Sie werden nur beim ersten Laden geprüft',
        'Sie werden bei JEDER Datenbankabfrage für diese Entität automatisch hinzugefügt',
        'Sie gelten nur für Seiten, nicht für Microflows',
        'Sie ersetzen alle anderen XPath-Constraints'
    ],
    correct: 1,
    explanation: 'Entity Access XPath-Constraints werden automatisch zu JEDER Datenbankabfrage hinzugefügt - auf Seiten, in Microflows, in Reports. Dies kann bei komplexen Constraints und großen Datenmengen die Performance beeinflussen.'
},
{
    id: 'adv-xpath-002',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Wie verhält sich XPath bei Generalisierung/Spezialisierung?',
    options: [
        'XPath funktioniert nicht mit Vererbung',
        'Man kann die Generalisierungsentität abfragen und erhält auch Objekte der Spezialisierungen',
        'Man muss jede Spezialisierung separat abfragen',
        'XPath ignoriert Vererbung komplett'
    ],
    correct: 1,
    explanation: 'Wenn man die Generalisierungsentität per XPath abfragt, erhält man automatisch auch Objekte aller Spezialisierungen (die den Constraint erfüllen und für die der Benutzer Zugriff hat).'
},
{
    id: 'adv-xpath-003',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Welche Performance-Auswirkung haben XPath-Constraints in Access Rules bei großen Datenmengen?',
    options: [
        'Keine Auswirkung',
        'Jede Abfrage muss den zusätzlichen Constraint auswerten, was bei fehlenden Indizes sehr langsam werden kann',
        'Nur die erste Abfrage ist langsam, danach wird gecacht',
        'XPath in Access Rules wird nur bei Login-Zeitpunkt ausgewertet'
    ],
    correct: 1,
    explanation: 'XPath in Access Rules wird bei JEDER Abfrage ausgewertet. Bei großen Tabellen und komplexen Constraints (besonders mit Assoziationspfaden) kann dies zu erheblichen Performance-Einbussen führen. Indizes und einfache Constraints helfen.'
},
{
    id: 'adv-xpath-004',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Was ist der Unterschied zwischen XPath und OQL bei der Auswahl?',
    options: [
        'Immer XPath verwenden',
        'XPath für einfache Abfragen mit automatischer Security, OQL für komplexe Aggregationen und Reports ohne automatische Security',
        'OQL für alles verwenden da es schneller ist',
        'XPath für Seiten, OQL für Microflows'
    ],
    correct: 1,
    explanation: 'XPath: einfache bis mittlere Abfragen mit automatischer Security-Durchsetzung. OQL: komplexe Aggregationen, GROUP BY, JOINs, Reports - aber OHNE automatische Security. Die Wahl hängt von der Komplexität und Security-Anforderung ab.'
},

// ============ SECURITY ============
{
    id: 'adv-sec-001',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Wie verhält sich Entity Access bei Generalisierung?',
    options: [
        'Access Rules der Generalisierung werden automatisch vererbt',
        'Access Rules müssen auf der SPEZIALISIERUNG gesetzt werden, die Generalisierung wird vom Runtime IGNORIERT',
        'Access Rules gelten nur für die Generalisierung',
        'Man muss Access Rules auf beiden Ebenen identisch setzen'
    ],
    correct: 1,
    explanation: 'KRITISCH: Das Mendix Runtime ignoriert Access Rules auf der Generalisierungsentität. Security muss auf den Spezialisierungen (unterste Ebene) konfiguriert werden. Access Rules werden NICHT von der Generalisierung vererbt.'
},
{
    id: 'adv-sec-002',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Welche Security-Ebenen müssen in Mendix konfiguriert werden damit ein User Daten sehen kann?',
    options: [
        'Nur Entity Access reicht aus',
        'Page Access UND Entity Access müssen beide konfiguriert sein',
        'Page Access, Microflow Access und Entity Access müssen alle passen',
        'Nur Page Access reicht aus, Entity Access ist optional'
    ],
    correct: 2,
    explanation: 'Mendix prüft mehrere Security-Ebenen: Page Access (kann der User die Seite öffnen?), Microflow Access (kann der User den Microflow ausführen?) und Entity Access (darf der User die Daten sehen/ändern?). Alle relevanten Ebenen müssen konfiguriert sein. Es ist keine strikte sequentielle Reihenfolge, sondern jede Ebene muss unabhängig passen.'
},
{
    id: 'adv-sec-003',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Wie kann ein Angreifer Entity Access umgehen wenn nur Page Access konfiguriert ist?',
    options: [
        'Das ist nicht möglich',
        'Durch direkten API-Zugriff oder Manipulation von Browser-Requests können Daten abgerufen werden die auf keiner Seite angezeigt werden',
        'Nur wenn der Angreifer Admin-Zugang hat',
        'Nur bei Anonymous Users'
    ],
    correct: 1,
    explanation: 'Page Access allein reicht nicht! Angreifer können den Mendix Client manipulieren oder direkte API-Requests senden. Ohne Entity Access (CRUD-Regeln) sind die Daten ungeschützt. Entity Access ist die letzte Verteidigungslinie.'
},
{
    id: 'adv-sec-004',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was muss bei der Security von publizierten REST-Services beachtet werden?',
    options: [
        'REST-Services sind automatisch sicher',
        'Module Roles müssen zugewiesen werden, UND Entity Access der zurückgegebenen Daten muss für die authentifizierte Rolle konfiguriert sein',
        'Nur SSL reicht aus',
        'REST-Security wird nur in der Cloud konfiguriert'
    ],
    correct: 1,
    explanation: 'Publizierte REST-Services brauchen: 1) Module Role Zuweisung auf dem Service, 2) Authentication-Konfiguration, 3) Entity Access für alle zurückgegebenen Daten. Fehlt Entity Access, bekommt der Client eventuell leere Responses.'
},
{
    id: 'adv-sec-005',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Warum ist es gefährlich Security nur auf der UI-Ebene zu implementieren?',
    options: [
        'UI-Security ist nicht gefährlich',
        'UI-Elemente können im Browser manipuliert werden, Server-seitige Security (Entity/Microflow Access) ist die einzig zuverlässige Schicht',
        'UI-Security ist sogar sicherer als Server-Security',
        'Es gibt keinen Unterschied'
    ],
    correct: 1,
    explanation: 'UI-basierte Security (z.B. Buttons ausblenden, Seiten nicht verlinken) kann im Browser umgangen werden. Server-seitige Security (Entity Access, Microflow Access) wird vom Mendix Runtime erzwungen und kann nicht vom Client umgangen werden.'
},
{
    id: 'adv-sec-006',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was ist bei Anonymous User Access besonders zu beachten?',
    options: [
        'Anonymous Users haben keinen Zugang zu Daten',
        'Entity Access muss explizit für die Anonymous Role konfiguriert werden, sonst können ungewollt Daten exponiert werden',
        'Anonymous Users können nur die Homepage sehen',
        'Anonymous Access ist in Production nicht möglich'
    ],
    correct: 1,
    explanation: 'Anonymous Users müssen explizit konfiguriert werden: Page Access, Microflow Access UND Entity Access für die Anonymous Role. Zu grosszügige Konfiguration kann sensible Daten für nicht-authentifizierte Benutzer zugänglich machen.'
},

// ============ PERFORMANCE ============
{
    id: 'adv-perf-001',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Aus welchen drei Hauptschichten besteht der Mendix-Stack?',
    options: [
        'HTML, CSS, JavaScript',
        'Mendix Client (Browser), Mendix Runtime (Server), Datenbank',
        'Frontend, Middleware, Backend',
        'UI Layer, Business Layer, Data Layer'
    ],
    correct: 1,
    explanation: 'Der Mendix-Stack besteht aus: 1) Mendix Client (läuft im Browser, zeigt UI), 2) Mendix Runtime (Java-basierter Server, führt Microflows aus), 3) Datenbank (speichert Daten). Performance-Probleme können in jeder Schicht auftreten.'
},
{
    id: 'adv-perf-002',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Wie reduziert man die Ladezeit einer Seite mit vielen Daten?',
    options: [
        'Mehr RAM auf dem Server',
        'Paging/Lazy Loading verwenden, nur sichtbare Daten laden, nicht alle Attribute auf einmal',
        'Die Seite in mehrere Tabs aufteilen',
        'CDN vor den Server schalten'
    ],
    correct: 1,
    explanation: 'Wichtigste Maßnahmen: Paging/Lazy Loading (nur aktuelle Seite laden), nur benötigte Attribute selektieren (Select Attributes), Assoziationen optimieren, und unnötige Widgets/Data Sources entfernen.'
},
{
    id: 'adv-perf-003',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was ist das N+1 Query Problem in Mendix?',
    options: [
        'Ein Fehler der bei mehr als N Benutzern auftritt',
        'Für N Objekte in einer Liste wird N-mal einzeln die assoziierte Entität abgefragt, statt alle in einem Query',
        'Ein Problem mit der Datenbankverbindung',
        'Ein Sicherheitsproblem bei N gleichzeitigen Sessions'
    ],
    correct: 1,
    explanation: 'N+1 Problem: Eine Liste mit N Objekten, und für jedes Objekt wird ein separater Query für assoziierte Daten ausgeführt. Bei 100 Objekten = 101 Queries. Lösung: Association Prefetching oder die Daten anders strukturieren.'
},
{
    id: 'adv-perf-004',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Wie wirken sich Calculated Attributes auf die Performance aus?',
    options: [
        'Sie haben keine Auswirkung',
        'Der berechnende Microflow wird bei jedem Zugriff ausgeführt, was bei Listen sehr teuer sein kann',
        'Sie werden einmal berechnet und gecacht',
        'Sie sind schneller als normale Attribute'
    ],
    correct: 1,
    explanation: 'Calculated Attributes führen bei JEDEM Zugriff den Berechnungs-Microflow aus. In einem List View mit 50 Objekten = 50 Microflow-Ausführungen. Alternative: Wert beim Commit berechnen und als normales Attribut speichern.'
},
{
    id: 'adv-perf-005',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was ist der empfohlene Ansatz um Performance-Probleme in Mendix zu diagnostizieren?',
    options: [
        'Raten und optimieren',
        'Mendix Runtime Logs, SQL-Traces und die Mendix Profiler nutzen um den tatsächlichen Engpass zu identifizieren',
        'Einfach mehr Hardware bereitstellen',
        'Die gesamte App auf Java umschreiben'
    ],
    correct: 1,
    explanation: 'Erst messen, dann optimieren: Runtime Logs (welche Aktionen sind langsam?), SQL-Traces (welche Queries sind teuer?), und ggf. den Mendix Performance Profiler nutzen. Blindes Optimieren kann neue Probleme schaffen.'
},
{
    id: 'adv-perf-006',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Wie optimiert man Microflows mit vielen Datenbankzugriffen in einer Schleife?',
    options: [
        'Die Schleife durch Recursion ersetzen',
        'Alle benötigten Daten VOR der Schleife laden und im Speicher verarbeiten',
        'Parallel-Verarbeitung aktivieren',
        'Einen grösseren Transaction-Timeout setzen'
    ],
    correct: 1,
    explanation: 'Best Practice: Alle Daten VOR der Schleife mit einer einzigen Retrieve-Aktion laden. In der Schleife dann nur im Speicher arbeiten. Nach der Schleife einmal committen. So: 1 Query + 1 Commit statt N Queries + N Commits.'
},
{
    id: 'adv-perf-007',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was beeinflusst die Client-seitige Performance am meisten?',
    options: [
        'Die Server-Hardware',
        'Anzahl der Widgets auf der Seite, Datenmenge pro Widget, und Anzahl der Data Sources',
        'Die Programmiersprache des Servers',
        'Die Datenbankgrösse'
    ],
    correct: 1,
    explanation: 'Client-Performance hängt ab von: Anzahl der Widgets (jedes Widget = DOM-Elemente + Event Handlers), Datenmenge pro Widget (große Listen ohne Paging), und Anzahl der Data Sources (jede = HTTP-Request). Minimieren wo möglich.'
},

// ============ USER EXPERIENCE ============
{
    id: 'adv-ux-001',
    category: 'ux',
    categoryLabel: 'UX',
    question: 'Was sind Pluggable Widgets in Mendix?',
    options: [
        'Standard Mendix Widgets die in jedem Projekt enthalten sind',
        'React-basierte benutzerdefinierte Widgets die die Widget API nutzen und im Marketplace geteilt werden können',
        'Widgets die nur in der Cloud funktionieren',
        'Widgets die ohne Code erstellt werden'
    ],
    correct: 1,
    explanation: 'Pluggable Widgets sind React-basierte benutzerdefinierte UI-Komponenten. Sie nutzen die Mendix Widget API für Daten-Binding und Properties und können im Marketplace geteilt werden.'
},
{
    id: 'adv-ux-002',
    category: 'ux',
    categoryLabel: 'UX',
    question: 'Was ist der Hauptvorteil von Nanoflows gegenüber Microflows für UI-Logik?',
    options: [
        'Nanoflows sind sicherer',
        'Nanoflows laufen auf dem Client ohne Server-Roundtrip und funktionieren auch offline',
        'Nanoflows können mehr Aktionen ausführen',
        'Nanoflows sind einfacher zu debuggen'
    ],
    correct: 1,
    explanation: 'Nanoflows laufen direkt im Browser/Client ohne Server-Roundtrip. Das macht sie schneller für UI-Logik und ermöglicht Offline-Funktionalität. Einschränkung: kein direkter Datenbankzugriff, keine Java-Aktionen.'
},
{
    id: 'adv-ux-003',
    category: 'ux',
    categoryLabel: 'UX',
    question: 'Was sind Workflows in Mendix?',
    options: [
        'Automatisierte Deployments',
        'Visuell modellierte Geschäftsprozesse mit menschlichen Aufgaben, Entscheidungen und Automatisierung',
        'CI/CD Pipelines',
        'Microflow-Ketten die automatisch ausgeführt werden'
    ],
    correct: 1,
    explanation: 'Mendix Workflows sind visuell modellierte Geschäftsprozesse. Sie kombinieren menschliche Aufgaben (User Tasks), automatische Aktionen (Microflows), Entscheidungen und parallele Pfade. Ideal für Genehmigungs-Workflows.'
},
{
    id: 'adv-ux-004',
    category: 'ux',
    categoryLabel: 'UX',
    question: 'Was muss bei der Entwicklung einer Offline-fähigen Mendix-App beachtet werden?',
    options: [
        'Offline ist in Mendix nicht möglich',
        'Daten müssen synchronisiert werden, nur Nanoflows funktionieren offline, und das Datenmodell muss für Offline-Sync designed sein',
        'Einfach "Offline" in den Einstellungen aktivieren',
        'Nur PWA-Apps können offline arbeiten'
    ],
    correct: 1,
    explanation: 'Offline-Apps erfordern: Daten-Synchronisierungsstrategie, nur Nanoflows (keine Microflows offline), angepasstes Datenmodell für Sync-Konflikte, und sorgfältige Auswahl welche Daten lokal verfügbar sein müssen.'
},
{
    id: 'adv-ux-005',
    category: 'ux',
    categoryLabel: 'UX',
    question: 'Wie ist die Styling-Architektur in Mendix aufgebaut?',
    options: [
        'Nur Inline-Styles',
        'Theme-Ordner (themesource/theme), Design Properties, und die Möglichkeit Custom-CSS zu schreiben — seit Atlas UI 4 (Mendix 10+) mit CSS Custom Properties statt SASS',
        'Nur über Design Properties, kein manuelles CSS möglich',
        'Bootstrap-basiert ohne Anpassungsmöglichkeit'
    ],
    correct: 1,
    explanation: 'Mendix Styling-Architektur: Atlas UI als Basis-Theme, Design Properties für No-Code-Styling, und Custom-CSS im "themesource" Ordner. Seit Atlas UI 4 (Mendix 10+) werden CSS Custom Properties (Variablen) statt SASS-Variablen verwendet. SASS wird weiterhin unterstützt, ist aber nicht mehr die primäre Methode.'
},

// ============ ERROR HANDLING ============
{
    id: 'adv-err-001',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Was macht die "Error Handling" Einstellung auf einer Microflow-Aktivität?',
    options: [
        'Sie loggt den Fehler automatisch',
        'Sie definiert wie mit Fehlern umgegangen wird: Rollback, Custom with/without Rollback, oder Continue',
        'Sie sendet eine Benachrichtigung an den Admin',
        'Sie verhindert dass Fehler auftreten'
    ],
    correct: 1,
    explanation: 'Error Handling Optionen: Rollback (Standard — Microflow bricht ab, alle Änderungen werden zurückgerollt), Custom with Rollback (eigener Fehlerbehandlungspfad mit Rollback), Custom without Rollback (eigener Pfad, Änderungen bleiben erhalten), Continue (Fehler ignorieren, weiter).'
},
{
    id: 'adv-err-002',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Was passiert bei einem Fehler in einem Microflow wenn KEIN Error Handling konfiguriert ist?',
    options: [
        'Der Fehler wird ignoriert',
        'Der Microflow bricht ab, alle Änderungen werden zurückgerollt (Rollback), und der Benutzer sieht eine Fehlermeldung',
        'Der Microflow pausiert und wartet auf Benutzeraktion',
        'Nur der aktuelle Schritt wird übersprungen'
    ],
    correct: 1,
    explanation: 'Ohne konfiguriertes Error Handling: Der Microflow bricht sofort ab, alle nicht-committeten Änderungen werden zurückgerollt, und dem Benutzer wird eine generische Fehlermeldung angezeigt.'
},
{
    id: 'adv-err-003',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Was ist der Unterschied zwischen "Custom with Rollback" und "Custom without Rollback"?',
    options: [
        'Es gibt keinen Unterschied',
        'Mit Rollback werden alle nicht-committeten Änderungen rückgängig gemacht bevor der Custom-Pfad ausgeführt wird',
        'Ohne Rollback wird der Microflow abgebrochen',
        'Mit Rollback werden auch bereits committete Änderungen rückgängig gemacht'
    ],
    correct: 1,
    explanation: '"Custom with Rollback": Alle nicht-committeten Änderungen werden rückgängig gemacht, dann wird der Custom-Pfad ausgeführt. "Custom without Rollback": Die Änderungen bleiben erhalten, der Custom-Pfad kann darauf zugreifen.'
},
{
    id: 'adv-err-004',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Wie propagieren Fehler in Sub-Microflows?',
    options: [
        'Fehler in Sub-Microflows werden immer automatisch behandelt',
        'Wenn der Sub-Microflow keinen Error Handler hat, propagiert der Fehler zum aufrufenden Microflow',
        'Fehler in Sub-Microflows werden ignoriert',
        'Sub-Microflows können keine Fehler werfen'
    ],
    correct: 1,
    explanation: 'Fehler propagieren nach oben: Wenn ein Sub-Microflow einen Fehler wirft und keinen eigenen Error Handler hat, wird der Fehler an den aufrufenden Microflow weitergereicht. Dort kann er behandelt werden.'
},
{
    id: 'adv-err-005',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Wie behandelt man Fehler bei REST-Service-Aufrufen korrekt?',
    options: [
        'REST-Aufrufe schlagen nie fehl',
        'Custom Error Handling auf der Call REST Aktivität setzen und HTTP-Statuscodes im Error-Pfad auswerten',
        'Einfach "Continue" setzen und hoffen',
        'Einen separaten Microflow für jeden möglichen Fehler erstellen'
    ],
    correct: 1,
    explanation: 'Best Practice: Custom Error Handling auf der Call REST Aktivität konfigurieren. Im Error-Pfad den HTTP-Response-Code auswerten (400=Bad Request, 401=Unauthorized, 500=Server Error) und entsprechend reagieren.'
},
{
    id: 'adv-err-006',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Was ist eine Transaction in Mendix und wie beeinflusst sie Error Handling?',
    options: [
        'Transactions gibt es nur in der Datenbank',
        'Jeder Microflow läuft in einer Transaction - bei Fehler mit Rollback werden ALLE nicht-committeten Änderungen der gesamten Transaction rückgängig gemacht',
        'Transactions werden nur bei expliziter Konfiguration verwendet',
        'Transactions sind nur in Java-Aktionen verfügbar'
    ],
    correct: 1,
    explanation: 'Jeder Top-Level Microflow startet eine Transaction. Alle Datenbankänderungen innerhalb dieser Transaction werden entweder alle committed oder alle zurückgerollt. Sub-Microflows teilen die Transaction des Aufrufers.'
},
{
    id: 'adv-err-007',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Wie erstellt man benutzerfreundliche Fehlermeldungen statt generischer Mendix-Fehler?',
    options: [
        'Die Mendix-Fehlerseite im Theme-Ordner anpassen',
        'Error Handling auf Custom setzen und im Error-Pfad eine "Show Message" Aktivität mit verständlicher Meldung verwenden',
        'Ein Custom Widget für Fehlermeldungen installieren',
        'Fehlermeldungen können in Mendix nicht angepasst werden'
    ],
    correct: 1,
    explanation: 'Im Custom Error Handling Pfad kann man eine "Show Message" Aktivität verwenden um dem Benutzer eine verständliche Meldung zu zeigen (z.B. "Speichern fehlgeschlagen, bitte versuchen Sie es erneut" statt eines Stack-Traces).'
},

// ============ LOGGING ============
{
    id: 'adv-log-001',
    category: 'logging',
    categoryLabel: 'Logging',
    question: 'Welche Log-Levels gibt es in Mendix (von niedrigster zu höchster Priorität)?',
    options: [
        'Debug, Info, Warning, Error',
        'Trace, Debug, Info, Warning, Error, Critical',
        'Low, Medium, High, Critical',
        'Verbose, Normal, Important, Fatal'
    ],
    correct: 1,
    explanation: 'Mendix Log-Levels (aufsteigend): Trace (detailliertes Debugging), Debug (Debugging), Info (allgemeine Information), Warning (potenzielle Probleme), Error (Fehler), Critical (kritische Fehler). In Production typischerweise ab Info oder Warning.'
},
{
    id: 'adv-log-002',
    category: 'logging',
    categoryLabel: 'Logging',
    question: 'Was ist ein Log Node in Mendix?',
    options: [
        'Ein Server der Logs speichert',
        'Eine benannte Kategorie/Quelle für Log-Nachrichten die einzeln konfiguriert werden kann',
        'Ein UI-Widget das Logs anzeigt',
        'Ein Microflow-Element das automatisch loggt'
    ],
    correct: 1,
    explanation: 'Ein Log Node ist eine benannte Kategorie (z.B. "OrderProcessing", "Integration"). Jeder Log Node kann ein eigenes Log-Level haben. So kann man z.B. "Integration" auf Debug setzen während der Rest auf Warning steht.'
},
{
    id: 'adv-log-003',
    category: 'logging',
    categoryLabel: 'Logging',
    question: 'Wie erstellt man einen benutzerdefinierten Log Node?',
    options: [
        'In der Mendix Cloud Console',
        'Indem man in einer Log Message Aktivität einen neuen Node-Namen verwendet - er wird automatisch erstellt',
        'Durch eine spezielle Konfigurationsdatei',
        'Custom Log Nodes sind nicht möglich'
    ],
    correct: 1,
    explanation: 'Custom Log Nodes werden automatisch erstellt wenn man in einer "Log Message" Aktivität einen neuen Namen eingibt. Es gibt keine separate Konfiguration - der Node existiert sobald er zum ersten Mal verwendet wird.'
},
{
    id: 'adv-log-004',
    category: 'logging',
    categoryLabel: 'Logging',
    question: 'Was sollte man in Production-Umgebungen NICHT auf Debug-Level loggen?',
    options: [
        'Nichts, Debug ist in Production normal',
        'Sensible Daten (Passwörter, Tokens) und hochfrequente Operationen (jeder Page Request)',
        'Fehlermeldungen',
        'Nur sehr große Dateien'
    ],
    correct: 1,
    explanation: 'In Production: Keine sensiblen Daten loggen (DSGVO, Sicherheit), keine hochfrequenten Operationen auf Debug-Level (füllt Logs, verlangsamt System). Debug-Logging nur temporär für Problemanalyse aktivieren.'
},
{
    id: 'adv-log-005',
    category: 'logging',
    categoryLabel: 'Logging',
    question: 'Wie kann man Log-Levels zur Laufzeit ändern ohne Neustart?',
    options: [
        'Das ist nicht möglich',
        'Über die Mendix Runtime Admin Console oder die Cloud Portal Logging-Konfiguration',
        'Durch Ändern einer Konfigurationsdatei',
        'Nur durch neues Deployment'
    ],
    correct: 1,
    explanation: 'Log-Levels können zur Laufzeit ohne Neustart geändert werden - über die Admin Console (lokal) oder das Cloud Portal (Mendix Cloud). So kann man temporär Debug-Logging für ein spezifisches Problem aktivieren.'
},

// ============ INTEGRATION (ADVANCED) ============
{
    id: 'adv-int-001',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wie erstellt man einen publizierten REST-Service in Mendix?',
    options: [
        'Durch Export eines Microflows als REST',
        'Durch Erstellen eines Published REST Service mit definierten Ressourcen, Operationen und zugehörigen Microflows',
        'REST-Services können nur konsumiert, nicht publiziert werden',
        'Durch Installation eines REST-Moduls aus dem Marketplace'
    ],
    correct: 1,
    explanation: 'Man erstellt einen "Published REST Service", definiert Ressourcen (z.B. /orders), Operationen (GET, POST, PUT, DELETE), und weist jedem einen Microflow zu der die Logik enthält. Dazu kommen Authentication und Module Roles.'
},
{
    id: 'adv-int-002',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist ein Message Definition in Mendix?',
    options: [
        'Eine Fehlermeldungs-Vorlage',
        'Eine Definition der Struktur einer Nachricht (Request/Response) basierend auf Entitäten, die für Mappings verwendet wird',
        'Eine Benachrichtigungs-Konfiguration',
        'Ein Chat-Nachrichten-Format'
    ],
    correct: 1,
    explanation: 'Eine Message Definition beschreibt die Struktur einer eingehenden oder ausgehenden Nachricht basierend auf Domain-Model-Entitäten. Sie wird als Grundlage für Import/Export Mappings verwendet.'
},
{
    id: 'adv-int-003',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wie behandelt man Paginierung beim Konsumieren eines REST-Service?',
    options: [
        'Mendix handled Paginierung automatisch',
        'Einen Loop-Microflow bauen der wiederholt Seiten abruft bis alle Daten geladen sind, basierend auf Paginierungs-Parametern der API',
        'Man kann nur die erste Seite abrufen',
        'Paginierung ist bei REST nicht möglich'
    ],
    correct: 1,
    explanation: 'Man baut einen Microflow mit Schleife: Request mit Page/Offset-Parametern senden, Response verarbeiten, prüfen ob weitere Seiten existieren (z.B. next_page in Response), und bei Bedarf nächste Seite abrufen.'
},
{
    id: 'adv-int-004',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist der Vorteil von OData gegenüber REST für Mendix-zu-Mendix Integration?',
    options: [
        'OData ist schneller',
        'OData ermöglicht direkte Integration ins Domain Model als External Entity mit automatischem Data-Binding',
        'OData braucht keine Authentication',
        'Es gibt keinen Vorteil'
    ],
    correct: 1,
    explanation: 'OData-Services erscheinen als External Entities im Domain Model und können direkt in Data Views, List Views etc. verwendet werden. Kein manuelles Mapping nötig. Bei REST muss man Mappings und Microflows selbst bauen.'
},
{
    id: 'adv-int-005',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wie geht man mit unterschiedlichen Umgebungen (Dev, Test, Prod) bei REST-Endpunkten um?',
    options: [
        'Die URL hart im Microflow codieren',
        'Konstanten (Constants) für die Basis-URL verwenden die pro Umgebung konfiguriert werden können',
        'Für jede Umgebung einen eigenen Microflow erstellen',
        'Umgebungsspezifische URLs sind in Mendix nicht möglich'
    ],
    correct: 1,
    explanation: 'Best Practice: Die Basis-URL als Konstante (Constant) definieren. Konstanten können pro Umgebung (Dev, Test, Prod) unterschiedlich konfiguriert werden, ohne den Code zu ändern.'
},

// ============ TESTING ============
{
    id: 'adv-test-001',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Was ist die "Test Pyramid" im Kontext von Mendix?',
    options: [
        'Eine physische Testumgebungs-Hierarchie',
        'Viele Unit-Tests an der Basis, weniger Integration-Tests in der Mitte, wenige End-to-End-Tests an der Spitze',
        'Ein Mendix-spezifisches Test-Framework',
        'Eine Dokumentationsstruktur für Tests'
    ],
    correct: 1,
    explanation: 'Die Test-Pyramide empfiehlt: Viele schnelle, isolierte Unit-Tests (z.B. einzelne Microflows), weniger Integration-Tests (z.B. Microflow-Ketten mit Datenbank), und wenige langsame E2E-Tests (z.B. Browser-Tests).'
},
{
    id: 'adv-test-002',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Wie macht man Mendix-Microflows testbar?',
    options: [
        'Microflows sind automatisch testbar',
        'Kleine, fokussierte Microflows mit klaren Ein-/Ausgaben und wenig Seiteneffekten erstellen',
        'Nur Java-Aktionen sind testbar',
        'Testing ist in Mendix nicht möglich'
    ],
    correct: 1,
    explanation: 'Testbare Microflows: Klein und fokussiert (eine Aufgabe), klare Parameter und Rückgabewerte, wenig Seiteneffekte, Sub-Microflows für isolierbare Logik. Große monolithische Microflows sind schwer zu testen.'
},
{
    id: 'adv-test-003',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Was ist "Depth-First" vs "Breadth-First" Entwicklung im Kontext von Testing?',
    options: [
        'Verschiedene Suchalgorithmen',
        'Depth-First: Ein Feature komplett (inkl. Tests) fertigstellen bevor das nächste beginnt. Breadth-First: Alle Features grob implementieren, dann Tests hinzufügen.',
        'Techniken zum Durchsuchen von Datenbanken',
        'Verschiedene Testarten'
    ],
    correct: 1,
    explanation: 'Depth-First (empfohlen für Testbarkeit): Ein Feature komplett mit Tests fertigstellen, dann nächstes. Breadth-First: Alle Features oberflälich implementieren, Tests später. Depth-First führt zu besserer Testabdeckung.'
},
{
    id: 'adv-test-004',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Welches Mendix-Marketplace-Modul wird häufig für Unit-Tests verwendet?',
    options: [
        'MendixTester',
        'UnitTesting Module',
        'TestRunner Pro',
        'AutoTest Suite'
    ],
    correct: 1,
    explanation: 'Das "UnitTesting" Modul aus dem Mendix Marketplace ermöglicht es, Test-Microflows zu erstellen und auszuführen. Test-Microflows werden per Namenskonvention erkannt und können Assertions verwenden.'
},
{
    id: 'adv-test-005',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Was sollte bei automatisierten Tests in Mendix beachtet werden?',
    options: [
        'Tests sollten nur manuell durchgeführt werden',
        'Test-Daten isolieren, Tests unabhängig voneinander halten, und nach jedem Test aufraumen',
        'Immer gegen die Production-Datenbank testen',
        'Tests nur vor dem Release ausführen'
    ],
    correct: 1,
    explanation: 'Best Practices: Test-Daten isolieren (keine Abhängigkeit von Produktionsdaten), Tests unabhängig voneinander (keine Reihenfolge-Abhängigkeit), nach jedem Test aufraumen (erstellte Objekte löschen), und Tests regelmäßig ausführen.'
},

// ============ JAVA ACTIONS ============
{
    id: 'adv-java-001',
    category: 'java',
    categoryLabel: 'Java Actions',
    question: 'Wann sollte man eine Java Action statt eines Microflows verwenden?',
    options: [
        'Immer, Java ist schneller',
        'Wenn die Funktionalität mit Microflow-Aktivitäten nicht möglich ist (z.B. komplexe Berechnungen, externe Libraries, spezielle API-Calls)',
        'Java Actions sind veraltet',
        'Nur für Datenbank-Operationen'
    ],
    correct: 1,
    explanation: 'Java Actions ergänzen Microflows wenn deren Aktivitäten nicht ausreichen: Komplexe Algorithmen, Nutzung externer Java-Libraries, Datei-Operationen, spezielle Integrationen, oder OQL-Abfragen über die Java API.'
},
{
    id: 'adv-java-002',
    category: 'java',
    categoryLabel: 'Java Actions',
    question: 'Wie macht man eine Java Action in einem Microflow verfügbar?',
    options: [
        'Java-Klassen werden automatisch erkannt',
        'Man erstellt eine Java Action in Studio Pro die Parameter und Rückgabetyp definiert, der Java-Code wird im Projekt-Ordner generiert',
        'Man importiert eine JAR-Datei',
        'Java Actions müssen im Marketplace publiziert werden'
    ],
    correct: 1,
    explanation: 'In Studio Pro erstellt man eine "Java Action" mit definierten Parametern und Rückgabetyp. Studio Pro generiert ein Java-Template im Projekt-Verzeichnis. Den eigentlichen Code schreibt man zwischen den USER CODE Markierungen.'
},
{
    id: 'adv-java-003',
    category: 'java',
    categoryLabel: 'Java Actions',
    question: 'Wie führt man OQL-Abfragen in einer Java Action aus?',
    options: [
        'Mit der SQL-Klasse aus java.sql',
        'Mit der Core.retrieveOQLDataTable() oder Core.createOQLTextGetRequest() Methode der Mendix Java API',
        'OQL ist in Java nicht verfügbar',
        'Mit JDBC direkt auf die Datenbank'
    ],
    correct: 1,
    explanation: 'Die Mendix Java API bietet Methoden für OQL: Core.retrieveOQLDataTable() für tabellarische Ergebnisse und Core.createOQLTextGetRequest() für das Erstellen von OQL-Requests. So kann man komplexe Abfragen in Java ausführen.'
},
{
    id: 'adv-java-004',
    category: 'java',
    categoryLabel: 'Java Actions',
    question: 'Wie kann man Java Actions modulübergreifend wiederverwendbar machen?',
    options: [
        'Java-Code kopieren',
        'Die Java Action in ein eigenes Modul packen und dieses im Marketplace teilen oder zwischen Projekten kopieren',
        'Java Actions sind automatisch in allen Modulen verfügbar',
        'Durch Erstellen einer JAR-Datei'
    ],
    correct: 1,
    explanation: 'Man packt Java Actions in ein dediziertes Modul. Dieses Modul kann zwischen Projekten geteilt werden (Export/Import) oder im Marketplace publiziert werden. So wird die Funktionalität wiederverwendbar.'
},
{
    id: 'adv-java-005',
    category: 'java',
    categoryLabel: 'Java Actions',
    question: 'Wo schreibt man den benutzerdefinierten Code in einer generierten Java-Action-Datei?',
    options: [
        'Am Anfang der Datei',
        'Zwischen den "// BEGIN USER CODE" und "// END USER CODE" Markierungen',
        'In einer separaten Datei',
        'Überall in der Datei'
    ],
    correct: 1,
    explanation: 'Eigener Code gehört NUR zwischen "// BEGIN USER CODE" und "// END USER CODE". Alles außerhalb dieser Markierungen wird von Studio Pro bei Änderungen an der Java Action Definition überschrieben.'
},

// ============ EXTRA SECURITY QUESTIONS ============
{
    id: 'adv-sec-007',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was ist die sicherste Methode um sensible Konfigurationsdaten (API Keys, Passwörter) in Mendix zu speichern?',
    options: [
        'Als Konstante im Modell',
        'Als Konstante mit dem Wert pro Umgebung in der Cloud-Konfiguration - der Wert ist nicht im Modell sichtbar',
        'In einer Datenbank-Tabelle',
        'In einer Konfigurationsdatei im Theme-Ordner'
    ],
    correct: 1,
    explanation: 'Konstanten deren Werte pro Umgebung in der Cloud/Deployment-Konfiguration gesetzt werden. Der sensible Wert ist nicht im Modell gespeichert und kann pro Umgebung (Dev/Test/Prod) unterschiedlich sein.'
},
{
    id: 'adv-sec-008',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Wie verhält sich Microflow Access wenn ein Microflow als Button-Aktion auf einer Seite verwendet wird?',
    options: [
        'Der Microflow ist automatisch für alle zugänglich',
        'Der Button wird nur angezeigt wenn der Benutzer sowohl Page Access für die Seite ALS AUCH Microflow Access für den Microflow hat',
        'Nur Page Access ist relevant',
        'Der Button wird immer angezeigt, aber der Microflow schlägt fehl'
    ],
    correct: 1,
    explanation: 'Mendix prüft beides: Ohne Microflow Access wird der Button automatisch ausgeblendet (zusätzlich zum Server-seitigen Check). Dies ist eine Convenience-Feature - die eigentliche Security ist der Server-Check.'
},

// ============ EXTRA PERFORMANCE QUESTIONS ============
{
    id: 'adv-perf-008',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was ist der Unterschied zwischen Lazy Loading und Eager Loading in Mendix?',
    options: [
        'Es gibt keinen Unterschied',
        'Lazy Loading lädt assoziierte Daten erst bei Bedarf, Eager Loading lädt sie sofort mit',
        'Lazy Loading ist langsamer',
        'Eager Loading ist nur in Java verfügbar'
    ],
    correct: 1,
    explanation: 'Lazy Loading: Assoziierte Objekte werden erst geladen wenn auf sie zugegriffen wird (Standard). Eager Loading: Alles wird sofort geladen. Lazy Loading spart initiale Ladezeit, kann aber N+1 Probleme verursachen.'
},
{
    id: 'adv-perf-009',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Wie optimiert man eine Seite die viele assoziierte Daten in einem List View anzeigt?',
    options: [
        'Mehr Spalten hinzufügen',
        'Paging aktivieren, nur benötigte Attribute selektieren, ggf. denormalisierte Attribute statt Assoziationspfade verwenden',
        'Den List View durch eine Tabelle ersetzen',
        'Einen grösseren Server verwenden'
    ],
    correct: 1,
    explanation: 'Optimierungen: 1) Paging (max 20 Objekte pro Seite), 2) "Select Attributes" konfigurieren, 3) Assoziationspfade vermeiden wenn möglich (denormalisieren), 4) Indizes auf gesuchte Attribute setzen.'
},

// ============ ADDITIONAL ADVANCED TOPICS ============
{
    id: 'adv-conc-001',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist Optimistic Concurrency Control in Mendix und wann tritt ein Conflict auf?',
    options: [
        'Ein Mechanismus der verhindert dass zwei User gleichzeitig online sind',
        'Mendix speichert eine Versionsnummer (MxObjectVersion) pro Objekt -- wenn zwei User dasselbe Objekt ändern, erhält der zweite beim Commit einen Conflict',
        'Ein Locking-Mechanismus der Objekte für andere User sperrt',
        'Concurrency gibt es nur in Java Actions'
    ],
    correct: 1,
    explanation: 'Mendix nutzt Optimistic Locking: Jedes Objekt hat eine Versionsnummer (MxObjectVersion). Beim Commit wird geprüft ob sich die Version zwischenzeitlich geändert hat. Falls ja, wird eine ConcurrentModificationRuntimeException geworfen die im Microflow behandelt werden muss.'
},
{
    id: 'adv-sched-001',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was muss bei Scheduled Events in einem Cluster (mehrere Runtime-Instanzen) beachtet werden?',
    options: [
        'Scheduled Events laufen automatisch auf allen Instanzen gleichzeitig',
        'Nur EINE Instanz führt das Scheduled Event aus (Cluster Leader) -- die Logik muss idempotent und thread-safe sein',
        'Scheduled Events funktionieren im Cluster nicht',
        'Man muss für jede Instanz ein eigenes Scheduled Event erstellen'
    ],
    correct: 1,
    explanation: 'In einem Mendix-Cluster führt nur eine Instanz (der Cluster Leader) Scheduled Events aus. Die Logik sollte trotzdem idempotent sein (sicherer Neustart) und große Datenmengen in Batches verarbeiten um Timeouts zu vermeiden.'
},
{
    id: 'adv-doc-001',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wie generiert man PDF-Dokumente aus Mendix-Daten?',
    options: [
        'PDFs können in Mendix nicht generiert werden',
        'Über Document Templates (Mendix 9) oder das PDF Document Generation Modul (Mendix 10+) die ein Layout mit Mendix-Daten füllen und als PDF exportieren',
        'Nur über externe PDF-Libraries in Java',
        'Durch Screenshot der Seite als PDF'
    ],
    correct: 1,
    explanation: 'Für PDF-Generierung gab es in Mendix 9 Document Templates mit der "Generate Document" Aktivität. In Mendix 10+ sind Document Templates deprecated — stattdessen wird das "PDF Document Generation" Marketplace-Modul empfohlen, das flexiblere Layouts mit modernen Widgets ermöglicht.'
},
{
    id: 'adv-xpath-005',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Du hast Order und OrderLine mit einer 1:N-Assoziation. Wie findest du per XPath alle Orders die MINDESTENS eine OrderLine mit Amount > 1000 haben?',
    options: [
        '//Module.Order[Module.OrderLine/Module.Order/Amount > 1000]',
        '//Module.Order[Module.Order_OrderLine/Module.OrderLine/Amount > 1000]',
        '//Module.Order[Amount > 1000]',
        '//Module.Order[sum(Module.OrderLine/Amount) > 1000]'
    ],
    correct: 1,
    explanation: 'Man navigiert die Assoziation vom Order zur OrderLine: //Module.Order[Module.Order_OrderLine/Module.OrderLine/Amount > 1000]. Die Assoziationsrichtung und Naming-Konvention (Parent_Child) ist entscheidend für den korrekten Pfad.'
},
{
    id: 'adv-err-008',
    category: 'errorhandling',
    categoryLabel: 'Error Handling',
    question: 'Ein REST-Call gibt HTTP 429 (Too Many Requests) zurück. Wie behandelt man dies korrekt?',
    options: [
        'Den Call sofort wiederholen bis er funktioniert',
        'Custom Error Handling nutzen, den HTTP-Code prüfen und einen Retry mit exponentiellem Backoff implementieren',
        'Den REST-Service als fehlerhaft melden',
        'HTTP 429 kann in Mendix nicht erkannt werden'
    ],
    correct: 1,
    explanation: 'Best Practice: Custom Error Handling auf dem REST-Call, HTTP-Status 429 erkennen, dann mit Verzögerung (z.B. 1s, 2s, 4s exponentiell) erneut versuchen. Optional: Retry-Counter begrenzen und nach X Versuchen einen Fehler loggen.'
},

// ============ WORKFLOWS (Advanced) ============
{
    id: 'adv-wf-001',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Welches Element in einem Mendix Workflow ermöglicht es, zwei Aufgaben gleichzeitig (parallel) auszuführen?',
    options: [
        'Exclusive Split',
        'Parallel Split mit zugehörigem Join',
        'Multi-User Task',
        'Nested Workflow'
    ],
    correct: 1,
    explanation: 'Ein Parallel Split teilt den Workflow in mehrere parallele Pfade auf, die gleichzeitig aktiv sind. Ein Join-Element wartet dann darauf dass alle parallelen Pfade abgeschlossen sind bevor der Workflow fortfährt. So können z.B. mehrere Genehmigungen gleichzeitig eingeholt werden.'
},
{
    id: 'adv-wf-002',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was ist ein Multi-User Task in einem Workflow?',
    options: [
        'Ein Task der von genau einem Benutzer bearbeitet werden muss',
        'Ein Task der mehreren Benutzern zugewiesen wird, mit konfigurierbarer Abschlussbedingung (z.B. wenn 2 von 3 zustimmen)',
        'Ein Task der automatisch allen Benutzern zugewiesen wird',
        'Ein Task der nacheinander von mehreren Benutzern bearbeitet wird'
    ],
    correct: 1,
    explanation: 'Multi-User Tasks erlauben es, eine Aufgabe mehreren Benutzern gleichzeitig zuzuweisen. Die Abschlussbedingung ist konfigurierbar: z.B. "alle müssen zustimmen", "Mehrheitsentscheid", oder "mindestens X von Y". Dies ist ideal für Genehmigungsworkflows mit mehreren Genehmigern.'
},
{
    id: 'adv-wf-003',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Wie sollte die Workflow Context Entity gestaltet sein?',
    options: [
        'Sie sollte möglichst viele Attribute haben für zukünftige Erweiterungen',
        'Sie sollte alle für den Prozess relevanten Daten und Assoziationen enthalten, z.B. den Antrag und den Status',
        'Sie muss immer eine Non-Persistent Entity sein',
        'Sie wird automatisch von Mendix generiert'
    ],
    correct: 1,
    explanation: 'Die Workflow Context Entity ist eine persistente Entität die den gesamten Prozesskontext enthält. Sie sollte Assoziationen zu den relevanten Geschäftsobjekten haben (z.B. zum Urlaubsantrag) und Attribute für den Workflow-Status. Sie wird vom Entwickler definiert, nicht automatisch generiert.'
},
{
    id: 'adv-wf-004',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was passiert mit einem laufenden Workflow wenn die App neu deployed wird?',
    options: [
        'Alle laufenden Workflows werden abgebrochen',
        'Laufende Workflow-Instanzen werden fortgesetzt, da der Workflow-Zustand in der Datenbank persistiert wird',
        'Workflows werden automatisch neu gestartet',
        'Ein Deployment ist nicht möglich wenn Workflows laufen'
    ],
    correct: 1,
    explanation: 'Mendix Workflows sind langlebig und persistent. Der Zustand jeder Workflow-Instanz wird in der Datenbank gespeichert. Bei einem Re-Deployment werden laufende Instanzen fortgesetzt. Strukturelle Änderungen am Workflow-Modell können jedoch zu Konflikten führen.'
},
{
    id: 'adv-wf-005',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Wann sollte man einen Workflow statt eines Microflows verwenden?',
    options: [
        'Immer wenn Benutzerinteraktion nötig ist',
        'Für langlebige Geschäftsprozesse die über Tage/Wochen laufen und menschliche Entscheidungen erfordern',
        'Für alle Datenbankoperationen',
        'Workflows sind immer besser als Microflows'
    ],
    correct: 1,
    explanation: 'Workflows eignen sich für langlebige Prozesse: Genehmigungsworkflows, Onboarding-Prozesse, oder mehrstufige Anträge die über Tage oder Wochen laufen. Microflows sind für kurzlebige, sofort abgeschlossene Operationen gedacht. Die Faustregel: Wenn der Prozess auf einen Menschen warten muss, ist ein Workflow richtig.'
},
{
    id: 'adv-wf-006',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Wie konfiguriert man die Sicherheit für Workflow User Tasks?',
    options: [
        'Sicherheit wird automatisch vom System übernommen',
        'Über die "Allowed Roles" Eigenschaft des User Tasks und die Zuweisung über Microflow-Expressions',
        'Durch separate Access Rules auf der Workflow-Entität',
        'Workflows haben keine eigene Sicherheitskonfiguration'
    ],
    correct: 1,
    explanation: 'Für User Tasks definiert man welche Module Roles die Aufgabe sehen und bearbeiten dürfen. Zusätzlich kann über eine Microflow-Expression dynamisch bestimmt werden, welcher konkrete Benutzer die Aufgabe erhält (z.B. der Vorgesetzte des Antragstellers).'
},
{
    id: 'adv-wf-007',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was ist der Unterschied zwischen einem "Decision" und einem "Exclusive Split" in einem Workflow?',
    options: [
        'Es gibt keinen Unterschied',
        'Ein Decision basiert auf einer Expression und wählt EINEN Pfad, ein Exclusive Split erlaubt auch parallele Pfade',
        'Ein Decision verwendet Bedingungen auf dem Context-Objekt um den nächsten Pfad zu bestimmen',
        'Ein Exclusive Split gibt es nur in Microflows, nicht in Workflows'
    ],
    correct: 2,
    explanation: 'In Mendix Workflows gibt es das "Decision"-Element das analog zum Exclusive Split in Microflows funktioniert. Es wertet eine Bedingung auf dem Workflow Context aus und wählt basierend darauf EINEN von mehreren möglichen Pfaden. Für parallele Ausführung nutzt man den Parallel Split.'
},

// ============ MOBILE & OFFLINE ============
{
    id: 'adv-mob-001',
    category: 'mobile',
    categoryLabel: 'Mobile & Offline',
    question: 'Was ist der Hauptunterschied zwischen einer Native Mobile App und einer Progressive Web App (PWA) in Mendix?',
    options: [
        'PWAs sind schneller als Native Apps',
        'Native Apps werden mit React Native gebaut und nutzen native Gerätefunktionen, PWAs laufen im Browser',
        'Native Apps benötigen keinen App Store',
        'PWAs unterstützen Offline-Funktionalität, Native Apps nicht'
    ],
    correct: 1,
    explanation: 'Mendix Native Mobile Apps werden mit React Native gebaut und können native Gerätefunktionen wie Kamera, GPS und Push-Notifications nutzen. Sie werden über App Stores verteilt. PWAs sind webbasierte Apps die im Browser laufen und eingeschränkten Zugriff auf Gerätefunktionen haben.'
},
{
    id: 'adv-mob-002',
    category: 'mobile',
    categoryLabel: 'Mobile & Offline',
    question: 'Wo werden Daten in einer Offline-fähigen Mendix-App auf dem Gerät gespeichert?',
    options: [
        'Im Browser-Cache',
        'In einer lokalen SQLite-Datenbank auf dem Gerät',
        'In LocalStorage',
        'In einer Cloud-Datenbank die offline gecacht wird'
    ],
    correct: 1,
    explanation: 'Offline-fähige Mendix-Apps nutzen eine lokale SQLite-Datenbank auf dem Gerät. Beim Synchronisieren werden Daten zwischen der lokalen SQLite-DB und dem Server-Datenbank abgeglichen. Dies erlaubt vollständige Offline-Funktionalität mit strukturierten Daten.'
},
{
    id: 'adv-mob-003',
    category: 'mobile',
    categoryLabel: 'Mobile & Offline',
    question: 'Was passiert wenn zwei Benutzer dasselbe Objekt offline bearbeiten und dann synchronisieren?',
    options: [
        'Beide Änderungen werden automatisch zusammengeführt',
        'Die letzte Synchronisation gewinnt automatisch',
        'Es tritt ein Synchronisationskonflikt auf der im Error Handler der Sync-Aktion behandelt werden muss',
        'Offline-Bearbeitung desselben Objekts ist nicht möglich'
    ],
    correct: 2,
    explanation: 'Bei gleichzeitiger Offline-Bearbeitung desselben Objekts entsteht ein Synchronisationskonflikt. Mendix erkennt dies und löst einen Fehler in der Synchronisations-Aktion aus. Der Entwickler muss eine Konfliktlösungsstrategie implementieren, z.B. "letzte Änderung gewinnt" oder manuelle Auflösung.'
},
{
    id: 'adv-mob-004',
    category: 'mobile',
    categoryLabel: 'Mobile & Offline',
    question: 'Was ist die "Make It Native" App?',
    options: [
        'Ein Marketplace-Modul für native Widgets',
        'Eine Test-App von Mendix die es erlaubt Native-Mobile-Apps während der Entwicklung auf einem echten Gerät zu testen',
        'Ein Code-Generator für native iOS/Android-Apps',
        'Ein Plugin für Studio Pro'
    ],
    correct: 1,
    explanation: 'Die "Make It Native" App ist eine von Mendix bereitgestellte Test-App für iOS und Android. Während der Entwicklung verbindet sie sich mit dem lokalen Studio Pro und zeigt die App in Echtzeit auf dem Gerät an - ohne Build oder Deploy. Ideal für schnelles Testen von Native-Features.'
},
{
    id: 'adv-mob-005',
    category: 'mobile',
    categoryLabel: 'Mobile & Offline',
    question: 'Welche Synchronisationsstrategie sollte man für große Datenmengen in einer Offline-App wählen?',
    options: [
        'Immer Full Sync - alle Daten herunterladen',
        'Selective Sync - nur die für den Benutzer relevanten Daten herunterladen, definiert über XPath-Constraints',
        'Keine Synchronisation - alle Daten lokal erstellen',
        'Nur manuelle Synchronisation durch den Benutzer'
    ],
    correct: 1,
    explanation: 'Selective Sync ist für große Datenmengen empfohlen. Man definiert über XPath-Constraints welche Daten auf das Gerät synchronisiert werden, z.B. nur Aufträge des aktuellen Benutzers. So bleibt die Offline-Datenbank klein und die Sync-Zeiten kurz.'
},

// ============ DEPLOYMENT & CLOUD ============
{
    id: 'adv-dep-001',
    category: 'deployment',
    categoryLabel: 'Deployment',
    question: 'Was ist der Unterschied zwischen einer Free App und einem Licensed Node in Mendix Cloud?',
    options: [
        'Free Apps haben mehr Funktionen als Licensed Nodes',
        'Free Apps haben eingeschränkte Ressourcen, keinen eigenen Datenbankbackup und gehen nach Inaktivität in Sleep-Modus',
        'Free Apps und Licensed Nodes sind identisch',
        'Free Apps laufen nur lokal'
    ],
    correct: 1,
    explanation: 'Free Apps sind kostenlos haben aber Einschränkungen: begrenzte Ressourcen, kein eigener Backup, Sleep-Modus nach Inaktivität, keine Custom Domains, und nur eine Umgebung. Licensed Nodes bieten volle Ressourcen, automatische Backups, mehrere Umgebungen (Acceptance, Production) und SLA.'
},
{
    id: 'adv-dep-002',
    category: 'deployment',
    categoryLabel: 'Deployment',
    question: 'Was ist ein Transport Package (MDA-Datei) in Mendix?',
    options: [
        'Eine Datensicherung der Datenbank',
        'Ein Deployment-Paket das die gesamte App-Revision enthält und zwischen Umgebungen transportiert werden kann',
        'Ein Plugin für Studio Pro',
        'Ein Export der Benutzerkonten'
    ],
    correct: 1,
    explanation: 'Ein MDA-Datei (Mendix Deployment Archive) enthält die gesamte App einer bestimmten Revision. Es wird aus dem Team Server erstellt und kann in verschiedene Umgebungen deployed werden (Test → Acceptance → Production). Dies gewährleistet dass exakt derselbe Code in allen Umgebungen läuft.'
},
{
    id: 'adv-dep-003',
    category: 'deployment',
    categoryLabel: 'Deployment',
    question: 'Was bedeutet horizontale Skalierung in Mendix Cloud?',
    options: [
        'Mehr CPU und RAM für eine einzelne Instanz',
        'Mehrere Runtime-Instanzen der gleichen App die parallel laufen und den Traffic verteilen',
        'Mehr Festplattenplatz für die Datenbank',
        'Deployment in mehrere Regionen gleichzeitig'
    ],
    correct: 1,
    explanation: 'Horizontale Skalierung bedeutet dass mehrere Instanzen der Mendix Runtime parallel laufen. Ein Load Balancer verteilt den Traffic. Dies erhöht die Kapazität und Verfügbarkeit. Vertikale Skalierung (mehr RAM/CPU pro Instanz) ist die Alternative für ressourcenintensive Operationen.'
},
{
    id: 'adv-dep-004',
    category: 'deployment',
    categoryLabel: 'Deployment',
    question: 'Wie ändert man den Wert einer Konstante in der Production-Umgebung ohne Code-Änderung?',
    options: [
        'Man ändert den Wert in Studio Pro und deployed neu',
        'Über die Umgebungskonfiguration im Developer Portal können Konstantenwerte pro Umgebung gesetzt werden',
        'Konstanten können nach dem Deployment nicht geändert werden',
        'Man ändert die Datenbank direkt'
    ],
    correct: 1,
    explanation: 'Konstanten haben einen Default-Wert im Modell, können aber pro Umgebung im Developer Portal überschrieben werden. So kann man z.B. API-URLs für Test und Production unterschiedlich setzen ohne den Code zu ändern. Nach der Änderung muss die App neu gestartet werden.'
},

// ============ DOMAIN MODEL (Ergänzung) ============
{
    id: 'adv-dom-008',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Warum sollte man System.FileDocument spezialisieren statt es direkt zu verwenden?',
    options: [
        'System.FileDocument kann nicht direkt verwendet werden',
        'Spezialisierungen erlauben eigene Attribute, Sicherheitsregeln und Assoziationen - z.B. eine "Invoice" Entity mit Rechnungsnummer',
        'Es gibt keinen Vorteil einer Spezialisierung',
        'System.FileDocument unterstützt nur Bilder'
    ],
    correct: 1,
    explanation: 'Durch Spezialisierung von System.FileDocument kann man eigene Attribute hinzufügen (z.B. Dokumenttyp, Version), eigene Entity Access Rules definieren und spezifische Assoziationen erstellen. System.FileDocument direkt zu verwenden bietet keine Möglichkeit für granulare Sicherheitskonfiguration.'
},
{
    id: 'adv-dom-009',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was macht ein "After Startup" Microflow?',
    options: [
        'Er wird nach jedem Seiten-Laden ausgeführt',
        'Er wird einmalig nach dem Start der Mendix Runtime ausgeführt - ideal für Initialisierungen, Cache-Aufbau oder Konfigurationsprüfungen',
        'Er wird nach jedem Login eines Benutzers ausgeführt',
        'Er wird nur in der Entwicklungsumgebung ausgeführt'
    ],
    correct: 1,
    explanation: 'Der After Startup Microflow wird einmal ausgeführt wenn die Mendix Runtime startet. Typische Verwendungen: Daten initialisieren, Caches aufbauen, Scheduled Events konfigurieren, Konfigurationsdaten validieren oder externe Systeme verbinden. Er läuft BEVOR die App für Benutzer erreichbar ist.'
},
{
    id: 'adv-dom-010',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist das State Machine Pattern in Mendix?',
    options: [
        'Ein Pattern bei dem der Zustand der App im Browser gespeichert wird',
        'Eine Entität mit einem Status-Attribut (Enumeration) und Microflows die gültige Zustandsübergänge erzwingen',
        'Ein spezielles Workflow-Element',
        'Ein Design Pattern für die UI-Navigation'
    ],
    correct: 1,
    explanation: 'Das State Machine Pattern verwendet eine Enumeration als Status-Attribut (z.B. Draft → Submitted → Approved → Rejected). Microflows validieren ob ein Übergang erlaubt ist (z.B. nur von "Submitted" nach "Approved") und führen die zugehörige Logik aus. Dies verhindert ungültige Zustandsänderungen.'
},
{
    id: 'adv-dom-011',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist das Standard-Verhalten des DeleteAfterDownload-Attributs bei System.FileDocument?',
    options: [
        'true - Datei wird nach dem Download gelöscht',
        'false - Datei bleibt nach dem Download erhalten',
        'Das Attribut existiert nicht',
        'Es hängt von der Dateigröße ab'
    ],
    correct: 1,
    explanation: 'Das DeleteAfterDownload-Attribut steht standardmäßig auf false. Wenn man es auf true setzt, wird das FileDocument-Objekt automatisch nach dem Download durch den Benutzer gelöscht. Dies ist nützlich für temporäre Export-Dateien die nicht dauerhaft gespeichert werden sollen.'
},

// ============ PERFORMANCE (Ergänzung) ============
{
    id: 'adv-perf-010',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was ist die Task Queue in Mendix und wann verwendet man sie?',
    options: [
        'Eine Warteschlange für Benutzer-Logins',
        'Ein Mechanismus um Microflows asynchron im Hintergrund auszuführen, ohne den Benutzer warten zu lassen',
        'Eine Queue für Datenbankabfragen',
        'Ein Feature das nur in der Cloud verfügbar ist'
    ],
    correct: 1,
    explanation: 'Die Task Queue erlaubt es Microflows asynchron im Hintergrund auszuführen. Der Benutzer muss nicht auf das Ergebnis warten. Ideal für: E-Mail-Versand, PDF-Generierung, Datenimport oder andere langwierige Operationen. Im Gegensatz zu Scheduled Events werden Tasks durch Benutzeraktionen ausgelöst.'
},
{
    id: 'adv-perf-011',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was ist der Unterschied zwischen Task Queue und Scheduled Events?',
    options: [
        'Es gibt keinen Unterschied',
        'Task Queue führt Aufgaben sofort asynchron aus (event-driven), Scheduled Events laufen zu festgelegten Zeiten (zeitgesteuert)',
        'Task Queue ist schneller als Scheduled Events',
        'Scheduled Events können nur einmal pro Tag laufen'
    ],
    correct: 1,
    explanation: 'Task Queue ist event-driven: ein Microflow wird sofort (asynchron) ausgeführt wenn er in die Queue gestellt wird. Scheduled Events sind zeitgesteuert: sie laufen zu konfigurierten Zeitpunkten (z.B. alle 5 Minuten oder täglich um 3:00 Uhr). Task Queue für User-initiierte Hintergrundjobs, Scheduled Events für periodische Aufgaben.'
},
{
    id: 'adv-perf-012',
    category: 'performance',
    categoryLabel: 'Performance',
    question: 'Was ist der Unterschied zwischen Lazy Loading und Eager Loading bei Assoziationen in Mendix?',
    options: [
        'Lazy Loading lädt alle Daten sofort, Eager Loading lädt sie verzögert',
        'Lazy Loading lädt assoziierte Objekte erst beim ersten Zugriff, Eager Loading lädt sie sofort mit der Hauptabfrage',
        'Es gibt keinen Unterschied in Mendix',
        'Lazy Loading ist immer schneller'
    ],
    correct: 1,
    explanation: 'Lazy Loading (Standard in Mendix) lädt assoziierte Objekte erst wenn sie tatsächlich benötigt werden. Eager Loading (z.B. über Association Prefetching) lädt sie sofort mit. Lazy Loading spart Bandbreite wenn Assoziationen nicht immer benötigt werden, kann aber zu N+1-Problemen führen wenn in Listen jedes Objekt seine Assoziation einzeln lädt.'
},

// ============ UX & FRONTEND (Ergänzung) ============
{
    id: 'adv-ux-006',
    category: 'ux',
    categoryLabel: 'UX & Frontend',
    question: 'Wie ist die SASS-Dateistruktur in einem Mendix-Projekt aufgebaut?',
    options: [
        'Eine einzige CSS-Datei im Root-Verzeichnis',
        'Unter "themesource" gibt es modulspezifische SASS-Ordner, "theme" enthält die kompilierten CSS-Dateien',
        'SASS wird in Mendix nicht unterstützt',
        'Jede Seite hat ihre eigene CSS-Datei'
    ],
    correct: 1,
    explanation: 'Die "themesource"-Ordner enthalten die SASS/SCSS-Quelldateien, organisiert nach Modulen. Jedes Modul kann eigene Styling-Dateien haben. Der "theme"-Ordner enthält die kompilierten CSS-Dateien. Atlas UI liefert Basis-Styles die über "themesource/your-module" erweitert werden können.'
},
{
    id: 'adv-ux-007',
    category: 'ux',
    categoryLabel: 'UX & Frontend',
    question: 'Was sind Custom Design Properties in Mendix?',
    options: [
        'CSS-Klassen die man direkt im HTML schreibt',
        'Konfigurierbare Optionen in der Widget-Properties-Leiste die vordefinierte CSS-Klassen anwenden',
        'JavaScript-basierte Animationen',
        'Nur für Pluggable Widgets verfügbare Properties'
    ],
    correct: 1,
    explanation: 'Custom Design Properties erlauben es Entwicklern eigene Styling-Optionen zu definieren die dann in Studio Pro als Dropdown oder Toggle in den Widget-Properties erscheinen. Z.B. kann man eine "Size" Property erstellen die CSS-Klassen wie "btn-sm", "btn-md", "btn-lg" anwendet - ohne dass der Benutzer CSS kennen muss.'
},
{
    id: 'adv-ux-008',
    category: 'ux',
    categoryLabel: 'UX & Frontend',
    question: 'Wie passt man das Atlas UI Theme einer Mendix-App an?',
    options: [
        'Man ändert die Atlas-Dateien direkt im "themesource/atlas_core" Ordner',
        'Man erstellt eigene SASS-Variablen und Overrides im Modul-eigenen "themesource"-Ordner, OHNE Atlas-Core-Dateien zu ändern',
        'Man installiert ein alternatives CSS-Framework',
        'Atlas UI kann nicht angepasst werden'
    ],
    correct: 1,
    explanation: 'Man sollte NIEMALS die Atlas-Core-Dateien direkt ändern, da diese bei Updates überschrieben werden. Stattdessen erstellt man eigene SASS-Dateien im "themesource/[your-module]" Ordner und überschreibt Atlas-Variablen (Farben, Schriftgrößen, etc.) oder fügt eigene Klassen hinzu.'
},

// ============ TESTING (Ergänzung) ============
{
    id: 'adv-test-006',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Was ist ATS (Application Test Suite) in Mendix?',
    options: [
        'Ein Unit-Test-Framework für Microflows',
        'Ein Tool für automatisierte End-to-End-UI-Tests das Benutzerinteraktionen in der App simuliert',
        'Ein Performance-Test-Tool',
        'Ein Code-Review-Tool'
    ],
    correct: 1,
    explanation: 'ATS (Application Test Suite) ist ein Mendix-Tool für automatisierte UI-Tests. Es simuliert Benutzerinteraktionen (Klicks, Eingaben, Navigation) und überprüft ob die App korrekt reagiert. ATS kennt Mendix-Widgets und kann sie direkt ansprechen, was es effizienter als generische Selenium-Tests macht.'
},
{
    id: 'adv-test-007',
    category: 'testing',
    categoryLabel: 'Testing',
    question: 'Wie integriert man automatisierte Tests in eine Mendix CI/CD Pipeline?',
    options: [
        'Tests können nur manuell ausgeführt werden',
        'Über die Mendix Build API und Test-Automatisierung können Tests bei jedem Commit oder vor jedem Deployment automatisch laufen',
        'CI/CD ist in Mendix nicht möglich',
        'Man muss die App dafür in eine andere Programmiersprache konvertieren'
    ],
    correct: 1,
    explanation: 'Mendix unterstützt CI/CD über APIs: Die Build API erstellt Deployment Packages, die Deploy API deployed sie. Tests (Unit Tests via MUnit, UI Tests via ATS) können automatisiert vor dem Deployment ausgeführt werden. Tools wie Jenkins, Azure DevOps oder GitHub Actions können diese APIs ansprechen.'
},

// ============ PERFORMANCE & OPTIMIZATION (Neue Fragen) ============
{
    id: 'new-perf-001', category: 'performance', categoryLabel: 'Performance',
    question: 'Wann sollten Indexes in Mendix erstellt werden?',
    options: ['Auf Entitaeten mit mehr als 100 Datensaetzen die nicht nur ueber IDs gesucht werden', 'Nur auf Entitaeten mit mehr als 10.000 Datensaetzen', 'Nur auf primaere Schluessel', 'Indexes verlangsamen alles und sollten vermieden werden'],
    correct: 0, explanation: 'Indexes sollten auf Entitaeten mit >100 Datensaetzen erstellt werden die durch andere Attribute als IDs gesucht werden.'
},
{
    id: 'new-perf-002', category: 'performance', categoryLabel: 'Performance',
    question: 'Wie optimiert man einen Microflow der 1000 Objekte einzeln committed?',
    options: ['OQL-Query stattdessen verwenden', 'Commit auf Without Events setzen', 'Alle Objekte in einer Liste sammeln und einen einzigen List-Commit durchfuehren', 'Microflow asynchron ausfuehren'],
    correct: 2, explanation: 'Best Practice: CommitList vor der Schleife erstellen, Objekte sammeln, nach der Schleife ein einziger List-Commit.'
},
{
    id: 'new-perf-003', category: 'performance', categoryLabel: 'Performance',
    question: 'Welche Batch-Verarbeitungsstrategie ist bei 500.000+ Objekten am performantesten?',
    options: ['Alle Objekte auf einmal abrufen', 'Cursor-basierte Batch-Verarbeitung', 'Offset-basierte Batch-Verarbeitung mit Limit 10.000', 'Ein einzelner Microflow ohne Batch-Verarbeitung'],
    correct: 1, explanation: 'Cursor-basierte Verarbeitung ist ca. 2x schneller als Offset-basierte, da keine wachsenden Offsets noetig sind.'
},
{
    id: 'new-perf-004', category: 'performance', categoryLabel: 'Performance',
    question: 'Welche XPath-Optimierung empfiehlt Mendix?',
    options: ['contains fuer String-Suchen verwenden', 'Zuerst nach Attributen, dann nach Assoziationen filtern', 'OR-Operatoren fuer mehrere Bedingungen verwenden', 'unequal und not Klauseln vermeiden und in positive Ausdruecke umschreiben'],
    correct: 3, explanation: 'Mendix empfiehlt positive Ausdruecke statt not/unequal, z.B. boolean=false() statt boolean!=true().'
},
{
    id: 'new-perf-005', category: 'performance', categoryLabel: 'Performance',
    question: 'Was ist der Standard ConnectionPoolingMaxActive Wert und wann aendern?',
    options: ['Standard 50, sehr selten erhoehen da es meist nicht die richtige Loesung ist', 'Standard 10, bei Problemen erhoehen', 'Standard 100, bei wenig Benutzern reduzieren', 'Standard 200, nie aendern'],
    correct: 0, explanation: 'Standard ist 50. Mendix betont dass eine Erhoehung sehr selten die richtige Massnahme ist.'
},
{
    id: 'new-perf-006', category: 'errorHandling', categoryLabel: 'Error Handling',
    question: 'Was passiert bei Custom without Rollback wenn der Fehlerbehandlungs-Pfad mit einem Error Event endet?',
    options: ['Alle Aenderungen werden gespeichert', 'Nur die Aenderungen der fehlgeschlagenen Aktivitaet werden zurueckgesetzt', 'Alle Aenderungen werden zum initialen Savepoint zurueckgesetzt', 'Der Microflow wird ohne Rollback gestoppt'],
    correct: 2, explanation: 'Bei Error Event am Ende werden alle Aenderungen zum Savepoint zurueckgesetzt, wie bei einem regulaeren Rollback.'
},
{
    id: 'new-perf-007', category: 'errorHandling', categoryLabel: 'Error Handling',
    question: 'Welche vordefinierten Error-Objekte stehen in einem Custom Error Handler zur Verfuegung?',
    options: ['Nur $latestError', '$latestError, $latestSoapFault und $latestHttpResponse', 'Nur $errorMessage als String', '$exception und $stackTrace als separate Variablen'],
    correct: 1, explanation: 'Drei Objekte: $latestError (System.Error), $latestSoapFault (System.SoapFault), $latestHttpResponse.'
},
{
    id: 'new-perf-008', category: 'logging', categoryLabel: 'Logging',
    question: 'Welche Reihenfolge der Mendix Log-Levels ist korrekt (detailliertestes zuerst)?',
    options: ['Debug, Trace, Info, Warning, Error, Critical', 'Info, Debug, Trace, Warning, Error, Critical', 'Trace, Info, Debug, Warning, Error, Critical', 'Trace, Debug, Info, Warning, Error, Critical'],
    correct: 3, explanation: 'Korrekte Reihenfolge: Trace, Debug, Info, Warning, Error, Critical.'
},
{
    id: 'new-perf-009', category: 'logging', categoryLabel: 'Logging',
    question: 'Welcher Log-Node zeigt auf Trace-Level alle SQL-Queries?',
    options: ['ConnectionBus_Queries', 'ConnectionBus', 'DatabaseCore', 'SQL_Logger'],
    correct: 0, explanation: 'Der Log-Node ConnectionBus_Queries auf Trace-Level zeigt alle SQL-Queries. Der uebergeordnete ConnectionBus-Node hat Sub-Nodes wie _Queries, _Mapping, _Retrieve, _Security, _Update und _Validation.'
},
{
    id: 'new-perf-010', category: 'performance', categoryLabel: 'Performance',
    question: 'Was passiert bei Auto-Committed Objects bezueglich Events?',
    options: ['Before/After Commit Events werden normal ausgeloest', 'Auto-committed Objects existieren nur im Speicher', 'Auto-committed Objects loesen KEINE Before/After-Commit Events aus', 'Auto-committed Objects werden sofort geloescht'],
    correct: 2, explanation: 'Auto-committed Objects werden automatisch in die DB geschrieben aber OHNE Before/After Commit Events.'
},
{
    id: 'new-perf-011', category: 'performance', categoryLabel: 'Performance',
    question: 'Was passiert wenn man eine Liste abruft und dann die Groesse zaehlt?',
    options: ['Zwei separate Queries (SELECT und COUNT)', 'Mendix optimiert dies automatisch zu einer einzigen COUNT-Query', 'Mendix zaehlt im Arbeitsspeicher', 'Mendix cached die Liste'],
    correct: 1, explanation: 'Mendix erkennt das Retrieve+Count Muster und optimiert es zu einer einzigen COUNT-Query.'
},
{
    id: 'new-perf-012', category: 'performance', categoryLabel: 'Performance',
    question: 'Welche Mendix-Funktion ermoeglicht horizontal skalierbare Hintergrundverarbeitung?',
    options: ['Scheduled Events mit skip', 'Process Queue Modul', 'Java Actions mit Thread-Management', 'Task Queue - native Mendix-Loesung'],
    correct: 3, explanation: 'Task Queue (seit Mendix 9) ist die native Loesung fuer asynchrone, horizontal skalierbare Hintergrundverarbeitung.'
},
{
    id: 'new-perf-013', category: 'performance', categoryLabel: 'Performance',
    question: 'Was ist die empfohlene Maximalanzahl an Attributen in einem Composite Index?',
    options: ['Maximal 3, hoechstens 5', 'Maximal 2', 'Maximal 10', 'Kein Limit'],
    correct: 0, explanation: 'Mendix empfiehlt unter 3, maximal 5 Index-Spalten. Reihenfolge entscheidend.'
},
{
    id: 'new-perf-014', category: 'errorHandling', categoryLabel: 'Error Handling',
    question: 'Warum wird die Error-Handling-Option Continue nicht empfohlen?',
    options: ['Weil sie mehr Speicher verbraucht', 'Weil sie nicht mit Subflows kompatibel ist', 'Weil sie Fehler verschleiert - kein automatisches Logging oder Fehlermeldung', 'Weil sie immer ein Rollback durchfuehrt'],
    correct: 2, explanation: 'Continue verschleiert Probleme. Mendix empfiehlt Custom without Rollback stattdessen.'
},
{
    id: 'new-perf-015', category: 'errorHandling', categoryLabel: 'Error Handling',
    question: 'Welche vier Error-Handling-Optionen stehen in einem Mendix Microflow zur Verfuegung?',
    options: ['Try, Catch, Finally, Throw', 'Rollback, Custom with Rollback, Custom without Rollback, Continue', 'Abort, Retry, Ignore, Log', 'Cancel, Revert, Skip, Proceed'],
    correct: 1, explanation: 'Vier Optionen: Rollback (Standard), Custom with Rollback, Custom without Rollback und Continue.'
},

// ============ JAVA ACTIONS (Neue Fragen) ============
{
    id: 'new-java-001', category: 'java', categoryLabel: 'Java Actions',
    question: 'Welche Methode wird in der generierten Java-Klasse einer Java Action verwendet?',
    options: ['executeAction()', 'runAction()', 'performAction()', 'invokeAction()'],
    correct: 0, explanation: 'Fuer jede Java Action generiert Mendix eine Klasse mit einer executeAction() Methode.'
},
{
    id: 'new-java-002', category: 'java', categoryLabel: 'Java Actions',
    question: 'Was ist der Zweck eines Type Parameters in einer Java Action?',
    options: ['Er definiert den Datentyp der Konstanten', 'Er legt den Rueckgabetyp fest', 'Er verschiebt die Entity-Typ-Auswahl auf den Zeitpunkt der Verwendung', 'Er bestimmt die Sichtbarkeit'],
    correct: 2, explanation: 'Ein Type Parameter macht die Java Action generisch - der Entity-Typ wird erst bei Verwendung im Microflow festgelegt.'
},
{
    id: 'new-java-003', category: 'java', categoryLabel: 'Java Actions',
    question: 'Wie greift man typsicher auf Entity-Attribute in einer Java Action zu?',
    options: ['Ueber IMendixObject.getAttribute()', 'Ueber die generierten Proxy-Klassen im proxies-Package', 'Ueber Core.retrieveAttribute()', 'Ueber IContext.getObjectValue()'],
    correct: 1, explanation: 'Das proxies-Package enthaelt generierte Klassen mit typsicheren get/set-Methoden.'
},
{
    id: 'new-java-004', category: 'java', categoryLabel: 'Java Actions',
    question: 'Welche Core API Methode ruft Objekte per XPath aus der Datenbank ab?',
    options: ['Core.queryDatabase()', 'Core.createXPathQuery()', 'Core.selectByXPath()', 'Core.retrieveXPathQuery()'],
    correct: 1, explanation: 'Core.createXPathQuery() ist die aktuelle Methode fuer XPath-Abfragen in Java Actions. Die aeltere Core.retrieveXPathQuery() ist seit Mendix 7.17 deprecated. createXPathQuery bietet eine Fluent API mit setVariable(), setAmount() und execute().'
},

// ============ TESTING (Neue Fragen) ============
{
    id: 'new-testing-001', category: 'testing', categoryLabel: 'Testing',
    question: 'Wie muss ein Microflow benannt sein damit er vom UnitTesting-Modul erkannt wird?',
    options: ['Name muss mit Test_ oder UT_ beginnen', 'Name muss mit Unit beginnen', 'Name muss mit Verify beginnen', 'Name muss mit Check beginnen'],
    correct: 0, explanation: 'Test-Microflows muessen mit Test_ oder UT_ beginnen (case-insensitive), ohne Eingabeparameter, Boolean oder String als Rueckgabetyp.'
},
{
    id: 'new-testing-002', category: 'testing', categoryLabel: 'Testing',
    question: 'Was bedeutet ein nicht-leerer String als Rueckgabe eines Test-Microflows?',
    options: ['Test war erfolgreich, String ist die Erfolgsmeldung', 'Test wird uebersprungen', 'Test ist fehlgeschlagen, String ist die Fehlermeldung', 'Test wird als Warning markiert'],
    correct: 2, explanation: 'Bei String-Rueckgabetyp: leer = Erfolg, nicht-leer = fehlgeschlagen mit Fehlerbeschreibung.'
},
{
    id: 'new-testing-003', category: 'testing', categoryLabel: 'Testing',
    question: 'Wie konfiguriert man einen Conditional Breakpoint in Studio Pro?',
    options: ['Filter auf den Breakpoint anwenden', 'Einen Conditional Breakpoint setzen', 'Breakpoint nur im Debug-Modus aktivieren', 'Eine Umgebungsvariable setzen'],
    correct: 1, explanation: 'Breakpoints koennen mit Bedingungen versehen werden. Der Microflow haelt nur an wenn die Bedingung erfuellt ist.'
},

// ============ DEPLOYMENT (Neue Fragen) ============
{
    id: 'new-deploy-001', category: 'deployment', categoryLabel: 'Deployment',
    question: 'Wo werden Konstanten pro Umgebung in Mendix Cloud konfiguriert?',
    options: ['Im Model Options Tab der Environment Details', 'In Studio Pro Projekt-Konfiguration', 'In der constants.json Datei', 'Im Mendix Marketplace'],
    correct: 0, explanation: 'Konstanten werden pro Umgebung im Model Options Tab der Environment Details konfiguriert.'
},
{
    id: 'new-deploy-002', category: 'deployment', categoryLabel: 'Deployment',
    question: 'Welche Umgebungen sind standardmaessig in einem Mendix Cloud Node verfuegbar?',
    options: ['Development und Production', 'Staging, Test und Production', 'Test, Acceptance und Production', 'Development, Staging, Acceptance und Production'],
    correct: 2, explanation: 'Die meisten Mendix Cloud Nodes haben Test, Acceptance und Production.'
},
{
    id: 'new-deploy-003', category: 'deployment', categoryLabel: 'Deployment',
    question: 'Was ist der Mendix Operator im Kontext von Private Cloud?',
    options: ['Ein GUI-Tool fuer Cloud-Verwaltung', 'Ein Kubernetes-basierter Operator fuer Provisioning, Building, Deploying und Scaling', 'Ein Monitoring-Tool', 'Ein CI/CD-Plugin'],
    correct: 1, explanation: 'Der Mendix Operator basiert auf Kubernetes und ist verantwortlich fuer Provisioning, Building, Deploying und Scaling.'
},

// ============ COLLABORATION (Neue Fragen) ============
{
    id: 'new-collab-001', category: 'collaboration', categoryLabel: 'Collaboration',
    question: 'Welcher Konflikttyp entsteht wenn zwei Entwickler denselben Microflow aendern?',
    options: ['Delete-Delete Konflikt', 'Create-Create Konflikt', 'Update-Lock Konflikt', 'Modify-Modify Konflikt'],
    correct: 3, explanation: 'Gleichzeitige Aenderung am selben Dokument erzeugt einen Modify-Modify Konflikt.'
},
{
    id: 'new-collab-002', category: 'collaboration', categoryLabel: 'Collaboration',
    question: 'Was ist Merge feature branch?',
    options: ['Einen Feature-Branch erstellen', 'Einen kompletten Branch in die Main Line mergen', 'Einzelne Revisionen kopieren', 'Einen Branch loeschen'],
    correct: 1, explanation: 'Merge feature branch integriert einen kompletten Branch in die Main Line. Nur auf der Main Line verfuegbar.'
},

// ============ WORKFLOWS (Neue Fragen) ============
{
    id: 'new-wf-001', category: 'workflows', categoryLabel: 'Workflows',
    question: 'Welche Microflow-Aktivitaet aendert den Zustand einer Workflow-Instanz?',
    options: ['Call Workflow', 'Complete User Task', 'Retrieve Workflow Context', 'Change Workflow State'],
    correct: 3, explanation: 'Change Workflow State ermoeglicht Abort, Continue, Pause, Unpause, Restart oder Retry auf eine Workflow-Instanz.'
},
{
    id: 'new-wf-002', category: 'workflows', categoryLabel: 'Workflows',
    question: 'Was repraesentiert System.WorkflowDefinition?',
    options: ['Jede laufende Instanz', 'Die Liste aller User Tasks', 'Die Definition eines Workflows - ein Objekt pro Workflow in der App', 'Die Sicherheitseinstellungen'],
    correct: 2, explanation: 'System.WorkflowDefinition repraesentiert den Workflow wie er in Studio Pro definiert ist, ein Objekt pro Workflow.'
},
{
    id: 'new-wf-003', category: 'workflows', categoryLabel: 'Workflows',
    question: 'Was passiert wenn bei einer User Task das On-Created-Event fehlschlaegt?',
    options: ['Die User Task wird uebersprungen', 'Der Workflow wird neu gestartet', 'Die Task wird dem Administrator zugewiesen', 'Der State wird auf Failed gesetzt'],
    correct: 3, explanation: 'Bei fehlgeschlagenem Event wird der User Task State auf Failed gesetzt.'
},
];
