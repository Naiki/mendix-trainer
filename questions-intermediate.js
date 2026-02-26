// Mendix Intermediate Developer - Question Database
// Categories: xpath, microflows, domain, pages, collaboration, security, integration, agile, workflows

export const INTERMEDIATE_QUESTIONS = [

// ============ XPATH ============
{
    id: 'int-xpath-001',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Welcher XPath-Ausdruck ruft alle Bestellungen des aktuell eingeloggten Benutzers ab?',
    options: [
        '[MyModule.Order_Account/Administration.Account/id = \'[%CurrentUser%]\']',
        '[MyModule.Order_Account = \'[%CurrentUser%]\']',
        '[owner = \'[%CurrentUser%]\']',
        '[MyModule.Order_Account/Administration.Account = \'[%CurrentUser%]\']'
    ],
    correct: 3,
    explanation: 'In Mendix XPath traversiert man Assoziationen mit dem Pfad Module.Assoziation/Module.Entity. Beim Vergleich mit [%CurrentUser%] vergleicht man die assoziierte Account-Entität direkt, nicht deren id-Attribut.'
},
{
    id: 'int-xpath-002',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Was bewirkt der Token [%CurrentDateTime%] in einem XPath-Constraint?',
    options: [
        'Er gibt das Datum zurück, an dem die Entität erstellt wurde',
        'Er gibt den aktuellen Zeitstempel des Servers zurück',
        'Er gibt die letzte Änderungszeit des Objekts zurück',
        'Er gibt die aktuelle Browserzeit des Clients zurück'
    ],
    correct: 1,
    explanation: '[%CurrentDateTime%] ist ein XPath-Token, der den aktuellen Server-Zeitstempel zurückgibt. Er wird häufig verwendet, um Datensätze basierend auf Zeitvergleichen zu filtern.'
},
{
    id: 'int-xpath-003',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Wie kombiniert man zwei Bedingungen in einem XPath-Constraint?',
    options: [
        '[Attribut1 = "X" AND Attribut2 = "Y"]',
        '[Attribut1 = "X" && Attribut2 = "Y"]',
        '[Attribut1 = "X"][Attribut2 = "Y"]',
        '[Attribut1 = "X" and Attribut2 = "Y"]'
    ],
    correct: 3,
    explanation: 'In Mendix XPath verwendet man "and" (Kleinbuchstaben) um Bedingungen zu kombinieren. Alternativ kann man auch zwei separate Klammern verwenden [Bed1][Bed2], was implizit als AND funktioniert.'
},
{
    id: 'int-xpath-004',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Wo werden Entity Access XPath-Constraints in Mendix angewendet?',
    options: [
        'Nur bei Retrieve-Aktionen in Microflows',
        'Automatisch bei Seiten-Datenquellen; bei Microflows nur wenn "Apply entity access" aktiviert ist',
        'Bei ALLEN Datenbankabfragen ohne Ausnahme',
        'Nur wenn der Administrator es manuell aktiviert'
    ],
    correct: 1,
    explanation: 'Entity Access XPath-Constraints werden automatisch auf Seiten-Datenquellen angewendet. Bei Microflows gilt der Constraint NUR wenn "Apply entity access" aktiviert ist (standardmäßig DEAKTIVIERT). Das ist ein wichtiges Sicherheitskonzept - System-Microflows können so auf alle Daten zugreifen.'
},
{
    id: 'int-xpath-005',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Welcher XPath-Ausdruck findet alle Produkte mit einem Preis grösser als 100?',
    options: [
        '[Preis > 100]',
        '[Preis gt 100]',
        '[Preis greater 100]',
        '[Preis >= 100]'
    ],
    correct: 0,
    explanation: 'Mendix XPath verwendet Standard-Vergleichsoperatoren: =, !=, <, >, <=, >=. Der Ausdruck [Preis > 100] filtert alle Objekte deren Preis-Attribut grösser als 100 ist.'
},
{
    id: 'int-xpath-006',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Wie navigiert man in XPath über eine 1-zu-N Assoziation von der N-Seite zur 1-Seite?',
    options: [
        'Man kann nur von der 1-Seite zur N-Seite navigieren',
        '[Module.Assoziation/Module.ParentEntity/Attribut = "Wert"]',
        '[Module.ParentEntity/Attribut = "Wert"]',
        '[parent/Attribut = "Wert"]'
    ],
    correct: 1,
    explanation: 'In XPath navigiert man über Assoziationen mit dem vollen Pfad: Module.Assoziationsname/Module.Zielentität. Dies funktioniert in beide Richtungen der Assoziation.'
},
{
    id: 'int-xpath-007',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Was passiert wenn ein XPath-Constraint auf einem Reference Selector verwendet wird?',
    options: [
        'Er filtert die angezeigten Optionen in der Dropdown-Liste',
        'Er validiert die Auswahl nach dem Speichern',
        'Er ändert die Sortierung der Optionen',
        'Er hat keine Auswirkung auf Reference Selectors'
    ],
    correct: 0,
    explanation: 'XPath-Constraints auf Reference Selectors filtern die auswahlbaren Optionen. So kann man z.B. nur aktive Kunden oder nur Produkte einer bestimmten Kategorie anzeigen.'
},
{
    id: 'int-xpath-008',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Welcher XPath findet Objekte die KEIN assoziiertes Objekt haben?',
    options: [
        '[not(Module.Assoziation/Module.Entity)]',
        '[Module.Assoziation = null]',
        '[Module.Assoziation = empty]',
        '[Module.Assoziation/Module.Entity = none]'
    ],
    correct: 0,
    explanation: 'Für leere Assoziationen ist [not(Module.Assoziation/Module.Entity)] die offiziell dokumentierte Syntax. Die not()-Funktion mit dem vollen Assoziationspfad prüft ob KEIN assoziiertes Objekt existiert. Für leere Attribute verwendet man dagegen "= empty".'
},
{
    id: 'int-xpath-009',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Wie verwendet man den OR-Operator in XPath?',
    options: [
        '[Attribut = "X" || Attribut = "Y"]',
        '[Attribut = "X" OR Attribut = "Y"]',
        '[Attribut = "X" or Attribut = "Y"]',
        '[Attribut = "X" | Attribut = "Y"]'
    ],
    correct: 2,
    explanation: 'Der OR-Operator in Mendix XPath wird kleingeschrieben: "or". Grossschreibung oder Symbole wie || oder | funktionieren nicht.'
},
{
    id: 'int-xpath-010',
    category: 'xpath',
    categoryLabel: 'XPath',
    question: 'Welcher Token bezieht sich in einem XPath-Constraint auf das Kontextobjekt der umgebenden Data View?',
    options: [
        '[%CurrentUser%]',
        '[%CurrentObject%]',
        '[%SelectedObject%]',
        '[%PageObject%]'
    ],
    correct: 1,
    explanation: '[%CurrentObject%] bezieht sich auf das Kontextobjekt der umgebenden Data View. Er ist nur in bestimmten Kontexten verfügbar (z.B. XPath-Constraints auf Reference Selectors oder Data Grids innerhalb einer Data View). Nicht verwechseln mit [%CurrentUser%] der den eingeloggten Benutzer referenziert.'
},

// ============ MICROFLOWS ============
{
    id: 'int-mf-001',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Wann sollte man einen Sub-Microflow verwenden?',
    options: [
        'Nur wenn der Microflow mehr als 20 Aktivitäten hat',
        'Wenn eine Logik-Sequenz wiederverwendbar ist oder der Microflow übersichtlicher werden soll',
        'Sub-Microflows sind nur für Scheduled Events erlaubt',
        'Nur wenn ein Microflow von einer Seite UND einem anderen Microflow aufgerufen wird'
    ],
    correct: 1,
    explanation: 'Sub-Microflows dienen der Wiederverwendbarkeit und Übersichtlichkeit. Man extrahiert Logik-Blöcke als Sub-Microflow, wenn sie wiederverwendet werden oder der Haupt-Microflow zu komplex wird.'
},
{
    id: 'int-mf-002',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was ist eine "Rule" in Mendix?',
    options: [
        'Eine Validierungsregel auf einem Attribut',
        'Ein Microflow-ähnliches Konstrukt das einen Boolean oder eine Enumeration zurückgibt',
        'Eine Sicherheitsregel für Entity Access',
        'Ein vordefinierter Workflow-Schritt'
    ],
    correct: 1,
    explanation: 'Eine Rule ist ein Microflow-ähnliches Konstrukt das einen Boolean (true/false) oder eine Enumeration zurückgibt. Rules werden typischerweise in Exclusive Splits verwendet, um die Entscheidungslogik wiederverwendbar und testbar zu halten.'
},
{
    id: 'int-mf-003',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Welche Aggregat-Funktion ist NICHT in Microflows verfügbar?',
    options: [
        'Sum',
        'Average',
        'Median',
        'Count'
    ],
    correct: 2,
    explanation: 'Die verfügbaren Aggregat-Funktionen in Mendix Microflows sind: Sum, Average, Count, Minimum, Maximum sowie All, Any und Reduce. Median ist nicht als eingebaute Aggregat-Funktion verfügbar.'
},
{
    id: 'int-mf-004',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Wie kann man in einem Loop (Schleife) vorzeitig abbrechen?',
    options: [
        'Mit einer "Return" Aktivität',
        'Mit einem "Break Event"',
        'Mit einer "Stop" Aktivität',
        'Man kann Loops in Mendix nicht vorzeitig abbrechen'
    ],
    correct: 1,
    explanation: 'Ein Break Event beendet die aktuelle Schleife vorzeitig. Der Microflow fährt nach dem Loop fort. Ein Return würde den gesamten Microflow beenden, nicht nur die Schleife.'
},
{
    id: 'int-mf-005',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was ist ein Scheduled Event in Mendix?',
    options: [
        'Ein Event das bei Änderung eines Objekts ausgelöst wird',
        'Ein zeitgesteuerter Microflow der automatisch ausgeführt wird',
        'Ein Event das bei Seitennavigation ausgelöst wird',
        'Ein einmaliger Task der nach Deployment ausgeführt wird'
    ],
    correct: 1,
    explanation: 'Ein Scheduled Event ist ein zeitgesteuerter Trigger der einen Microflow automatisch ausführt - z.B. täglich um 3:00 Uhr oder alle 5 Minuten. Es wird über die Scheduling-Konfiguration gesteuert.'
},
{
    id: 'int-mf-006',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Wie setzt man einen Breakpoint zum Debuggen in einem Microflow?',
    options: [
        'Rechtsklick auf eine Aktivität > "Add breakpoint"',
        'Im Menü: Run > Set Breakpoint',
        'Man zieht ein Debug-Element aus der Toolbox',
        'Breakpoints sind nur in Java-Aktionen möglich'
    ],
    correct: 0,
    explanation: 'Breakpoints werden per Rechtsklick auf eine Microflow-Aktivität gesetzt ("Add breakpoint"). Beim Ausführen stoppt der Microflow an dieser Stelle und man kann Variablen inspizieren. Entfernen via "Remove breakpoint" im gleichen Kontextmenü.'
},
{
    id: 'int-mf-007',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was ist der Unterschied zwischen einem Microflow und einem Nanoflow?',
    options: [
        'Nanoflows sind schneller als Microflows',
        'Microflows laufen auf dem Server, Nanoflows auf dem Client',
        'Nanoflows können keine Datenbank-Operationen ausführen',
        'Es gibt keinen Unterschied, nur den Namen'
    ],
    correct: 1,
    explanation: 'Der Hauptunterschied: Microflows laufen auf dem Server und haben Zugriff auf alle Server-Ressourcen. Nanoflows laufen auf dem Client (Browser/Gerät) und sind daher schneller für UI-Logik, haben aber eingeschränkten Zugriff.'
},
{
    id: 'int-mf-008',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Welche Aktivität zeigt dem Benutzer eine Nachricht im Browser?',
    options: [
        'Log Message',
        'Show Message',
        'Client Notification',
        'Display Alert'
    ],
    correct: 1,
    explanation: 'Die "Show Message" Aktivität zeigt dem Benutzer eine Nachricht im Browser an. Log Message schreibt nur ins Server-Log. Es gibt verschiedene Typen: Information, Warning, Error.'
},
{
    id: 'int-mf-009',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was passiert bei einem "Exclusive Split" wenn keine der Bedingungen zutrifft?',
    options: [
        'Der Microflow bricht mit einem Fehler ab',
        'Der Microflow folgt dem Default-Pfad (falls konfiguriert)',
        'Der Microflow stoppt ohne Fehler',
        'Die erste Bedingung wird automatisch als true behandelt'
    ],
    correct: 1,
    explanation: 'Wenn keine Bedingung zutrifft, folgt der Microflow dem Default-Pfad. Ohne Default-Pfad würde der Microflow mit einem Fehler abbrechen. Es ist Best Practice immer einen Default-Pfad zu definieren.'
},
{
    id: 'int-mf-010',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Welche Aktion führt eine Datenbankabfrage in einem Microflow aus?',
    options: [
        'Database Query',
        'Retrieve',
        'Get Objects',
        'Select'
    ],
    correct: 1,
    explanation: 'Die "Retrieve" Aktivität führt Datenbankabfragen aus. Man kann über Assoziation oder aus der Datenbank abrufen, mit optionalen XPath-Constraints und Sortierung.'
},

// ============ DOMAIN MODELING ============
{
    id: 'int-dom-001',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist eine Non-Persistent Entity in Mendix?',
    options: [
        'Eine Entität die nur einmal existieren kann',
        'Eine Entität die nicht in der Datenbank gespeichert wird',
        'Eine Entität ohne Attribute',
        'Eine Entität die nach dem Deployment gelöscht wird'
    ],
    correct: 1,
    explanation: 'Non-Persistent Entities werden nicht in der Datenbank gespeichert. Sie existieren nur im Arbeitsspeicher während der Session. Typische Verwendung: temporäre Formulardaten, Suchobjekte, API-Responses.'
},
{
    id: 'int-dom-002',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Wann wird ein "Before Commit" Event Handler ausgeführt?',
    options: [
        'Bevor das Objekt auf der Seite angezeigt wird',
        'Bevor das Objekt in die Datenbank geschrieben wird',
        'Bevor das Objekt erstellt wird',
        'Bevor der Benutzer auf Speichern klickt'
    ],
    correct: 1,
    explanation: 'Der "Before Commit" Event Handler wird ausgeführt kurz bevor das Objekt in die Datenbank geschrieben (committed) wird. Er eignet sich für Validierungen und automatische Berechnungen.'
},
{
    id: 'int-dom-003',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was sind System Members in Mendix?',
    options: [
        'Attribute die nur Administratoren sehen können',
        'Automatisch verwaltete Attribute wie createdDate, changedDate, owner, changedBy',
        'Spezielle Rollen im System-Modul',
        'Datenbank-Indizes die automatisch erstellt werden'
    ],
    correct: 1,
    explanation: 'System Members sind automatisch verwaltete Attribute: createdDate (Erstellungsdatum), changedDate (letztes Änderungsdatum), owner (Ersteller), changedBy (letzter Bearbeiter). Sie müssen in den Entity-Einstellungen aktiviert werden.'
},
{
    id: 'int-dom-004',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was passiert wenn man die Delete Behavior einer Assoziation auf "Delete associated objects" setzt?',
    options: [
        'Das assoziierte Objekt wird beim Löschen des Besitzer-Objekts mitgelöscht',
        'Beide Objekte werden gleichzeitig gelöscht',
        'Nur die Assoziation wird gelöscht, nicht die Objekte',
        'Das Löschen wird verhindert wenn assoziierte Objekte existieren'
    ],
    correct: 0,
    explanation: 'Bei "Delete associated objects" werden die assoziierten Objekte automatisch mitgelöscht wenn das Besitzer-Objekt gelöscht wird. Alternative: "Delete [Entity] object only" oder Prevent Delete.'
},
{
    id: 'int-dom-005',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist der Unterschied zwischen Generalization und Assoziation?',
    options: [
        'Es gibt keinen Unterschied',
        'Generalization ist eine "ist-ein" Beziehung, Assoziation ist eine "hat-ein" Beziehung',
        'Generalization ist schneller als Assoziation',
        'Assoziation kann nur zwischen 2 Entitäten bestehen, Generalization zwischen mehreren'
    ],
    correct: 1,
    explanation: 'Generalization (Vererbung) modelliert eine "ist-ein" Beziehung (z.B. Student IST ein Person). Assoziation modelliert eine "hat-ein" Beziehung (z.B. Order HAT OrderLines). Bei Generalization erbt die Spezialisierung alle Attribute und Assoziationen.'
},
{
    id: 'int-dom-006',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Kann man Assoziationen zwischen Entitäten verschiedener Module erstellen?',
    options: [
        'Nein, Assoziationen funktionieren nur innerhalb eines Moduls',
        'Ja, Cross-Module Assoziationen sind möglich',
        'Nur wenn beide Module den gleichen Besitzer haben',
        'Nur über das System-Modul als Vermittler'
    ],
    correct: 1,
    explanation: 'Cross-Module Assoziationen sind in Mendix vollständig unterstützt. Man muss dabei beachten, dass Sicherheitsregeln beider Module berücksichtigt werden müssen.'
},
{
    id: 'int-dom-007',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist ein Calculated Attribute?',
    options: [
        'Ein Attribut das in der Datenbank berechnet wird',
        'Ein Attribut dessen Wert durch einen Microflow berechnet wird',
        'Ein Attribut das automatisch inkrementiert',
        'Ein Attribut das nur gelesen werden kann'
    ],
    correct: 1,
    explanation: 'Ein Calculated Attribute wird nicht in der Datenbank gespeichert, sondern sein Wert wird bei jedem Zugriff durch einen Microflow berechnet. Achtung: Dies kann Performance-Auswirkungen haben wenn es häufig aufgerufen wird.'
},
{
    id: 'int-dom-008',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Welche Event Handler gibt es für Entitäten in Mendix?',
    options: [
        'Before Commit, After Commit, Before Delete, After Delete',
        'Before Commit, After Commit, Before Delete, After Delete, Before Rollback, After Rollback',
        'Before Create, After Create, Before Commit, After Commit, Before Delete, After Delete, Before Rollback, After Rollback',
        'Before Save, After Save, Before Delete, After Delete'
    ],
    correct: 2,
    explanation: 'Mendix hat acht Event Handler (4 Typen × 2 Momente): Before/After Create, Before/After Commit, Before/After Delete und Before/After Rollback. Die Create-Events werden beim Erstellen eines Objekts ausgelöst, die Rollback-Events wenn ein Objekt zurückgesetzt wird.'
},
{
    id: 'int-dom-009',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was passiert mit Non-Persistent Entities am Ende einer Benutzer-Session?',
    options: [
        'Sie werden in die Datenbank geschrieben',
        'Sie werden automatisch gelöscht / der Speicher wird freigegeben',
        'Sie bleiben im Cache für die nächste Session',
        'Sie erzeugen einen Fehler wenn nicht manuell gelöscht'
    ],
    correct: 1,
    explanation: 'Non-Persistent Entities existieren nur im Arbeitsspeicher der aktuellen Session. Wenn die Session endet (Benutzer loggt aus, Timeout), wird der Speicher automatisch freigegeben.'
},
{
    id: 'int-dom-010',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Wie viele Assoziationen kann man zwischen denselben zwei Entitäten erstellen?',
    options: [
        'Maximal eine',
        'Maximal zwei (eine pro Richtung)',
        'Beliebig viele',
        'Maximal drei'
    ],
    correct: 2,
    explanation: 'Man kann beliebig viele Assoziationen zwischen denselben zwei Entitäten erstellen. Jede Assoziation muss einen eindeutigen Namen haben und repräsentiert eine andere Beziehung (z.B. Order hat BillingAddress UND ShippingAddress).'
},

// ============ PAGES / UI ============
{
    id: 'int-pages-001',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was ist ein "Snippet" in Mendix?',
    options: [
        'Ein Code-Fragment in einer Java-Aktion',
        'Ein wiederverwendbares UI-Element das auf mehreren Seiten eingebettet werden kann',
        'Ein Template für neue Seiten',
        'Ein vordefiniertes Layout'
    ],
    correct: 1,
    explanation: 'Ein Snippet ist ein wiederverwendbares UI-Fragment das in mehreren Seiten eingebettet werden kann. Änderungen am Snippet wirken sich auf alle Seiten aus, die es verwenden - DRY-Prinzip.'
},
{
    id: 'int-pages-002',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was ist der Unterschied zwischen einem Building Block und einem Snippet?',
    options: [
        'Es gibt keinen Unterschied',
        'Building Blocks erstellen eine Kopie, Snippets eine Referenz',
        'Building Blocks sind nur im Marketplace verfügbar',
        'Snippets sind schneller als Building Blocks'
    ],
    correct: 1,
    explanation: 'Der entscheidende Unterschied: Ein Building Block erstellt beim Einfügen eine KOPIE der Widgets (unabhängig vom Original). Ein Snippet erstellt eine REFERENZ - Änderungen am Snippet wirken sich überall aus.'
},
{
    id: 'int-pages-003',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was sind "Placeholders" in einem Layout?',
    options: [
        'Bereiche die temporären Inhalt anzeigen',
        'Definierte Bereiche im Layout die von Seiten mit eigenem Inhalt gefüllt werden',
        'Unsichtbare Container für CSS-Styling',
        'Fehlermeldungen die angezeigt werden wenn Daten fehlen'
    ],
    correct: 1,
    explanation: 'Placeholders sind definierte Bereiche in einem Layout die von den Seiten die das Layout verwenden mit eigenem Inhalt befüllt werden können. So definiert das Layout die Grundstruktur, und jede Seite füllt die Placeholders unterschiedlich.'
},
{
    id: 'int-pages-004',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was ist Atlas UI in Mendix?',
    options: [
        'Ein externes CSS-Framework das manuell installiert werden muss',
        'Das Design-System von Mendix mit Themes, Building Blocks und Design Properties',
        'Ein Tool zum Erstellen von mobilen Apps',
        'Ein Page-Editor Plugin für Studio Pro'
    ],
    correct: 1,
    explanation: 'Atlas UI ist das integrierte Design-System von Mendix. Es bietet vordefinierte Themes, Building Blocks, Design Properties und Layouts die konsistentes Design ermöglichen.'
},
{
    id: 'int-pages-005',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Wie kann man eine benutzerdefinierte Login-Seite in Mendix erstellen?',
    options: [
        'Die login.html Datei im Theme-Ordner bearbeiten',
        'Unter Navigation eine eigene Seite als Login-Page zuweisen',
        'Login-Seiten können nicht angepasst werden',
        'Ein Custom Widget für Login installieren'
    ],
    correct: 1,
    explanation: 'Man erstellt eine normale Seite mit Login-Widgets und konfiguriert diese unter Navigation > Authentication als Login-Page. Mendix leitet dann automatisch zu dieser Seite um.'
},
{
    id: 'int-pages-006',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was sind Design Properties in Mendix?',
    options: [
        'CSS-Klassen die direkt im HTML geschrieben werden',
        'Vordefinierte Styling-Optionen die man per Dropdown auf Widgets anwenden kann',
        'Globale Variablen im Theme',
        'Properties die nur im Design-Modus sichtbar sind'
    ],
    correct: 1,
    explanation: 'Design Properties sind vordefinierte Styling-Optionen die per Dropdown im Property-Panel auf Widgets angewandt werden können. Sie abstrahieren CSS-Klassen und machen Styling zugänglich ohne CSS-Kenntnisse.'
},
{
    id: 'int-pages-007',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was ist der Unterschied zwischen einer Data View und einem List View?',
    options: [
        'Data View zeigt ein einzelnes Objekt, List View zeigt eine Liste von Objekten',
        'Data View ist für Formulare, List View für Tabellen',
        'Es gibt keinen funktionalen Unterschied',
        'Data View ist älter und sollte nicht mehr verwendet werden'
    ],
    correct: 0,
    explanation: 'Eine Data View zeigt die Daten eines EINZELNEN Objekts (z.B. Detailansicht). Ein List View zeigt eine LISTE von Objekten an. Ein Template Grid ist eine weitere Option für Listen mit kartenbasiertem Layout.'
},
{
    id: 'int-pages-008',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Wo befindet sich die Theme-Ordnerstruktur in einem Mendix-Projekt?',
    options: [
        'Im "resources" Ordner',
        'Im "theme" oder "themesource" Ordner',
        'Im "widgets" Ordner',
        'Themes werden nur in der Cloud konfiguriert'
    ],
    correct: 1,
    explanation: 'Die Theme-Dateien befinden sich im "theme" und "themesource" Ordner des Projekts. Der "themesource" Ordner enthält die SASS/CSS-Quellen, der "theme" Ordner die kompilierten Dateien.'
},

// ============ COLLABORATION ============
{
    id: 'int-collab-001',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Was ist der Team Server in Mendix?',
    options: [
        'Ein Deployment-Server für Mendix-Apps',
        'Das Version-Control-System (basierend auf SVN/Git) für Mendix-Projekte',
        'Ein Chat-Server für Team-Kommunikation',
        'Ein Server der die Mendix-Lizenzen verwaltet'
    ],
    correct: 1,
    explanation: 'Der Team Server ist das zentrale Version-Control-System für Mendix-Projekte. Es ermöglicht Commits, Branch Lines, Merging und kollaborative Entwicklung im Team.'
},
{
    id: 'int-collab-002',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Was ist eine Branch Line in Mendix?',
    options: [
        'Eine Verbindung zwischen zwei Modulen',
        'Ein paralleler Entwicklungszweig basierend auf der Main Line',
        'Eine Deployment-Pipeline',
        'Ein Feature-Flag im Code'
    ],
    correct: 1,
    explanation: 'Eine Branch Line ist ein paralleler Entwicklungszweig. Teams nutzen Branches um Features isoliert zu entwickeln und später in die Main Line zu mergen. So können mehrere Features gleichzeitig entwickelt werden.'
},
{
    id: 'int-collab-003',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Was bedeutet "Merge Feature Branch" in Studio Pro?',
    options: [
        'Einzelne Revisionen aus einem Branch in einen anderen übernehmen',
        'Den gesamten Feature-Branch in die Main Line integrieren',
        'Zwei Branches zusammenführen und beide löschen',
        'Den aktuellen Branch als neuen Hauptzweig setzen'
    ],
    correct: 1,
    explanation: '"Merge Feature Branch" integriert den GESAMTEN Feature-Branch in die aktuelle Branch Line (typischerweise die Main Line). "Advanced Merge" erlaubt dagegen das selektive Übernehmen einzelner Revisionen.'
},
{
    id: 'int-collab-004',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Wer ist typischerweise der "Business Engineer" in einem Mendix-Projekt?',
    options: [
        'Ein reiner Software-Entwickler',
        'Ein Domain-Experte der mit Low-Code die App mitentwickelt',
        'Der Projekt-Manager',
        'Der Datenbank-Administrator'
    ],
    correct: 1,
    explanation: 'Der Business Engineer ist ein Domain-Experte (z.B. aus der Fachabteilung) der mit Mendix Low-Code die Anwendung mitentwickelt. Er bringt das Fachwissen ein und kann selbst Teile der App erstellen.'
},
{
    id: 'int-collab-005',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Was passiert bei einem Merge-Konflikt in Mendix?',
    options: [
        'Die ältere Version gewinnt immer',
        'Studio Pro zeigt die Konflikte an und bietet Optionen zur Auflösung',
        'Der Merge wird automatisch abgebrochen',
        'Konflikte sind in Mendix nicht möglich'
    ],
    correct: 1,
    explanation: 'Bei Merge-Konflikten zeigt Studio Pro die betroffenen Dokumente an. Man kann für jeden Konflikt wählen: die eigene Version behalten, die andere Version übernehmen, oder (bei bestimmten Dokumenttypen) manuell auflösen.'
},

// ============ SECURITY ============
{
    id: 'int-sec-001',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Auf welchen drei Ebenen wird Sicherheit in Mendix konfiguriert?',
    options: [
        'App, Module, Entität',
        'Projekt, Seite, Widget',
        'Server, Client, Datenbank',
        'User, Rolle, Berechtigung'
    ],
    correct: 0,
    explanation: 'Mendix-Sicherheit wird auf drei Ebenen konfiguriert: 1) App-Level (Sicherheitsstufe, User Roles), 2) Module-Level (Module Roles, Page/Microflow/Entity Access), 3) Entitäts-Level (CRUD-Berechtigungen pro Rolle mit XPath-Constraints).'
},
{
    id: 'int-sec-002',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was ist der Unterschied zwischen einer User Role und einer Module Role?',
    options: [
        'Es gibt keinen Unterschied',
        'User Roles sind app-weit, Module Roles sind modul-spezifisch und werden User Roles zugeordnet',
        'Module Roles haben mehr Berechtigungen als User Roles',
        'User Roles sind für Endbenutzer, Module Roles für Entwickler'
    ],
    correct: 1,
    explanation: 'User Roles sind auf App-Ebene definiert und repräsentieren die Rollen die ein Benutzer haben kann (z.B. Admin, User). Module Roles sind auf Modul-Ebene definiert und steuern den Zugriff innerhalb eines Moduls. User Roles werden Module Roles zugeordnet.'
},
{
    id: 'int-sec-003',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Wie konfiguriert man Entity Access in Mendix?',
    options: [
        'Durch XPath-Constraints auf der Seite',
        'Durch Access Rules auf der Entität die CRUD-Berechtigungen pro Module Role definieren',
        'Durch Microflow-Logik vor jedem Datenbankzugriff',
        'Durch Konfiguration in der Datenbank selbst'
    ],
    correct: 1,
    explanation: 'Entity Access wird durch Access Rules auf der Entität konfiguriert. Für jede Module Role definiert man: Create, Read, Write, Delete Berechtigungen sowie optionale XPath-Constraints die die sichtbaren Daten weiter einschränken.'
},
{
    id: 'int-sec-004',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was passiert wenn man Anonymous Users in der App-Sicherheit aktiviert?',
    options: [
        'Alle Benutzer können alles sehen',
        'Nicht eingeloggte Benutzer können Seiten sehen die der Anonymous User Role zugeordnet sind',
        'Die App erfordert kein Login mehr',
        'Anonymous Users haben automatisch Admin-Rechte'
    ],
    correct: 1,
    explanation: 'Bei aktivierten Anonymous Users können nicht-eingeloggte Benutzer auf Seiten und Funktionen zugreifen die der Anonymous User Role zugeordnet sind. Alle anderen Bereiche erfordern weiterhin Login.'
},
{
    id: 'int-sec-005',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Welche Sicherheitsstufen gibt es in Mendix?',
    options: [
        'Off, Basic, Advanced',
        'Off, Prototype/Demo, Production',
        'Low, Medium, High',
        'Development, Staging, Production'
    ],
    correct: 1,
    explanation: 'Mendix hat drei Sicherheitsstufen: Off (keine Sicherheit, nur lokal), Prototype/Demo (nur Anmeldung, keine detaillierten Berechtigungen), Production (vollständige Sicherheit mit allen Access Rules).'
},
{
    id: 'int-sec-006',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was steuert "Page Access" in der Modul-Sicherheit?',
    options: [
        'Welche Seiten im Browser gecacht werden dürfen',
        'Welche Module Roles eine bestimmte Seite öffnen dürfen',
        'Die Ladegeschwindigkeit von Seiten',
        'Die Reihenfolge der Seiten in der Navigation'
    ],
    correct: 1,
    explanation: 'Page Access definiert welche Module Roles Zugriff auf welche Seiten haben. Wenn ein Benutzer versucht eine Seite aufzurufen für die er keine Berechtigung hat, wird der Zugriff verweigert.'
},
{
    id: 'int-sec-007',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Kann man den Zugriff auf einzelne Microflows einschränken?',
    options: [
        'Nein, Microflows sind immer für alle Rollen zugänglich',
        'Ja, über Microflow Access in der Modul-Sicherheit',
        'Nur indirekt über Page Access',
        'Nur wenn der Microflow als REST-Service publiziert ist'
    ],
    correct: 1,
    explanation: 'Ja, Microflow Access wird in der Modul-Sicherheit konfiguriert. Man definiert welche Module Roles welche Microflows ausführen dürfen. Dies ist besonders wichtig für Microflows die als Button-Actions oder in der Navigation verwendet werden.'
},
{
    id: 'int-sec-008',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Was ist der Vorteil von modularer Sicherheit (separate Module für verschiedene Bereiche)?',
    options: [
        'Schnellere Ladezeiten',
        'Feinere Zugriffskontrolle durch separate Module Roles pro Funktionsbereich',
        'Bessere Performance der Datenbank',
        'Automatische Verschlüsselung'
    ],
    correct: 1,
    explanation: 'Modulare Sicherheit ermöglicht feinere Zugriffskontrolle. Jedes Modul hat eigene Module Roles, die unabhängig zugewiesen werden können. So kann man z.B. HR-Modul-Zugriff von Finanz-Modul-Zugriff trennen.'
},

// ============ INTEGRATION ============
{
    id: 'int-int-001',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist ein Import Mapping in Mendix?',
    options: [
        'Ein Tool zum Importieren von Datenbank-Backups',
        'Eine Definition wie eingehende JSON/XML-Daten auf Mendix-Entitäten abgebildet werden',
        'Ein Modul das CSV-Dateien importiert',
        'Eine Konfiguration für Datenbank-Migration'
    ],
    correct: 1,
    explanation: 'Ein Import Mapping definiert wie eingehende Daten (JSON oder XML) auf Mendix-Entitäten und deren Attribute abgebildet werden. Es wird z.B. beim Empfangen von REST-API-Responses verwendet.'
},
{
    id: 'int-int-002',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Welche Aktivität ruft einen externen REST-Service in einem Microflow auf?',
    options: [
        'REST Request',
        'HTTP Call',
        'Call REST Service',
        'Send REST'
    ],
    correct: 2,
    explanation: 'Die "Call REST Service" Aktivität ruft einen externen REST-Endpunkt auf. Man konfiguriert URL, HTTP-Methode, Headers, Request Body und den Response-Handling (z.B. mit Import Mapping).'
},
{
    id: 'int-int-003',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist der Mendix Data Hub?',
    options: [
        'Eine Datenbank-Verwaltungsoberfläche',
        'Ein Katalog zum Entdecken und Nutzen von Daten anderer Mendix-Apps via OData',
        'Ein ETL-Tool für Datenmigrationen',
        'Ein Cloud-Speicher für Dateien'
    ],
    correct: 1,
    explanation: 'Der Data Hub ist ein Katalog der publizierte Datenquellen (OData Services) listet. Entwickler können External Entities aus dem Data Hub in ihre App einbinden und so Daten anderer Apps nutzen.'
},
{
    id: 'int-int-004',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist eine External Entity in Mendix?',
    options: [
        'Eine Entität die in einem externen Modul definiert ist',
        'Eine Entität die über den Data Hub von einer anderen App gelesen wird (OData)',
        'Eine Entität die in einer externen Datenbank liegt',
        'Eine Entität die nur über REST zuganglich ist'
    ],
    correct: 1,
    explanation: 'External Entities repräsentieren Daten die über OData von einer anderen Mendix-App oder einem externen Service bereitgestellt werden. Sie erscheinen im Domain Model, aber die Daten werden nicht lokal gespeichert.'
},
{
    id: 'int-int-005',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist der Unterschied zwischen Import Mapping und Export Mapping?',
    options: [
        'Import ist schneller als Export',
        'Import wandelt externe Daten in Mendix-Objekte um, Export wandelt Mendix-Objekte in externe Formate um',
        'Import ist für JSON, Export für XML',
        'Import ist für Lesen, Export für Löschen'
    ],
    correct: 1,
    explanation: 'Import Mapping wandelt eingehende Daten (JSON/XML) in Mendix-Objekte um (z.B. API-Response parsen). Export Mapping wandelt Mendix-Objekte in externe Formate (JSON/XML) um (z.B. für API-Requests oder publizierte Services).'
},
{
    id: 'int-int-006',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wie sichert man einen publizierten REST-Service in Mendix ab?',
    options: [
        'Durch eine Firewall vor dem Server',
        'Durch Module Role Zuweisungen die festlegen welche Rollen den Service aufrufen dürfen',
        'REST-Services können in Mendix nicht abgesichert werden',
        'Nur durch Basic Authentication'
    ],
    correct: 1,
    explanation: 'Publizierte REST-Services werden über Module Roles abgesichert. Man definiert welche Rollen Zugriff auf den Service haben. Zusätzlich kann man Authentication-Methoden konfigurieren (Basic, Custom, etc.).'
},
{
    id: 'int-int-007',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist eine JSON Structure in Mendix?',
    options: [
        'Ein Datenbank-Schema im JSON-Format',
        'Eine Definition der erwarteten JSON-Struktur die als Basis für Import/Export Mappings dient',
        'Ein JSON-Editor im Studio Pro',
        'Eine Konfigurationsdatei für die App'
    ],
    correct: 1,
    explanation: 'Eine JSON Structure definiert das erwartete Format von JSON-Daten. Sie wird aus einem JSON-Beispiel erstellt und dient als Grundlage für Import und Export Mappings.'
},
{
    id: 'int-int-008',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was bedeutet eine graue gestrichelte Linie im Data Hub Landscape?',
    options: [
        'Eine inaktive Verbindung',
        'Die App KONSUMIERT Daten von einer anderen App',
        'Die App STELLT Daten bereit',
        'Eine fehlerhafte Verbindung'
    ],
    correct: 1,
    explanation: 'Im Data Hub Landscape zeigt eine graue gestrichelte Linie an, dass die App Daten KONSUMIERT (External Entity nutzt). Eine graue durchgezogene Linie zeigt, dass die App Daten BEREITSTELLT (OData publiziert).'
},
{
    id: 'int-int-009',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wann sollte man die Versionsnummer eines publizierten OData-Service erhöhen?',
    options: [
        'Bei jeder Änderung an der App',
        'Wenn man Breaking Changes am Service macht (Entitäten/Attribute entfernen oder umbenennen)',
        'Nur einmal pro Jahr',
        'Nie, die Version wird automatisch verwaltet'
    ],
    correct: 1,
    explanation: 'Die Versionsnummer sollte bei Breaking Changes erhöht werden (Entfernen/Umbenennen von Entitäten oder Attributen). So können Konsumenten weiterhin die alte Version nutzen bis sie migriert haben.'
},
{
    id: 'int-int-010',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wo kann man Marketplace-Module herunterladen und in sein Projekt einbinden?',
    options: [
        'Nur über die Mendix-Website',
        'Direkt in Studio Pro über den Marketplace-Button',
        'Nur per manuellen Download und Import',
        'Marketplace-Module sind nur für Enterprise-Kunden verfügbar'
    ],
    correct: 1,
    explanation: 'Marketplace-Module können direkt in Studio Pro über den integrierten Marketplace heruntergeladen und eingebunden werden. Man kann auch die Website nutzen, aber die Studio-Pro-Integration ist der einfachste Weg.'
},

// ============ ADDITIONAL TOPICS ============
{
    id: 'int-val-001',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist eine Validation Rule auf einer Entität und wann wird sie ausgeführt?',
    options: [
        'Eine Regel die nur bei Import ausgeführt wird',
        'Eine Regel auf einem Attribut die automatisch beim Commit des Objekts geprüft wird (z.B. Required, Unique, Max Length)',
        'Eine Regel die nur bei REST-Aufrufen gilt',
        'Eine Regel die nur im Client geprüft wird'
    ],
    correct: 1,
    explanation: 'Validation Rules werden auf Attributen einer Entität definiert und automatisch beim Commit geprüft. Typen: Required (Pflichtfeld), Unique (eindeutig), Range (Wertebereich), Regular Expression, Maximum Length.'
},
{
    id: 'int-nav-001',
    category: 'pages',
    categoryLabel: 'Page Building',
    question: 'Was sind Navigation Profiles in Mendix?',
    options: [
        'Benutzerprofile mit Profilbild',
        'Separate Navigationsstrukturen für verschiedene Gerätetypen (Responsive, Tablet, Phone, Native)',
        'CSS-Profile für verschiedene Themes',
        'Profile für verschiedene Deployment-Umgebungen'
    ],
    correct: 1,
    explanation: 'Navigation Profiles definieren separate Menüstrukturen für verschiedene Gerätetypen. Jedes Profil hat eigene Homepages, Menüs und Role-basierte Navigation. Responsive Web ist das Standard-Profil.'
},
{
    id: 'int-enum-001',
    category: 'domain',
    categoryLabel: 'Domain Model',
    question: 'Was ist eine Enumeration in Mendix und wann verwendet man sie?',
    options: [
        'Ein automatisch hochzählender Zähler',
        'Eine vordefinierte Liste von Werten die ein Attribut annehmen kann (z.B. Status: Open/InProgress/Closed)',
        'Eine Schleife die über alle Objekte iteriert',
        'Eine Methode zur Nummerierung von Datensätzen'
    ],
    correct: 1,
    explanation: 'Eine Enumeration definiert eine feste Menge erlaubter Werte für ein Attribut. Beispiel: OrderStatus mit Werten New, Processing, Shipped, Delivered. Jeder Wert hat einen technischen Namen und ein benutzerfreundliches Caption.'
},
{
    id: 'int-expr-001',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was sind Tokens in Mendix-Expressions wie [%CurrentDateTime%]?',
    options: [
        'Variablen die in Java definiert werden',
        'Vordefinierte Platzhalter die zur Laufzeit durch aktuelle Werte ersetzt werden (z.B. aktueller Benutzer, aktuelle Zeit)',
        'CSS-Klassen für Widgets',
        'Konstanten die im Modell definiert werden'
    ],
    correct: 1,
    explanation: 'Tokens sind vordefinierte Platzhalter: [%CurrentDateTime%] (aktuelles Datum/Uhrzeit), [%CurrentUser%] (eingeloggter Benutzer), [%BeginOfCurrentDay%], [%EndOfCurrentMonth%] etc. Sie werden häufig in XPath-Constraints und Expressions verwendet.'
},
{
    id: 'int-debug-001',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Wie kann man einen Microflow in Studio Pro debuggen?',
    options: [
        'Nur durch Log-Messages',
        'Breakpoints setzen, den Debugger starten, und den Microflow Schritt für Schritt durchlaufen',
        'Debugging ist nur in der Cloud möglich',
        'Nur Java-Aktionen können debuggt werden'
    ],
    correct: 1,
    explanation: 'Studio Pro hat einen integrierten Debugger: Breakpoints auf Microflow-Aktivitäten setzen, dann die App im Debug-Modus starten. Man kann Variablen inspizieren, Schritt für Schritt durchlaufen (Step Over/Into) und den Datenfluss verfolgen.'
},
{
    id: 'int-access-001',
    category: 'security',
    categoryLabel: 'Security',
    question: 'Ein Benutzer sieht in einem List View nicht alle Datensätze obwohl er die Seite öffnen kann. Was ist die wahrscheinlichste Ursache?',
    options: [
        'Der List View hat einen Bug',
        'Entity Access Rules mit XPath-Constraints schränken die sichtbaren Daten für seine Rolle ein',
        'Die Datenbank ist zu langsam',
        'Der Browser cached alte Daten'
    ],
    correct: 1,
    explanation: 'Entity Access Rules können XPath-Constraints enthalten die bestimmen WELCHE Objekte eine Rolle sehen darf. Z.B. [Module.Order_Owner = \'[%CurrentUser%]\'] zeigt nur eigene Bestellungen. Page Access erlaubt die Seite, Entity Access filtert die Daten.'
},

// ============ AGILE & SCRUM ============
{
    id: 'int-agile-001',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Welche Rolle ist im Scrum-Framework für die Priorisierung des Product Backlogs verantwortlich?',
    options: [
        'Der Scrum Master',
        'Der Product Owner',
        'Das Development Team',
        'Der Projektmanager'
    ],
    correct: 1,
    explanation: 'Der Product Owner ist verantwortlich für die Verwaltung und Priorisierung des Product Backlogs. Er entscheidet welche User Stories die höchste Geschäftspriorität haben und als nächstes umgesetzt werden sollen.'
},
{
    id: 'int-agile-002',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Was ist KEINE der offiziellen Scrum-Zeremonien?',
    options: [
        'Sprint Planning',
        'Daily Standup',
        'Sprint Estimation Meeting',
        'Sprint Retrospective'
    ],
    correct: 2,
    explanation: 'Die offiziellen Scrum-Events sind: Sprint Planning, Daily Scrum (Standup), Sprint Review und Sprint Retrospective. Ein "Sprint Estimation Meeting" ist kein offizielles Scrum-Event - Schätzungen können Teil des Sprint Plannings sein.'
},
{
    id: 'int-agile-003',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Wie formuliert man eine User Story korrekt?',
    options: [
        'Implementiere Feature X mit Technologie Y',
        'Als [Rolle] möchte ich [Funktion], damit [Geschäftswert]',
        'Bug: Feature X funktioniert nicht wie erwartet',
        'Anforderung 4.2.1: System muss X unterstützen'
    ],
    correct: 1,
    explanation: 'Das Standard-User-Story-Format ist: "Als [Rolle] möchte ich [Funktion], damit [Geschäftswert]". Dieses Format stellt sicher dass die Anforderung aus Benutzerperspektive beschrieben wird und den Geschäftswert benennt.'
},
{
    id: 'int-agile-004',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Was ist die Aufgabe des Scrum Masters?',
    options: [
        'Er weist den Entwicklern ihre Aufgaben zu',
        'Er entscheidet über die technische Architektur',
        'Er beseitigt Hindernisse und sorgt dafür dass das Team den Scrum-Prozess einhalten kann',
        'Er priorisiert die User Stories im Backlog'
    ],
    correct: 2,
    explanation: 'Der Scrum Master ist ein Servant Leader. Er beseitigt Hindernisse (Impediments), schützt das Team vor Störungen und stellt sicher dass der Scrum-Prozess korrekt gelebt wird. Er weist KEINE Aufgaben zu - das Team organisiert sich selbst.'
},
{
    id: 'int-agile-005',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Wo verwaltet man User Stories und Sprints in einem Mendix-Projekt?',
    options: [
        'Nur in externen Tools wie Jira',
        'Im Mendix Developer Portal unter "Stories"',
        'In Studio Pro unter dem Menü "Project"',
        'In einer separaten Excel-Datei'
    ],
    correct: 1,
    explanation: 'Das Mendix Developer Portal bietet eine integrierte "Stories"-Sektion für Backlog-Management. Dort können User Stories erstellt, Sprints geplant und der Fortschritt verfolgt werden. Eine Integration mit externen Tools wie Jira ist ebenfalls möglich.'
},
{
    id: 'int-agile-006',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Was sind Story Points?',
    options: [
        'Die genaue Anzahl an Stunden die eine Story benötigt',
        'Eine relative Schätzung der Komplexität und des Aufwands einer User Story',
        'Die Anzahl der benötigten Entwickler',
        'Punkte die ein Entwickler für abgeschlossene Stories erhält'
    ],
    correct: 1,
    explanation: 'Story Points sind ein relatives Maß für die Komplexität und den Aufwand einer User Story. Sie werden NICHT in Stunden gemessen, sondern im Vergleich zu anderen Stories geschätzt (z.B. mit Fibonacci-Zahlen: 1, 2, 3, 5, 8, 13).'
},
{
    id: 'int-agile-007',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Was ist das Feedback-Widget in Mendix?',
    options: [
        'Ein Widget das automatisch Performance-Metriken sammelt',
        'Ein Widget das Benutzern ermöglicht Screenshots und Kommentare als Feedback direkt aus der App zu senden',
        'Ein Widget das Fehlermeldungen in der App anzeigt',
        'Ein internes Entwickler-Chat-Widget'
    ],
    correct: 1,
    explanation: 'Das Mendix Feedback Widget erlaubt Endbenutzern direkt aus der laufenden App heraus Screenshots und Kommentare als Feedback zu senden. Dieses Feedback erscheint im Developer Portal und kann in User Stories umgewandelt werden.'
},
{
    id: 'int-agile-008',
    category: 'agile',
    categoryLabel: 'Agile & Scrum',
    question: 'Was ist ein Epic in der agilen Entwicklung?',
    options: [
        'Ein Bug mit hoher Priorität',
        'Eine große User Story die in mehrere kleinere Stories aufgeteilt werden muss',
        'Ein Sprint der länger als 4 Wochen dauert',
        'Eine technische Schuld die abgebaut werden muss'
    ],
    correct: 1,
    explanation: 'Ein Epic ist eine große User Story die zu komplex ist um in einem einzigen Sprint umgesetzt zu werden. Epics werden in mehrere kleinere, handhabbare User Stories aufgeteilt die unabhängig voneinander in einzelnen Sprints implementiert werden können.'
},

// ============ WORKFLOWS ============
{
    id: 'int-wf-001',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was ist ein Workflow in Mendix?',
    options: [
        'Ein Microflow der automatisch jeden Tag ausgeführt wird',
        'Ein visuell modellierter Geschäftsprozess der menschliche Aufgaben, Entscheidungen und Automatisierung kombiniert',
        'Ein automatisiertes Deployment-Script',
        'Ein Nanoflow der auf dem Client läuft'
    ],
    correct: 1,
    explanation: 'Mendix Workflows sind visuell modellierte Geschäftsprozesse. Sie kombinieren menschliche Aufgaben (User Tasks), automatische Aktionen (Microflows), Entscheidungen und parallele Pfade. Im Gegensatz zu Microflows sind Workflows langlebig und können Tage oder Wochen dauern.'
},
{
    id: 'int-wf-002',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was ist der Unterschied zwischen einem User Task und einem Call Microflow Element in einem Workflow?',
    options: [
        'Ein User Task wird von einem Benutzer manuell bearbeitet, ein Call Microflow wird automatisch ausgeführt',
        'Es gibt keinen Unterschied',
        'Ein User Task läuft auf dem Client, ein Call Microflow auf dem Server',
        'Ein User Task ist optional, ein Call Microflow ist verpflichtend'
    ],
    correct: 0,
    explanation: 'Ein User Task erfordert eine menschliche Aktion — ein Benutzer muss eine Aufgabe auf einer Task-Seite bearbeiten und abschließen. Ein Call Microflow Element wird automatisch vom Workflow-Engine ausgeführt und benötigt keine menschliche Interaktion.'
},
{
    id: 'int-wf-003',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was ist eine Workflow Context Entity?',
    options: [
        'Eine spezielle System-Entität die automatisch erstellt wird',
        'Die Entität die als Datenobjekt den gesamten Workflow begleitet und relevante Informationen für den Prozess enthält',
        'Eine Entity die nur für Logging-Zwecke existiert',
        'Eine temporäre Entity die nach Workflow-Ende gelöscht wird'
    ],
    correct: 1,
    explanation: 'Die Workflow Context Entity ist eine persistente Entität die beim Erstellen eines Workflows definiert wird. Sie enthält alle Daten die während des gesamten Workflow-Lebenszyklus benötigt werden, z.B. einen Urlaubsantrag mit Datum und Begründung.'
},
{
    id: 'int-wf-004',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Wie startet man einen Workflow aus einem Microflow heraus?',
    options: [
        'Mit der "Call Workflow" Aktivität',
        'Workflows starten sich automatisch',
        'Über einen REST-API-Call',
        'Durch Rechtsklick auf den Workflow in Studio Pro'
    ],
    correct: 0,
    explanation: 'Die "Call Workflow" Aktivität in einem Microflow startet eine neue Workflow-Instanz. Man übergibt dabei das Workflow Context Objekt als Parameter. Der Microflow kann z.B. durch einen Button-Klick auf einer Seite ausgelöst werden.'
},
{
    id: 'int-wf-005',
    category: 'workflows',
    categoryLabel: 'Workflows',
    question: 'Was passiert wenn ein User Task in einem Workflow erreicht wird?',
    options: [
        'Der Workflow wird sofort abgebrochen',
        'Der Workflow pausiert bis ein berechtigter Benutzer die Aufgabe auf der zugehörigen Task-Seite abschließt',
        'Der Task wird automatisch nach 24 Stunden übersprungen',
        'Alle Benutzer werden per E-Mail benachrichtigt'
    ],
    correct: 1,
    explanation: 'Bei einem User Task pausiert der Workflow und wartet auf menschliche Interaktion. Die Aufgabe erscheint im Task-Inbox des zugewiesenen Benutzers oder der zugewiesenen Rolle. Der Benutzer öffnet die Task-Seite, bearbeitet die Aufgabe und wählt ein Outcome.'
},

// ============ NANOFLOWS (Ergänzung zu Microflows) ============
{
    id: 'int-mf-011',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was kann ein Nanoflow NICHT tun?',
    options: [
        'Objekteigenschaften ändern',
        'Java Actions ausführen',
        'Benutzereingaben validieren',
        'Lokale Variablen erstellen'
    ],
    correct: 1,
    explanation: 'Nanoflows können keine Java Actions ausführen, da diese serverseitige JVM-Funktionalität erfordern. Seit Mendix 9.12+ können Nanoflows jedoch Retrieve from Database durchführen (mit Server-Roundtrip). Für Java Actions, Import/Export Mappings und Scheduled Events muss man Microflows verwenden.'
},
{
    id: 'int-mf-012',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Wann sollte man einen Nanoflow statt eines Microflows verwenden?',
    options: [
        'Für komplexe Datenbankoperationen',
        'Für schnelle Client-seitige Logik wie Validierung oder UI-Updates ohne Server-Roundtrip',
        'Für Scheduled Events',
        'Für Java Actions'
    ],
    correct: 1,
    explanation: 'Nanoflows eignen sich für schnelle UI-Logik die keinen Server-Roundtrip benötigt: Validierung, bedingte Sichtbarkeit, lokale Berechnungen. Sie reagieren sofort ohne Netzwerk-Latenz. Seit Mendix 9.12+ können Nanoflows auch Retrieve from Database ausführen. Für Java Actions oder Scheduled Events muss man Microflows verwenden.'
},
{
    id: 'int-mf-013',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Wo wird ein Nanoflow ausgeführt?',
    options: [
        'Auf dem Mendix-Server (Runtime)',
        'Im Browser des Benutzers (Client)',
        'In der Datenbank',
        'In einem separaten Microservice'
    ],
    correct: 1,
    explanation: 'Nanoflows werden vollständig im Browser des Benutzers (Client-seitig) ausgeführt. Dadurch sind sie sehr schnell, haben aber eingeschränkten Zugriff auf Server-Ressourcen wie Datenbank, Dateisystem oder Java Actions.'
},
{
    id: 'int-mf-014',
    category: 'microflows',
    categoryLabel: 'Microflows',
    question: 'Was passiert wenn ein Nanoflow in einer Offline-App keinen Netzwerkzugang hat?',
    options: [
        'Der Nanoflow wird nicht ausgeführt',
        'Er kann weiterhin mit lokalen Daten arbeiten und Objekte ändern, aber keine Server-Calls machen',
        'Die App stürzt ab',
        'Alle Änderungen werden automatisch verworfen'
    ],
    correct: 1,
    explanation: 'Nanoflows funktionieren auch offline, da sie auf dem Client laufen. Sie können lokale Objekte lesen und ändern. Server-abhängige Aktionen wie "Call Microflow" oder "Call REST Service" sind offline jedoch nicht verfügbar.'
},

// ============ PAGES & UI (Ergänzung) ============
{
    id: 'int-pages-009',
    category: 'pages',
    categoryLabel: 'Pages & UI',
    question: 'Was steuert die Eigenschaft "Conditional Visibility" eines Widgets?',
    options: [
        'Ob das Widget auf verschiedenen Bildschirmgrößen angezeigt wird',
        'Ob das Widget basierend auf einem Attributwert, einer Expression oder einer Benutzerrolle ein- oder ausgeblendet wird',
        'Die Ladegeschwindigkeit des Widgets',
        'Die Farbe des Widgets'
    ],
    correct: 1,
    explanation: 'Conditional Visibility steuert ob ein Widget angezeigt wird. Man kann Bedingungen basierend auf Benutzerrollen (nur Admin sieht den Delete-Button), Attributwerten (Status == "Approved") oder Expressions definieren. Das Widget wird im DOM nicht gerendert wenn die Bedingung nicht erfüllt ist.'
},
{
    id: 'int-pages-010',
    category: 'pages',
    categoryLabel: 'Pages & UI',
    question: 'Welche Data Source Typen gibt es für ein List View Widget?',
    options: [
        'Nur Database',
        'Database, Microflow, Association und Nanoflow',
        'Nur Microflow und Association',
        'Database und REST API'
    ],
    correct: 1,
    explanation: 'List Views unterstützen vier Data Source Typen: Database (direkte Datenbankabfrage mit optionalem XPath), Microflow (Daten aus einem Microflow), Association (über eine Assoziation des Kontextobjekts), und Nanoflow (Client-seitige Datenquelle).'
},
{
    id: 'int-pages-011',
    category: 'pages',
    categoryLabel: 'Pages & UI',
    question: 'Was ist der Unterschied zwischen einer Popup-Seite und einer Content-Seite?',
    options: [
        'Es gibt keinen Unterschied',
        'Eine Popup-Seite öffnet sich als modaler Dialog über der aktuellen Seite, eine Content-Seite ersetzt den gesamten Inhalt',
        'Popup-Seiten laden schneller',
        'Content-Seiten können keine Formulare enthalten'
    ],
    correct: 1,
    explanation: 'Popup-Seiten (Popup Layout) öffnen sich als modaler Dialog - die Hauptseite bleibt im Hintergrund sichtbar. Content-Seiten (Content Layout) ersetzen den gesamten Seiteninhalt. Popups eignen sich für kurze Interaktionen wie Bestätigungsdialoge oder Bearbeitungsformulare.'
},
{
    id: 'int-pages-012',
    category: 'pages',
    categoryLabel: 'Pages & UI',
    question: 'Was bedeutet die Editability-Einstellung "Conditional" auf einem Input-Widget?',
    options: [
        'Das Widget ist immer editierbar',
        'Das Widget ist nie editierbar',
        'Das Widget ist basierend auf einer Bedingung (Attribut oder Expression) entweder editierbar oder read-only',
        'Das Widget wechselt automatisch zwischen editierbar und read-only'
    ],
    correct: 2,
    explanation: 'Die Editability "Conditional" erlaubt es die Bearbeitbarkeit eines Feldes dynamisch zu steuern. Z.B. kann ein Status-Feld nur bearbeitbar sein wenn Status == "Draft". Weitere Optionen sind "Always" (immer editierbar), "Never" (read-only) und "Read-only style" (Darstellung als Text).'
},

// ============ COLLABORATION (Ergänzung) ============
{
    id: 'int-collab-006',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Was ist MxAssist Logic Bot?',
    options: [
        'Ein Chatbot für Endbenutzer der App',
        'Ein KI-Assistent der beim Modellieren von Microflows Vorschläge für nächste Aktivitäten macht',
        'Ein automatisiertes Test-Tool',
        'Ein Deployment-Assistent'
    ],
    correct: 1,
    explanation: 'MxAssist Logic Bot ist ein KI-gestützter Assistent in Studio Pro der beim Erstellen von Microflows kontextbezogene Vorschläge für die nächste Aktivität macht. Er analysiert den bisherigen Microflow und schlägt passende Aktionen vor, was die Entwicklung beschleunigt.'
},
{
    id: 'int-collab-007',
    category: 'collaboration',
    categoryLabel: 'Collaboration',
    question: 'Was ist der Best Practice Recommender (ehemals MxAssist Performance Bot) in Mendix?',
    options: [
        'Er optimiert automatisch die Datenbank',
        'Er analysiert das App-Modell gegen Mendix Best Practices und gibt Verbesserungsvorschläge direkt in Studio Pro',
        'Er misst die Ladezeit der App im Browser',
        'Er skaliert die App automatisch in der Cloud'
    ],
    correct: 1,
    explanation: 'Der Best Practice Recommender (seit Mendix 10.12 umbenannt von MxAssist Performance Bot, Teil von Maia) analysiert das App-Modell in Studio Pro. Er prüft gegen Mendix Best Practices und erkennt z.B. fehlende Indizes, zu komplexe Microflows, N+1-Query-Probleme oder fehlende Sicherheitskonfigurationen. Ergebnisse werden mit Severity-Level angezeigt.'
},

// ============ INTEGRATION (Ergänzung) ============
{
    id: 'int-int-011',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Wann sollte man OData statt REST für die Integration zwischen Mendix-Apps verwenden?',
    options: [
        'OData ist immer besser als REST',
        'Wenn man External Entities im Domain Model verwenden möchte, da OData nahtlos in Mendix integriert ist',
        'Nur wenn die andere App kein REST unterstützt',
        'OData und REST sind in Mendix identisch'
    ],
    correct: 1,
    explanation: 'OData ist für Mendix-zu-Mendix Integration ideal weil publizierte OData-Services als External Entities direkt im Domain Model erscheinen. Man kann sie wie normale Entitäten in Pages verwenden - ohne manuelles Mapping. REST erfordert dagegen eigene Mappings und Microflows.'
},
{
    id: 'int-int-012',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Was ist eine wichtige Einschränkung von External Entities?',
    options: [
        'Sie können nicht auf Seiten verwendet werden',
        'Jeder Datenzugriff erfordert einen Netzwerk-Call zum Quell-Service, und Schreiboperationen erfordern "Send External Object" statt Commit',
        'Sie funktionieren nur mit REST-Services',
        'Sie können maximal 10 Attribute haben'
    ],
    correct: 1,
    explanation: 'External Entities (aus OData/Data Hub) erfordern bei jedem Zugriff einen Netzwerk-Call. Schreiboperationen nutzen "Send External Object" statt normalem Commit. Sie KÖNNEN lokale Assoziationen haben (lokale Entity muss Owner sein) und unterstützen CRUD wenn der OData-Service dies bereitstellt.'
},
{
    id: 'int-int-013',
    category: 'integration',
    categoryLabel: 'Integration',
    question: 'Warum sollte man Marketplace-Module NICHT direkt modifizieren?',
    options: [
        'Marketplace-Module sind verschlüsselt und können nicht geändert werden',
        'Bei einem Update des Moduls werden alle eigenen Änderungen überschrieben',
        'Änderungen an Marketplace-Modulen sind illegal',
        'Marketplace-Module laufen in einer Sandbox und können nicht bearbeitet werden'
    ],
    correct: 1,
    explanation: 'Marketplace-Module sollten nicht direkt modifiziert werden, da Updates alle eigenen Änderungen überschreiben. Stattdessen sollte man die Funktionalität erweitern: z.B. eigene Microflows erstellen die die Marketplace-Microflows aufrufen, oder Spezialisierungen der Marketplace-Entitäten anlegen.'
},

// ============ MICROFLOWS & NANOFLOWS (Neue Fragen) ============
{
    id: 'new-micro-001', category: 'microflows', categoryLabel: 'Microflows & Nanoflows',
    question: 'Was ist der grundlegende Unterschied zwischen einem Microflow und einem Nanoflow in Mendix?',
    options: ['Microflows laufen auf dem Server, Nanoflows laufen auf dem Client (Browser/Device)', 'Microflows laufen auf dem Client, Nanoflows auf dem Server', 'Microflows koennen nur in Web-Apps verwendet werden, Nanoflows nur in Mobile Apps', 'Es gibt keinen funktionalen Unterschied, nur die Benennung ist anders'],
    correct: 0, explanation: 'Microflows werden serverseitig in der Mendix Runtime ausgefuehrt und eignen sich fuer Datenbank-Operationen, Integrationen und komplexe Geschaeftslogik. Nanoflows laufen clientseitig im Browser oder auf dem Geraet und sind damit auch offline-faehig.'
},
{
    id: 'new-micro-002', category: 'microflows', categoryLabel: 'Microflows & Nanoflows',
    question: 'Wann sollte ein Nanoflow statt eines Microflows verwendet werden?',
    options: ['Wenn komplexe Datenbank-Abfragen durchgefuehrt werden muessen', 'Wenn externe REST-Services aufgerufen werden sollen', 'Wenn die App offline funktionieren muss oder einfache UI-Interaktionen wie das Togglen von Sichtbarkeit durchgefuehrt werden', 'Wenn Before/After Commit Event Handler ausgeloest werden sollen'],
    correct: 2, explanation: 'Nanoflows sind ideal fuer Offline-First-Apps, einfache clientseitige Aktionen und Situationen, in denen wenig Daten abgerufen werden.'
},
{
    id: 'new-micro-003', category: 'microflows', categoryLabel: 'Error Handling',
    question: 'Welche Error-Handling-Optionen stehen in Mendix Microflows zur Verfuegung?',
    options: ['Nur Rollback und Continue', 'Rollback (Standard), Custom with Rollback, Custom without Rollback und Continue', 'Try-Catch, Finally und Throw', 'Error Event, Warning Event und Info Event'],
    correct: 1, explanation: 'Mendix bietet vier Error-Handling-Optionen: Rollback (Standard), Custom with Rollback, Custom without Rollback und Continue.'
},
{
    id: 'new-micro-004', category: 'microflows', categoryLabel: 'Error Handling',
    question: 'Was ist der Unterschied zwischen "Custom with Rollback" und "Custom without Rollback" beim Error Handling?',
    options: ['Custom with Rollback zeigt dem User eine Fehlermeldung', 'Es gibt keinen Unterschied', 'Custom with Rollback loggt den Fehler, Custom without Rollback ignoriert ihn', 'Custom with Rollback macht alle Aenderungen rueckgaengig; Custom without Rollback nur die im fehlerhaften Sub-Microflow'],
    correct: 3, explanation: 'Bei Custom with Rollback werden alle Aenderungen der gesamten Transaktion zurueckgerollt. Bei Custom without Rollback nur die Aenderungen im Sub-Microflow.'
},
{
    id: 'new-micro-005', category: 'microflows', categoryLabel: 'Commit & Events',
    question: 'Was passiert mit Before/After Commit Event Handlern bei autocommitted Objects?',
    options: ['Before und After Events werden NICHT ausgefuehrt bei autocommitted Objects', 'Alle Event Handler werden normal ausgefuehrt', 'Nur Before Commit wird ausgefuehrt', 'Nur After Commit wird ausgefuehrt'],
    correct: 0, explanation: 'Bei einem Autocommit werden KEINE Before/After Event Handler ausgefuehrt. Nur bei expliziten Commits werden alle Events getriggert.'
},
{
    id: 'new-micro-006', category: 'microflows', categoryLabel: 'Commit & Events',
    question: 'Was bewirkt die Eigenschaft "With Events" = No bei der Commit-Aktivitaet?',
    options: ['Es wird kein Audit Trail erstellt', 'Das Objekt wird nicht in die Datenbank geschrieben', 'Die Before/After Commit Event Handler werden uebersprungen', 'Der Commit wird asynchron ausgefuehrt'],
    correct: 2, explanation: 'Wenn With Events auf No gesetzt ist, werden die Commit Event Handler nicht ausgefuehrt und die meisten Validierungsregeln nicht getriggert.'
},
{
    id: 'new-micro-007', category: 'microflows', categoryLabel: 'Scheduled Events',
    question: 'Wie kann ein Microflow automatisch zu einem bestimmten Zeitpunkt wiederholt ausgefuehrt werden?',
    options: ['Durch einen Timer-Widget auf einer Page', 'Durch Erstellen und Aktivieren eines Scheduled Events', 'Durch einen speziellen Loop im Microflow', 'Durch einen After Startup Microflow mit Sleep-Funktion'],
    correct: 1, explanation: 'Scheduled Events ermoeglichen es, einen Microflow wiederholt in bestimmten Intervallen auszufuehren.'
},
{
    id: 'new-micro-008', category: 'microflows', categoryLabel: 'List Operations',
    question: 'Welche List-Operation gibt eine Liste zurueck, die Elemente enthaelt, die in BEIDEN Listen vorkommen?',
    options: ['Union', 'Filter', 'Subtract', 'Intersect'],
    correct: 3, explanation: 'Intersect gibt eine Liste zurueck mit Elementen die in beiden Eingabelisten vorhanden sind.'
},
{
    id: 'new-micro-009', category: 'microflows', categoryLabel: 'List Operations',
    question: 'Was ist der Unterschied zwischen der "List Operation" Aktivitaet und der "Change List" Aktivitaet?',
    options: ['List Operation gibt eine NEUE Liste zurueck, Change List veraendert die bestehende Liste', 'Es gibt keinen Unterschied', 'Change List kann nur einzelne Objekte hinzufuegen', 'List Operation funktioniert nur in Microflows'],
    correct: 0, explanation: 'List Operation gibt das Ergebnis als NEUE Liste zurueck. Change List veraendert die bestehende Liste direkt.'
},
{
    id: 'new-micro-010', category: 'microflows', categoryLabel: 'Splits & Decisions',
    question: 'Was ist ein Object Type Decision (Inheritance Split) in einem Microflow?',
    options: ['Eine Entscheidung basierend auf einem Boolean-Ausdruck', 'Eine Entscheidung basierend auf der Anzahl der Objekte in einer Liste', 'Eine Entscheidung basierend auf dem Typ eines Objekts einer generalisierten Entitaet', 'Eine Entscheidung basierend auf dem Erstellungsdatum eines Objekts'],
    correct: 2, explanation: 'Ein Object Type Decision verzweigt den Microflow basierend auf dem tatsaechlichen Typ eines Objekts einer generalisierten Entitaet.'
},
{
    id: 'new-micro-011', category: 'microflows', categoryLabel: 'Loops',
    question: 'Wie kann ein Loop in einem Microflow vorzeitig beendet werden?',
    options: ['Durch ein End Event innerhalb des Loops', 'Durch ein Break Event', 'Durch ein Error Event', 'Durch ein Continue Event'],
    correct: 1, explanation: 'Ein Break Event beendet den Loop vorzeitig. Ein Continue Event ueberspringt die aktuelle Iteration.'
},
{
    id: 'new-micro-012', category: 'microflows', categoryLabel: 'Data Sources',
    question: 'Wann sollte ein Microflow als Datenquelle fuer ein Data Widget verwendet werden?',
    options: ['Nur bei Offline-Apps', 'Immer, da Microflows flexibler sind', 'Nur wenn mehr als 1000 Objekte angezeigt werden sollen', 'Wenn die Standardabfragen nicht ausreichen, z.B. bei sehr spezifischen Kriterien'],
    correct: 3, explanation: 'Wenn Database, XPath oder Association als Datenquelle nicht ausreichen, bietet ein Microflow unbegrenzte Kontrolle ueber die zurueckgegebenen Objekte.'
},
{
    id: 'new-micro-013', category: 'microflows', categoryLabel: 'Expressions',
    question: 'Wie wird in einem Microflow-Ausdruck auf ein Attribut eines Objekts zugegriffen?',
    options: ['$Customer/Name', '$Customer.Name', 'Customer->Name', '$Customer::Name'],
    correct: 0, explanation: 'Objekte werden mit $ referenziert, Attribute und Assoziationen mit / getrennt.'
},
{
    id: 'new-micro-014', category: 'microflows', categoryLabel: 'Rollback',
    question: 'Was passiert beim Rollback eines NEU erstellten (noch nicht committed) Objekts?',
    options: ['Das Objekt wird aus der Datenbank geloescht', 'Das Objekt wird auf seinen letzten committed Stand zurueckgesetzt', 'Das Objekt wird komplett entfernt, als haette es nie existiert', 'Rollback funktioniert nur bei bereits committeten Objekten'],
    correct: 2, explanation: 'Bei einem neuen, noch nicht committeten Objekt wird das Objekt komplett entfernt.'
},
{
    id: 'new-micro-015', category: 'microflows', categoryLabel: 'Integration',
    question: 'In welchem Kontext koennen Import/Export Mapping Aktivitaeten verwendet werden?',
    options: ['Nur in Nanoflows', 'Nur in Microflows', 'In Microflows und Nanoflows gleichermassen', 'Nur in Scheduled Events'],
    correct: 1, explanation: 'Import/Export Mapping Aktivitaeten koennen NUR in Microflows verwendet werden.'
},

// ============ SECURITY (Neue Fragen) ============
{
    id: 'new-sec-001', category: 'security', categoryLabel: 'Security',
    question: 'Welche Security Levels stehen in Mendix App Security zur Verfuegung?',
    options: ['Off, Development, Staging, Production', 'None, Basic, Advanced, Enterprise', 'Off, Prototype/Demo, Production', 'Disabled, Enabled, Strict'],
    correct: 2, explanation: 'Mendix bietet drei Security Levels: Off, Prototype/Demo und Production.'
},
{
    id: 'new-sec-002', category: 'security', categoryLabel: 'Security',
    question: 'Wie werden XPath-Constraints in Entity Access Rules technisch durchgesetzt?',
    options: ['Als zusaetzliche WHERE-Klauseln den Datenbankabfragen hinzugefuegt', 'Clientseitig im Browser als JavaScript-Filter', 'Nur bei der Anzeige in Widgets gefiltert', 'Als Post-Processing nach dem Datenbank-Retrieve'],
    correct: 0, explanation: 'XPath-Constraints werden direkt auf Datenbankebene durchgesetzt als zusaetzliche Bedingungen zu allen Retrieves.'
},
{
    id: 'new-sec-003', category: 'security', categoryLabel: 'Security',
    question: 'Was passiert wenn eine User Role Zugriff auf eine Page hat, aber NICHT auf ein Attribut das dort angezeigt wird?',
    options: ['Die Anwendung stuerzt ab', 'Das Attribut wird automatisch ausgeblendet', 'Die Page zeigt einen leeren Wert', 'Es entsteht ein Security Conflict (Konsistenzfehler)'],
    correct: 3, explanation: 'Mendix erkennt dies als Security Conflict der vor dem Deployment behoben werden muss.'
},
{
    id: 'new-sec-004', category: 'security', categoryLabel: 'Security',
    question: 'Welche Berechtigungen koennen in einer Entity Access Rule konfiguriert werden?',
    options: ['Nur Lesen und Schreiben', 'Erstellen, Loeschen, Lesen und Schreiben pro Attribut, optional mit XPath-Constraint', 'Nur CRUD ohne weitere Granularitaet', 'Nur Lesen mit XPath-Filter'],
    correct: 1, explanation: 'Entity Access Rules erlauben granulare Konfiguration: Create, Delete sowie Read und Write pro Attribut, plus optionale XPath-Constraints.'
},
{
    id: 'new-sec-005', category: 'security', categoryLabel: 'Security',
    question: 'Welche Konfigurationsoptionen gehoeren zur Password Policy in Mendix?',
    options: ['Minimale Laenge, maximale Laenge, Ablaufdatum, Historie', 'Nur die minimale Passwortlaenge', 'Minimale Laenge, Ziffer erforderlich, Gross-/Kleinschreibung, Sonderzeichen', 'Nur Weak/Medium/Strong Presets'],
    correct: 2, explanation: 'Die Password Policy bietet: Minimum length, Require digit, Require mixed case und Require symbol.'
},
{
    id: 'new-sec-006', category: 'security', categoryLabel: 'Security',
    question: 'Wie wird der Zugriff fuer Anonymous Users in Mendix konfiguriert?',
    options: ['Eine spezifische User Role fuer anonyme Benutzer die den Zugriff steuert', 'Automatischer Zugriff auf alle oeffentlichen Pages', 'Durch eine IP-Whitelist', 'Anonymer Zugriff ist nicht moeglich'],
    correct: 0, explanation: 'Fuer Anonymous Users wird eine spezifische User Role zugewiesen die ueber Module Roles den Zugriff definiert.'
},
{
    id: 'new-sec-007', category: 'security', categoryLabel: 'Security',
    question: 'Welche Bedrohungen werden durch den Mendix Runtime automatisch abgewehrt?',
    options: ['Nur XSS und CSRF', 'Mendix bietet keinen automatischen Schutz', 'Nur SQL Injection', 'SQL Injection, XSS, CSRF und Broken Authentication'],
    correct: 3, explanation: 'Der Mendix Runtime enthaelt eingebaute Sicherheitsmassnahmen gegen SQL Injection, XSS, CSRF und Broken Authentication.'
},
{
    id: 'new-sec-008', category: 'security', categoryLabel: 'Security',
    question: 'Welche Authentifizierungsmethoden stehen fuer Published REST Services zur Verfuegung?',
    options: ['Nur Basic Authentication', 'Basic Authentication, Active Session und Custom Authentication (per Microflow)', 'OAuth 2.0, API Key und SAML', 'Nur Custom Authentication per Java Action'],
    correct: 1, explanation: 'Published REST Services unterstuetzen Basic Authentication, Active Session und Custom Authentication ueber einen eigenen Microflow.'
},

// ============ INTEGRATION (Neue Fragen) ============
{
    id: 'new-int-001', category: 'integration', categoryLabel: 'Integration',
    question: 'Was ist eine External Entity in Mendix und wie wird sie erstellt?',
    options: ['Eine kopierte Entity aus einem anderen Modul', 'Eine Entity die nur ueber REST-Calls befuellt wird', 'Eine Entity ueber OData Services aus dem Data Hub Catalog', 'Eine Entity in einer externen Datenbank per SQL'],
    correct: 2, explanation: 'External Entities werden ueber das Integration Pane aus dem Data Hub Catalog zum Domain Model hinzugefuegt.'
},
{
    id: 'new-int-002', category: 'integration', categoryLabel: 'Integration',
    question: 'Was passiert wenn man ein External Entity Object mit einer normalen Commit-Aktivitaet speichern will?',
    options: ['Commit funktioniert nicht; stattdessen "Send External Object" verwenden', 'Normal in der lokalen Datenbank gespeichert', 'Automatisch an die Quell-Anwendung gesendet', 'Eine Kopie als lokale Entity erstellt'],
    correct: 0, explanation: 'External Objects koennen nicht normal committed werden. Fuer Schreiboperationen muss Send External Object verwendet werden.'
},
{
    id: 'new-int-003', category: 'integration', categoryLabel: 'Integration',
    question: 'Wie wird ein Consumed REST Service in einem Microflow aufgerufen?',
    options: ['Nur ueber Custom Java Actions', 'Ueber eine direkte Datenbankverbindung', 'Ueber Call Web Service mit WSDL', 'Ueber Call REST Service mit Import Mapping fuer JSON/XML'],
    correct: 3, explanation: 'Ein REST Service wird ueber Call REST Service aufgerufen, die Antwort per Import Mapping in Entities gemappt.'
},
{
    id: 'new-int-004', category: 'integration', categoryLabel: 'Integration',
    question: 'Wie wird ein SOAP Web Service in Mendix konsumiert?',
    options: ['Durch Import einer OpenAPI-Spezifikation', 'Durch Import einer WSDL-Datei und Call Web Service Aktivitaet', 'SOAP wird nicht unterstuetzt', 'Durch direktes XML-Schreiben'],
    correct: 1, explanation: 'SOAP Web Services werden durch WSDL-Import konsumiert und ueber Call Web Service im Microflow aufgerufen.'
},
{
    id: 'new-int-005', category: 'integration', categoryLabel: 'Integration',
    question: 'Was wird beim Deployment einer App mit Published OData Services automatisch erstellt?',
    options: ['Eine WSDL-Datei', 'Eine REST-API-Dokumentation', 'Der Service wird im Data Hub Catalog registriert', 'Ein API-Key per E-Mail'],
    correct: 2, explanation: 'Published OData Services werden bei Mendix Cloud Deployment automatisch im Data Hub Catalog registriert.'
},
{
    id: 'new-int-006', category: 'integration', categoryLabel: 'Integration',
    question: 'Wie wird bei einem Consumed REST Service ein Bearer Token uebergeben?',
    options: ['Ueber einen Custom HTTP Header Authorization: Bearer [token]', 'Ueber das eingebaute OAuth-Feld', 'Bearer Tokens werden nicht unterstuetzt', 'Ueber die URL als Query-Parameter'],
    correct: 0, explanation: 'Bearer Token wird als Custom HTTP Header mit Key Authorization und Value Bearer [token] konfiguriert.'
},

// ============ PAGES & NAVIGATION (Neue Fragen) ============
{
    id: 'new-pages-001', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was ist ein "Master Layout" in Mendix?',
    options: ['Ein Layout nur fuer die Startseite', 'Ein Layout das automatisch fuer alle Seiten gilt', 'Das erste Layout das erstellt wird', 'Ein Layout das als Basis fuer andere Layouts dient (Parent Layout)'],
    correct: 3, explanation: 'Wenn ein Layout auf einem anderen basiert, ist das uebergeordnete das Master Layout.'
},
{
    id: 'new-pages-002', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was ist der Unterschied zwischen einem Snippet und einem Building Block beim Einfuegen?',
    options: ['Beide erstellen eine Referenz', 'Beide erstellen eine Kopie', 'Ein Snippet erstellt eine REFERENZ, ein Building Block eine KOPIE', 'Ein Building Block erstellt eine Referenz, ein Snippet eine Kopie'],
    correct: 2, explanation: 'Ein Snippet wird per Snippet Call eingebettet und aendert sich zentral. Ein Building Block wird als Kopie eingefuegt.'
},
{
    id: 'new-pages-003', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Welches Widget verwendet man fuer Many-to-Many (Reference Set) Beziehungen?',
    options: ['Reference Set Selector', 'Reference Selector', 'Input Reference Set Selector', 'Drop-down Widget'],
    correct: 0, explanation: 'Der Reference Set Selector ist das Widget fuer Mehrfachauswahl bei N:M Assoziationen.'
},
{
    id: 'new-pages-004', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Wie funktioniert Context Propagation bei verschachtelten Data Views?',
    options: ['Jede Data View muss eine eigene Datenbankabfrage ausfuehren', 'Verschachtelte Data Views sind nicht moeglich', 'Die innere ueberschreibt den Kontext der aeusseren', 'Die innere Data View kann ueber eine Assoziation auf das Objekt der aeusseren zugreifen'],
    correct: 3, explanation: 'Eine innere Data View kann als Data Source einen Assoziationspfad verwenden der beim Kontextobjekt der aeusseren beginnt.'
},
{
    id: 'new-pages-005', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was passiert wenn ein Tablet-Benutzer die App oeffnet aber kein Tablet-Profil existiert?',
    options: ['Die App zeigt einen Fehler', 'Der Benutzer wird zum Responsive Web Profil weitergeleitet', 'Die App laedt nicht', 'Der Benutzer wird zum Phone-Profil weitergeleitet'],
    correct: 1, explanation: 'Ohne Tablet-Profil wird automatisch das Responsive Web Profil als Fallback verwendet.'
},
{
    id: 'new-pages-006', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was ist der Unterschied zwischen On Change und On Leave bei einem Input-Widget?',
    options: ['On Leave wird vor On Change ausgeloest', 'On Change ist fuer Text-Felder, On Leave fuer Checkboxen', 'Es gibt keinen Unterschied', 'On Change wird nur bei Wertaenderung ausgeloest; On Leave IMMER wenn das Feld den Fokus verliert'],
    correct: 3, explanation: 'On Change wird bei Wertaenderung getriggert. On Leave wird IMMER bei Fokusverlust getriggert, auch ohne Aenderung.'
},
{
    id: 'new-pages-007', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Wie funktioniert die Validation Feedback Aktivitaet in einem Microflow?',
    options: ['Sie zeigt eine rote Fehlermeldung unterhalb des Widgets', 'Sie zeigt eine Popup-Nachricht', 'Sie schreibt den Fehler ins Log', 'Sie verhindert automatisch das Speichern'],
    correct: 0, explanation: 'Validation Feedback zeigt eine rote Meldung unter dem Widget. WICHTIG: Sie verhindert NICHT automatisch den Commit.'
},
{
    id: 'new-pages-008', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was sind die drei Design-Prinzipien von Atlas UI?',
    options: ['Consistency, Accessibility, Responsiveness', 'Modularity, Scalability, Performance', 'Simplicity, Harmony, Flexibility', 'Speed, Power, Flexibility'],
    correct: 2, explanation: 'Atlas UI basiert auf Simplicity, Harmony und Flexibility.'
},
{
    id: 'new-pages-009', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was ist der Hauptvorteil des Offline-First Architekturansatzes?',
    options: ['Die App benoetigt weniger Speicherplatz', 'Daten werden lokal gespeichert und die App funktioniert ohne Netzwerk', 'Die App ist immer schneller', 'Offline-First bedeutet keine Server-Kommunikation'],
    correct: 1, explanation: 'Offline-First speichert Daten lokal und synchronisiert wenn wieder online.'
},
{
    id: 'new-pages-010', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was sind Page Parameters in Mendix?',
    options: ['Einstellungen fuer die Ladezeit', 'URL-Query-Parameter nur fuer SEO', 'CSS-Variablen fuer das Aussehen', 'Parameter die beim Oeffnen einer Seite uebergeben werden und als Kontextobjekte dienen'],
    correct: 3, explanation: 'Page Parameters definieren welche Objekte beim Oeffnen einer Seite uebergeben werden muessen.'
},
{
    id: 'new-pages-011', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was passiert mit der Conditional Visibility wenn die Bedingung false ist?',
    options: ['Das Widget wird komplett aus dem DOM entfernt', 'Das Widget wird ausgegraut', 'Das Widget wird mit display:none versteckt', 'Das Widget zeigt einen Platzhalter'],
    correct: 0, explanation: 'Wenn Conditional Visibility false ist, wird das Widget NICHT im DOM gerendert - komplett entfernt.'
},
{
    id: 'new-pages-012', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was sind Pluggable Widgets und wie unterscheiden sie sich von klassischen Widgets?',
    options: ['Widgets die per Drag-and-Drop eingefuegt werden', 'Nur eine Namensaenderung', 'Pluggable Widgets basieren auf React; klassische auf Dojo', 'Pluggable Widgets funktionieren nur in nativen Apps'],
    correct: 2, explanation: 'Pluggable Widgets nutzen React und das neue Widget API. Klassische Widgets basieren auf Dojo.'
},
{
    id: 'new-pages-013', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Welches Widget empfiehlt Mendix als Alternative zum Template Grid fuer native mobile Seiten?',
    options: ['Data Grid', 'Gallery oder List View', 'Flexbox Layout', 'Tab Container'],
    correct: 1, explanation: 'Template Grid ist Dojo-basiert und nicht auf Native Mobile unterstuetzt. Gallery Widget oder List View sind die Alternativen.'
},
{
    id: 'new-pages-014', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Wie kann man ein Navigation Profile eines bestimmten Typs erzwingen?',
    options: ['Durch eine Einstellung in der App-Sicherheit', 'Durch eine CSS-Media-Query', 'Das ist nicht moeglich', 'Durch Hinzufuegen eines profile Query-String-Parameters zur URL'],
    correct: 3, explanation: 'Man kann ein Profil erzwingen indem man ?profile=Responsive oder ?profile=Tablet zur URL hinzufuegt.'
},
{
    id: 'new-pages-015', category: 'pages', categoryLabel: 'Pages & Navigation',
    question: 'Was ist der Unterschied zwischen Page URL und Microflow URL fuer Deep Links?',
    options: ['Es gibt keinen Unterschied', 'Page URLs oeffnen direkt eine Seite; Microflow URLs fuehren zuerst einen Microflow aus', 'Page URLs sind nur fuer Popups', 'Microflow URLs funktionieren nur offline'],
    correct: 1, explanation: 'Page URLs oeffnen die Seite direkt. Microflow URLs fuehren zuerst Logik aus, z.B. Berechtigungspruefung.'
},
];
