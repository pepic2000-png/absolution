// Movement patterns: anti-extension, anti-rotation, hip-flexion,
// lateral-flexion, bracing, rotation

export const EXERCISES = [
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    pattern: 'anti-extension',
    concept: 'Trainiert die tiefe Stabilisation — Rücken bleibt flach, während Extremitäten sich bewegen.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Dead Bug — Arme',
        desc: 'Rückenlage, Arme gestreckt zur Decke. Einen Arm langsam senken, zurück, wechseln.',
        cue: 'Lendenwirbelsäule auf den Boden drücken — sie bleibt dort!',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Dead Bug — Bein',
        desc: 'Rückenlage, Hüfte und Knie 90°. Ein Bein strecken ohne den Rücken zu wölben.',
        cue: 'Ausatmen beim Strecken — so aktivierst du die Tiefenmuskulatur.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Dead Bug — Arm & Bein diagonal',
        desc: 'Gegenüberliegenden Arm und Bein gleichzeitig strecken. Rücken neutral.',
        cue: 'Stell dir vor, jemand zieht Arm und Bein gleichzeitig auseinander.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Dead Bug — Band oder Gewicht',
        desc: 'Wie diagonal, aber Arm hält Widerstandsband oder Hantel. Maximale Spannung.',
        cue: 'Kein Momentum! Jede Wiederholung kontrolliert und bewusst.',
      },
    ],
  },
  {
    id: 'plank-shoulder-tap',
    name: 'Plank Shoulder Tap',
    pattern: 'anti-rotation',
    concept: 'Erzwingt Rotationsstabilität — der Rumpf bleibt absolut still während ein Arm schwebt.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Plank Hold',
        desc: 'Unterarmstütz, Körper gerade wie ein Brett. Position halten.',
        cue: 'Gesäß nicht hochschieben — Hüfte, Schulter, Kopf in einer Linie.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Plank Shoulder Tap langsam',
        desc: 'Aus dem Stütz eine Hand zur gegenüberliegenden Schulter, 3 Sekunden halten.',
        cue: 'Beine breiter als Schulterbreite — weniger Kippeln.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Plank Shoulder Tap — Tempo',
        desc: 'Shoulder Tap im kontinuierlichen Rhythmus, enge Beinstellung.',
        cue: 'Becken bleibt stabil — kein Drehen, kein Kippen!',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Plank Shoulder Tap + Leg Lift',
        desc: 'Shoulder Tap kombiniert mit gegenüberliegender Beinstreckung.',
        cue: 'Vier Punkte werden zu zwei — nur Hände und ein Fuß am Boden.',
      },
    ],
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    pattern: 'lateral-flexion',
    concept: 'Isoliert die seitliche Rumpfkette — Quadratus lumborum und Obliques unter echter Last.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Side Plank — Knie',
        desc: 'Knie am Boden, Unterarm aufgestützt. Hüfte heben und halten.',
        cue: 'Hüfte nicht absacken — denk daran, sie zur Decke zu drücken.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Side Plank — gestreckt',
        desc: 'Füße übereinander, Unterarm aufgestützt. Körper gerade halten.',
        cue: 'Schulter direkt über dem Ellenbogen — keine Hebelschwäche.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Side Plank + Hip Dip',
        desc: 'Side Plank, Hüfte senken und heben. Kontrollierte Bewegung.',
        cue: 'Nur so weit senken wie du kontrolliert steigen kannst.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Side Plank + Beinstreckung',
        desc: 'Oberes Bein hebt und senkt — Side Plank als Basis für Beinkontrolle.',
        cue: 'Hüfte oben! Das Bein bewegt sich, nicht die Hüfte.',
      },
    ],
  },
  {
    id: 'hollow-body',
    name: 'Hollow Body Hold',
    pattern: 'anti-extension',
    concept: 'Die Grundform der Kernspannung — maximale Anti-Extension in der gesamten Körperlinie.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Hollow Body — Knie angewinkelt',
        desc: 'Rückenlage, Beine 90° angewinkelt in der Luft, Arme neben dem Körper.',
        cue: 'Unterer Rücken flach auf dem Boden — das ist das einzige Kriterium.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Hollow Body — Beine gestreckt',
        desc: 'Beine gestreckt, Fersen 30 cm über dem Boden. Arme am Körper.',
        cue: 'Wenn der Rücken sich hebt, Beine höher nehmen — lieber hoch als schlecht.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Hollow Body — Arme überm Kopf',
        desc: 'Arme gestreckt hinter dem Kopf, Beine tief und gestreckt.',
        cue: 'Rippen runter! Kein Hohlkreuz — der ganze Kontakt bleibt am Boden.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hollow Body Rocks',
        desc: 'Aus der Hollow-Position vorwärts und rückwärts schaukeln ohne Form zu verlieren.',
        cue: 'Die Form diktiert die Bewegung — nicht umgekehrt.',
      },
    ],
  },
  {
    id: 'mountain-climber',
    name: 'Mountain Climber',
    pattern: 'hip-flexion',
    concept: 'Dynamische Hüftflexion unter Rumpfstabilisierung — Koordination trifft Kondition.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Mountain Climber langsam',
        desc: 'Hoher Stütz, ein Knie zur Brust ziehen, halten, zurück, wechseln. Langsam.',
        cue: 'Hüfte nicht hochwerfen — gleiche Höhe wie die Schultern.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Mountain Climber — Tempo',
        desc: 'Gleiches Muster, aber kontinuierlich und zügiger. Rumpf stabil.',
        cue: 'Atmen nicht vergessen — ausatmen wenn das Knie kommt.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Cross-Body Mountain Climber',
        desc: 'Knie zieht diagonal zur gegenüberliegenden Schulter.',
        cue: 'Die Drehung kommt aus der Hüfte, nicht aus den Schultern.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Spider Mountain Climber',
        desc: 'Knie zieht weit außen zum gleichseitigen Ellenbogen — tief und breit.',
        cue: 'Volle Range — Knie wirklich zum Ellenbogen, nicht halbherzig.',
      },
    ],
  },
  {
    id: 'bicycle-crunch',
    name: 'Bicycle Crunch',
    pattern: 'rotation',
    concept: 'Rotationskraft mit Anti-Rotation — die Obliques arbeiten in ihrer natürlichen Funktion.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Bicycle Crunch — Tempo langsam',
        desc: 'Rückenlage, Hände hinter dem Kopf. Ellenbogen zum Knie, 2 Sek halten.',
        cue: 'Hände hinter den Kopf, nicht am Kopf ziehen — der Nacken bleibt entspannt.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Bicycle Crunch — normal',
        desc: 'Kontinuierliche Rotation, Ellenbogen trifft gegenüberliegendes Knie.',
        cue: 'Ellenbogen zur Hüfte bewegen, nicht den Kopf zu den Knien.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Slow Bicycle',
        desc: '3 Sekunden für jede Seite — volle Extension des Beins, tiefer Crunch.',
        cue: 'Je langsamer, desto schwerer. Kein Schwung!',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Bicycle Crunch + Hollow',
        desc: 'Grundposition ist Hollow Body — aus dieser Spannung heraus rotieren.',
        cue: 'Die Basis-Spannung nie aufgeben — Rotation passiert obendrauf.',
      },
    ],
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    pattern: 'rotation',
    concept: 'Rotationsstärke unter Belastung — die Wirbelsäule dreht, der Rumpf kontrolliert.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Russian Twist — Füße am Boden',
        desc: 'Leicht zurückgelehnt sitzen, Füße flach am Boden. Mit Händen tippen.',
        cue: 'Brust bleibt offen — nicht in sich zusammensacken.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Russian Twist — Füße hoch',
        desc: 'Füße vom Boden heben, Gleichgewicht halten, rotieren.',
        cue: 'Knie zusammen — weniger Hebel, mehr Rumpf.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Russian Twist — Gewicht',
        desc: 'Mit Hantel, Medizinball oder Wasserflaschen rotieren.',
        cue: 'Der Blick folgt dem Gewicht — so bleibt die Rotation ehrlich.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Russian Twist — V-Sit',
        desc: 'Beine und Oberkörper in V-Form, Gewicht mit Rotation.',
        cue: 'Beine gestreckt halten während du rotierst — das ist das Ziel.',
      },
    ],
  },
  {
    id: 'reverse-crunch',
    name: 'Reverse Crunch',
    pattern: 'hip-flexion',
    concept: 'Unteren Bauch und Hüftbeuger ansteuern — Becken bewegt sich, nicht die Beine.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Reverse Crunch — angewinkelt',
        desc: 'Knie 90° angewinkelt, Becken leicht heben, zurück. Langsam und kontrolliert.',
        cue: 'Das Becken bewegt sich — nicht die Knie. Kleiner aber echter Crunch.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Reverse Crunch — Beine gestreckt',
        desc: 'Beine gestreckt, Fersen heben und Becken rollen.',
        cue: 'Hände flach neben dem Körper für Stabilität — nicht am Boden pushen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Reverse Crunch — Tischplatte',
        desc: 'Beine parallel zum Boden halten, Becken heben und langsam senken.',
        cue: '3 Sekunden runter — die exzentrische Phase macht den Unterschied.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Reverse Crunch — zur Decke',
        desc: 'Beine senkrecht, Becken hebt so hoch wie möglich zur Decke.',
        cue: 'Kein Schwung! Nur die Bauchkraft hebt das Becken.',
      },
    ],
  },
  {
    id: 'leg-raise',
    name: 'Leg Raise',
    pattern: 'hip-flexion',
    concept: 'Maximale Hüftbeugerkraft und untere Bauchmuskelkontrolle in der Absenkphase.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Leg Raise — angewinkelt',
        desc: 'Knie angewinkelt, Beine heben und senken. Rücken flach.',
        cue: 'Wenn der Rücken sich hebt, stop — du bist zu weit gegangen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Leg Raise — gestreckt',
        desc: 'Beine gestreckt, aus der Luft nicht ganz bis zum Boden senken.',
        cue: 'Die letzten 10 cm sind die schwersten — genau da ist der Effekt.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Leg Raise 3-2-1',
        desc: '3 Sek hoch, 2 Sek halten, 1 Sek runter. Sehr langsam.',
        cue: 'Atemrhythmus: ausatmen wenn die Beine hochgehen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Toe Touch Leg Raise',
        desc: 'Beine heben, Oberkörper mitcrunchet, Finger berühren Zehen.',
        cue: 'Beides bewegt sich zur Mitte — nicht nur der Oberkörper zur Decke.',
      },
    ],
  },
  {
    id: 'pallof-press',
    name: 'Pallof Press',
    pattern: 'anti-rotation',
    concept: 'Anti-Rotationsübung par excellence — der Rumpf widersteht dem seitlichen Zug.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Pallof Press — Isometric Hold',
        desc: 'Band oder Kabel seitlich, Hände vor der Brust halten. Position halten.',
        cue: 'Schultern gerade — keine Drehung zur Seite erlaubt.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Pallof Press — Presse',
        desc: 'Hände zur Brust, dann Arme strecken und zurück. Kontrolliert.',
        cue: 'Der Moment der Streckung ist der schwerste — dort kommt der Zug.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Pallof Press — halb kniend',
        desc: 'Knieender Stand, ein Knie vorne, Pallof Press ausführen.',
        cue: 'Becken neutral — nicht zur Seite kippen wenn du drückst.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Pallof Press — stehend mit Rotation',
        desc: 'Pallof Press, dann kontrolliert rotieren und zurück. Stehend.',
        cue: 'Rotation ist erlaubt — aber sie muss kontrolliert sein, nicht passiv.',
      },
    ],
  },
  {
    id: 'ab-wheel',
    name: 'Ab Wheel Rollout',
    pattern: 'anti-extension',
    concept: 'Maximale Anti-Extension — das Rad erzwingt Stabilisierung über die gesamte Körperlänge.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Ab Wheel — kurz kniend',
        desc: 'Kniend, Rad nur 30 cm vorrollen und zurück. Rücken neutral.',
        cue: 'Kein Hohlkreuz! Wenn du kippst, bist du zu weit gegangen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Ab Wheel — halb kniend',
        desc: 'Rad bis auf Schulterbreite abrollen. Kontrolliert zurück.',
        cue: 'Ausatmen beim Ausrollen, einatmen beim Zurückrollen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Ab Wheel — voll kniend',
        desc: 'Vollständiges Ausrollen bis fast zur Bodenberührung.',
        cue: 'Schulterblätter aktiv halten — nicht durchsacken lassen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Ab Wheel — stehend (Pike)',
        desc: 'Stehend, Rad von den Füßen aus ausrollen. Maximale Stabilisation.',
        cue: 'Becken hoch — erst wenn du sicher bist, rollst du aus.',
      },
    ],
  },
  {
    id: 'l-sit',
    name: 'L-Sit Hold',
    pattern: 'hip-flexion',
    concept: 'Statische Hüftbeugerkraft kombiniert mit Druckkraft — komprimiert und stabilisiert.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'L-Sit — ein Bein',
        desc: 'Auf Händen oder Parallelstäben stützen, ein Knie zur Brust ziehen.',
        cue: 'Schultern runter halten — nicht hochziehen wenn es schwerer wird.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'L-Sit — beide Knie',
        desc: 'Beide Knie angewinkelt in der Luft halten.',
        cue: 'Arme gerade — leichte Schulterstreckung für mehr Stabilität.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'L-Sit — ein Bein gestreckt',
        desc: 'Ein Bein gestreckt, eines angewinkelt. Wechsel auf Zeit.',
        cue: 'Das gestreckte Bein erzwingt echte Hüftbeuger-Kraft.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'L-Sit — beide Beine gestreckt',
        desc: 'Klassisches L-Sit: beide Beine parallel zum Boden, Arme gerade.',
        cue: 'Fersen zusammen, Zehen gestreckt — sauber wie ein Buchstabe L.',
      },
    ],
  },
  {
    id: 'plank-hip-dip',
    name: 'Plank Hip Dip',
    pattern: 'lateral-flexion',
    concept: 'Seitliche Rumpfmuskulatur dynamisch — Plank als Basis für laterale Kontrolle.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Plank Hip Dip — langsam',
        desc: 'Unterarmstütz, Hüfte zur Seite senken und heben. Langsam, wenig Amplitude.',
        cue: 'Schultern bleiben stabil — nur die Hüfte bewegt sich.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Plank Hip Dip — volle Range',
        desc: 'Hüfte tief zum Boden senken, dann über Mitte zur anderen Seite.',
        cue: 'Kontrolliertes Senken — nicht fallen lassen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Plank Hip Dip — Tempo',
        desc: 'Kontinuierliches Dipping links-rechts, erhöhtes Tempo.',
        cue: 'Rumpf bleibt unter Spannung zwischen den Dips.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Stütz Hip Dip',
        desc: 'Hoher Stütz (Hände), gleiche Bewegung — mehr Hebelwirkung.',
        cue: 'Körperlinie gerade — nur die seitliche Hüftbewegung.',
      },
    ],
  },
  {
    id: 'bear-crawl-hold',
    name: 'Bear Crawl Hold',
    pattern: 'bracing',
    concept: 'Quadrupede Stabilisierung — alle vier Punkte aktiv, Rumpf hält die Form unter Schwerkraft.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Bear Hold — statisch',
        desc: 'Vierfüßler, Knie 2 cm vom Boden. Position halten, flacher Rücken.',
        cue: 'Rücken wie ein Tablett — kein Hängen, keine Wölbung.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Bear Hold — Arm heben',
        desc: 'Aus dem Bear Hold einen Arm strecken und halten. Wechseln.',
        cue: 'Schulter drückt aktiv nach oben — kein Hängen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Bear Hold — diagonal',
        desc: 'Arm und gegenüberliegendes Bein gleichzeitig strecken und halten.',
        cue: 'Hüfte nicht drehen — das ist die Challenge.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Bear Crawl — vorwärts/rückwärts',
        desc: 'Aktives Crawlen in einem kleinen Bereich, Knie tief über dem Boden.',
        cue: 'Langsam schlägt schnell — kontrolliertes Crawlen ist schwerer.',
      },
    ],
  },
  {
    id: 'v-up',
    name: 'V-Up',
    pattern: 'hip-flexion',
    concept: 'Explosiver Synchronisation von Ober- und Unterkörper — volle Rumpfkontraktion.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'V-Up — angewinkelt',
        desc: 'Rückenlage, beide Knie zur Brust und gleichzeitig Oberkörper heben.',
        cue: 'Gleichzeitig — nicht erst Knie, dann Oberkörper.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'V-Up — ein Bein gestreckt',
        desc: 'Ein Bein gestreckt hebt, das andere bleibt gebeugt. Oberkörper synchron.',
        cue: 'Das gestreckte Bein gibt dir den Rhythmus vor.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'V-Up — voll gestreckt',
        desc: 'Beide Beine gestreckt, Arme gestreckt — volles V aus der Bodenlage.',
        cue: 'Hände zu den Füßen — nicht Füße zu den Händen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'V-Up — Tempo mit Pause',
        desc: 'Volles V-Up, in der Spitze 1 Sek halten, dann kontrolliert ablegen.',
        cue: 'Die Pause oben macht es zum echten Maximumsatz.',
      },
    ],
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    pattern: 'anti-extension',
    concept: 'Diagonale Verlängerung auf vier Punkten — Lendenwirbelsäule neutral unter Bewegungsanforderung.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Bird Dog — Arm',
        desc: 'Vierfüßler, nur einen Arm vorwärts strecken und halten. Rücken flach.',
        cue: 'Blick zum Boden — Nacken verlängert die Wirbelsäule.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Bird Dog — Bein',
        desc: 'Vierfüßler, nur ein Bein rückwärts strecken. Hüfte neutral.',
        cue: 'Hüfte kippt nicht zur Seite — das Becken bleibt waagerecht.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Bird Dog — diagonal',
        desc: 'Arm und gegenüberliegendes Bein gleichzeitig strecken, 2 Sek halten.',
        cue: 'Stell dir eine Schnur vor, die dich von Hand zu Fuß streckt.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Bird Dog — Elbow to Knee',
        desc: 'Diagonal strecken, dann Ellenbogen und Knie unter dem Körper zusammenführen.',
        cue: 'Langsam! Die Rotation beim Zusammenführen ist das Ziel.',
      },
    ],
  },
  {
    id: 'suitcase-carry',
    name: 'Suitcase Carry (Anti-Lateral)',
    pattern: 'lateral-flexion',
    concept: 'Seitliche Rumpfstabilisierung unter Last — Quadratus lumborum gegen echten Widerstand.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Suitcase Hold — stehend',
        desc: 'Gewicht einseitig halten (Hantel/Flasche), aufrecht stehen, 30 Sek pro Seite.',
        cue: 'Nicht zur Gewichtsseite kippen — genau das ist die Übung.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Suitcase Walk — langsam',
        desc: 'Einseitig Gewicht tragen, langsam im Raum bewegen. Aufrechte Haltung.',
        cue: 'Schulter auf der Lastseite nicht hochziehen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Suitcase Walk — schweres Gewicht',
        desc: 'Schweres einseitiges Gewicht, bewusstes Gegensteuern mit dem Rumpf.',
        cue: 'Jeder Schritt ist eine Rumpfübung — nicht nur ein Spaziergang.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Overhead Carry — einseitig',
        desc: 'Gewicht über Kopf auf einer Seite tragen. Maximale Stabilisierungsanforderung.',
        cue: 'Arm aktiv nach oben drücken — nicht nur passive Last.',
      },
    ],
  },
  {
    id: 'copenhagen-plank',
    name: 'Copenhagen Plank',
    pattern: 'lateral-flexion',
    concept: 'Adduktoren und seitliche Hüfte unter echter Belastung — oft vernachlässigt, extrem effektiv.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Copenhagen — Knie',
        desc: 'Seitliches Liegen, Knie auf einer Erhöhung (Bank/Stuhl), Hüfte heben.',
        cue: 'Das obere Bein trägt — du wirst es in der Innenseite spüren.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Copenhagen — Knöchel',
        desc: 'Seitliches Liegen, Knöchel statt Knie auf der Erhöhung. Längerer Hebel.',
        cue: 'Hüfte hoch und halten — kein Absacken.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Copenhagen — Dips',
        desc: 'Aus der Copenhagen Plank die Hüfte senken und heben.',
        cue: 'Nur so tief wie kontrolliert — Adduktoren machen die Arbeit.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Copenhagen — Bein frei',
        desc: 'Kein Support — unteres Bein bleibt in der Luft, oberes Bein trägt alles.',
        cue: 'Das ist Adduktorenkraft pur — bleib ruhig und atme.',
      },
    ],
  },
  {
    id: 'stir-the-pot',
    name: 'Stir the Pot',
    pattern: 'bracing',
    concept: 'Globale Rumpfstabilisierung unter Kreisbewegung — maximale Aktivierung bei minimaler Bewegung.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Stir the Pot — kleine Kreise',
        desc: 'Unterarmplank auf einem Ball (oder flacher Unterarmplank), kleine Kreisbewegungen.',
        cue: 'Der Körper bewegt sich nicht — nur die Ellenbogen kreisen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Stir the Pot — normale Kreise',
        desc: 'Größere Kreise, Rumpf bleibt komplett stabil.',
        cue: 'Ausatmen in der Kreisbewegung — Spannung nicht verlieren.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Stir the Pot — große Kreise',
        desc: 'Maximale Kreisbewegung, beide Richtungen gleichmäßig.',
        cue: 'Je größer der Kreis, desto mehr Stabilisierungsarbeit.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Stir the Pot — auf Hände',
        desc: 'Hoher Plank auf Ball oder Böden, große Kreise. Weniger Stabilität.',
        cue: 'Nichts zittert außer dir — und das ist gewollt.',
      },
    ],
  },
  {
    id: 'toe-taps',
    name: 'Toe Taps',
    pattern: 'hip-flexion',
    concept: 'Niedrigintensive Hüftbeugung mit Rumpfkontrolle — gut als Einstieg oder Ergänzung.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Toe Taps — langsam',
        desc: 'Rückenlage, Knie 90°, Füße abwechselnd leicht zum Boden tippen.',
        cue: 'Rücken MUSS flach bleiben — das ist alles was zählt.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Toe Taps — Tempo',
        desc: 'Gleiche Bewegung aber schneller, kontinuierlich alternierend.',
        cue: 'Schneller werden ohne die Kontrolle zu verlieren.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Toe Taps — tief',
        desc: 'Bein tiefer absenken — fast bis zum Boden, ohne Rücken zu heben.',
        cue: 'Die kritische Zone ist kurz vor dem Boden — dort atmen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Toe Taps + Armstreckung',
        desc: 'Toe Taps mit gegenüberliegender Armstreckung kombiniert.',
        cue: 'Vier Gliedmaßen, zwei bewegen sich — Rumpf hält alles zusammen.',
      },
    ],
  },
  {
    id: 'windshield-wiper',
    name: 'Windshield Wiper',
    pattern: 'rotation',
    concept: 'Kontrollierte Rotation mit langen Hebeln — Obliques gegen echten Widerstand durch Beingewicht.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Windshield Wiper — Knie',
        desc: 'Rückenlage, Knie 90° über Hüfte, Knie langsam zur Seite senken und zurück.',
        cue: 'Schultern bleiben auf dem Boden — nur das Becken dreht.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Windshield Wiper — halb gestreckt',
        desc: 'Beine 45°, seitlich absenken — höhere Hebelwirkung.',
        cue: 'So weit wie du kontrolliert zurückkommst — nicht weiter.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Windshield Wiper — gestreckt',
        desc: 'Beine senkrecht gestreckt, zur Seite absenken. Maximal kontrolliert.',
        cue: 'Die Absenkphase ist exzentrisch — dort liegt der Trainingseffekt.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Windshield Wiper — liegend',
        desc: 'Arme ausgestreckt auf dem Boden, Beine gestreckt, maximaler Schwenkbereich.',
        cue: 'Kein Schwung — jede Bewegung ist Muskelarbeit.',
      },
    ],
  },
  {
    id: 'glute-bridge-march',
    name: 'Glute Bridge March',
    pattern: 'bracing',
    concept: 'Posteriore Kette und Rumpf kombiniert — Becken stabil während Beine marschieren.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Glute Bridge Hold',
        desc: 'Rückenlage, Füße auf dem Boden, Hüfte heben und halten.',
        cue: 'Gesäß und Bauch gleichzeitig anspannen — nicht nur Gesäß.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Glute Bridge March — langsam',
        desc: 'Aus dem Bridge ein Knie zur Brust heben, zurück, wechseln.',
        cue: 'Hüfte kippt nicht — das ist der Kern der Übung.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Glute Bridge March — Tempo',
        desc: 'Schnelleres Marschieren, Hüfte bleibt konstant oben.',
        cue: 'Hüfte wie ein Tisch — alles kann sich drauf abstützen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Single Leg Bridge March',
        desc: 'Ein Bein gestreckt in der Luft, Marschieren nur mit dem Standbein.',
        cue: 'Maximale Gluteus-Aktivierung auf einer Seite — dann wechseln.',
      },
    ],
  },
  {
    id: 'cable-woodchop',
    name: 'Woodchop / Chop',
    pattern: 'rotation',
    concept: 'Diagonale Rotationskraft — ganzheitliche Aktivierung der rotatorischen Kette.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Chop — kniend',
        desc: 'Halbkniend, Hände zusammen, Diagonalbewegung von hoch-außen nach tief-innen.',
        cue: 'Die Bewegung kommt aus den Hüften, nicht aus den Armen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Chop — stehend',
        desc: 'Stehend, Gewicht oder Band, Diagonalbewegung hochzum tief.',
        cue: 'Füße bleiben am Boden — Rotation über Hüfte und Wirbelsäule.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Chop — Ausfallschritt',
        desc: 'Chop Bewegung kombiniert mit Ausfallschritt in Rotationsrichtung.',
        cue: 'Unterkörper und Oberkörper arbeiten zusammen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Chop — explosiv',
        desc: 'Explosiver Power Chop mit schnellem Zurückführen. Maximale Kraftentwicklung.',
        cue: 'Explosiv rein, kontrolliert raus — nicht umgekehrt.',
      },
    ],
  },
  {
    id: 'dragon-flag',
    name: 'Dragon Flag',
    pattern: 'anti-extension',
    concept: 'Extreme Anti-Extension der gesamten Körperlinie — Schulterblätter als einziger Kontaktpunkt.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Dragon Flag — Knie',
        desc: 'An einer Bank festhalten, Schulterblätter als Basis, Knie angewinkelt heben.',
        cue: 'Der Körper kippt nicht — er bewegt sich als Einheit.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Dragon Flag — halb gestreckt',
        desc: 'Ein Bein gestreckt, eines gebeugt. Langsam absenken und halten.',
        cue: 'Ausatmen beim Absenken — so bleibt die Spannung.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Dragon Flag — negativ',
        desc: 'Beine gestreckt hoch, dann kontrolliert absenken. Nur die Absenkphase.',
        cue: '3-5 Sekunden für das Absenken — nicht schneller.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Dragon Flag — voll',
        desc: 'Volles Dragon Flag: hoch und runter mit gestrecktem Körper.',
        cue: 'Wenige saubere Reps sind besser als viele unsaubere.',
      },
    ],
  },
  {
    id: 'tuck-crunch',
    name: 'Tuck Crunch',
    pattern: 'hip-flexion',
    concept: 'Kurze aber intensive Rumpfkontraktion — beide Enden gleichzeitig zur Mitte.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Tuck Crunch — Knie',
        desc: 'Rückenlage, Knie zur Brust ziehen während Oberkörper cruncht. Langsam.',
        cue: 'Keine Drehung — gerader Crunch direkt nach oben.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Tuck Crunch — Tempo',
        desc: 'Gleiches Muster im Rhythmus — kontinuierlich ohne vollständiges Ablegen.',
        cue: 'Kurz den Boden berühren, nie die Spannung völlig aufgeben.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Tuck Crunch — Hollow Basis',
        desc: 'Aus Hollow Body heraus crunchet — nie die Grundspannung verlieren.',
        cue: 'Der Crunch ist eine Zugabe — die Hollow ist das Fundament.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Tuck Crunch + Pause',
        desc: 'In der Spitze des Crunches 1 Sek halten. Maximale Kontraktion.',
        cue: 'Ausatmen und drücken am Kontraktionspunkt.',
      },
    ],
  },
  {
    id: 'seated-leg-lift',
    name: 'Seated Leg Lift',
    pattern: 'hip-flexion',
    concept: 'Hüftbeugekraft in aufrechter Sitzposition — Stabilisierung ohne Rückenlage.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Seated Lift — Knie',
        desc: 'Auf dem Boden sitzen, Hände neben dem Gesäß, ein Knie hochziehen.',
        cue: 'Rücken aufrecht — nicht nach hinten lehnen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Seated Lift — beide Knie',
        desc: 'Beide Knie gleichzeitig zur Brust ziehen und halten.',
        cue: 'Balance ist die Herausforderung — Hände können helfen, aber weniger ist mehr.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Seated Lift — Bein gestreckt',
        desc: 'Ein Bein gestreckt anheben und halten. Sitzposition stabil.',
        cue: 'Oberschenkel vom Boden abheben — das ist echter Hüftbeuger.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Seated Lift — ohne Hände',
        desc: 'Hände von Boden abheben, nur auf Gesäß balancieren, Beine alternierend heben.',
        cue: 'Balance und Kraft gleichzeitig — das ist echter Rumpfkontrolle.',
      },
    ],
  },
  {
    id: 'plank-walk',
    name: 'Plank Walk',
    pattern: 'bracing',
    concept: 'Dynamisches Bracing — der Rumpf stabilisiert während der Körper die Stützposition wechselt.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Plank Walk — Unterarm zu Hand',
        desc: 'Aus dem Unterarmplank eine Hand, dann die andere hochschieben. Zurück.',
        cue: 'Hüfte bleibt still — kein Kippen bei jedem Handwechsel.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Plank Walk — seitwärts',
        desc: 'Hoher Plank, Hände und Füße synchron seitwärts bewegen.',
        cue: 'Körper bleibt gerade — kein Schlangengang.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Plank Walk — vor und zurück',
        desc: 'Hoher Plank, Hände nach vorne kriechen, dann zurück. Füße bleiben.',
        cue: 'Hüfte sinkt nicht ab wenn du dich streckst.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Plank Walk — diagonal',
        desc: 'Kombinierte Vorwärts- und Seitwärtsbewegung — maximale Koordinationsanforderung.',
        cue: 'Jeder Schritt ist eine eigene Stabilisierungsaufgabe.',
      },
    ],
  },
  {
    id: 'oblique-crunch',
    name: 'Oblique Crunch',
    pattern: 'lateral-flexion',
    concept: 'Direktes Training der seitlichen Bauchmuskulatur — laterale Flexion der Wirbelsäule.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Oblique Crunch — seitliche Beugung',
        desc: 'Rückenlage, Hände hinter Kopf, zur Seite crunchen. Langsam und kontrolliert.',
        cue: 'Ellenbogen und Hüfte gleicher Seite kommen zueinander.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Oblique Crunch — gekreuzt',
        desc: 'Oberes Bein über das untere, seitlicher Crunch in Richtung Knie.',
        cue: 'Die Beinposition erhöht den Widerstand automatisch.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Oblique Crunch — mit Beinstreckung',
        desc: 'Seitlicher Crunch kombiniert mit gleichzeitiger Beinstreckung zur Seite.',
        cue: 'Zwei Enden einer Seite kommen zusammen — konzentrisch.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Side Crunch — gehängt',
        desc: 'An einer Stange hängen, Beine zur Seite heben — voller Bereich.',
        cue: 'Schultern stabil — die Bewegung kommt aus der Hüfte.',
      },
    ],
  },
  {
    id: 'hollow-to-arch',
    name: 'Hollow to Arch',
    pattern: 'bracing',
    concept: 'Volle Körperspannung in beide Richtungen — Rumpf wechselt zwischen zwei Extrempositionen.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Hollow Hold — statisch',
        desc: 'Nur die Hollow-Position halten. Vorbereitung für den Wechsel.',
        cue: 'Rippen runter, Rücken flach — das ist die Basis.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Hollow to Arch — langsam',
        desc: 'Aus Hollow (Bauch) in Arch (Rücken) rollen. Kontrollierter Wechsel.',
        cue: 'Nicht fallen lassen — der Wechsel ist die Übung.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Hollow to Arch — Rhythmus',
        desc: 'Kontinuierlicher Wechsel im Rhythmus, volle Streckung in beide Richtungen.',
        cue: 'Ausatmen in der Hollow, einatmen in der Arch.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hollow to Arch — schnell',
        desc: 'Schneller Wechsel mit maximaler Spannung in jeder Position.',
        cue: 'Kein Schwung — jeder Wechsel beginnt mit Muskelkraft.',
      },
    ],
  },
  {
    id: 'half-kneeling-chop',
    name: 'Half Kneeling Pallof',
    pattern: 'anti-rotation',
    concept: 'Anti-Rotation in instabiler Knieposition — höherer Transfer auf sportliche Bewegungen.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Half Kneeling Hold',
        desc: 'Halbkniend (ein Knie am Boden), Hände vor der Brust, seitlichem Zug widerstehen.',
        cue: 'Knie und Hüfte in einer Linie — Becken neutral.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Half Kneeling Press',
        desc: 'Halbkniend, Arme strecken und zurückziehen gegen seitlichen Widerstand.',
        cue: 'Das Strecken der Arme erhöht den Drehmoment — dort widerstehen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Half Kneeling Rotation',
        desc: 'Halbkniend, kontrolliert rotieren und zurück. Bewegung mit Kontrolle.',
        cue: 'Rotation ist jetzt erlaubt — aber kontrolliert und bewusst.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Half Kneeling — wechselndes Knie',
        desc: 'Press + Knienwechsel ohne Widerstand zu verlieren.',
        cue: 'Der Knienwechsel destabilisiert — genau dort maximal widerstehen.',
      },
    ],
  },
  {
    id: 'swimmers',
    name: 'Swimmers (Prone)',
    pattern: 'bracing',
    concept: 'Posteriore Rumpfstabilisierung in Bauchlage — Gegenspieler zu den Beuge-dominierten Übungen.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Swimmers — Arm',
        desc: 'Bauchlage, einen Arm heben und halten. Stirn leicht vom Boden.',
        cue: 'Schulterblatt nach hinten-unten ziehen vor dem Heben.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Swimmers — Bein',
        desc: 'Bauchlage, ein Bein heben und halten. Hüfte bleibt am Boden.',
        cue: 'Das Gesäß spannt — nicht nur der Rücken hebt das Bein.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Swimmers — diagonal',
        desc: 'Arm und gegenüberliegendes Bein gleichzeitig heben. Schwimmbewegung.',
        cue: 'Beide Seiten gleichmäßig — kein Kippen zur Seite.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Swimmers — Tempo',
        desc: 'Schnelles alternierend-diagonales Schwimmen, Körper in der Luft halten.',
        cue: '🔥 Schnell und kontrolliert — alles aktiviert.',
      },
    ],
  },
  {
    id: 'hip-thrust-hold',
    name: 'Hip Thrust Isometric',
    pattern: 'bracing',
    concept: 'Statischer Hüftstoß — Gesäß und Rumpf halten die Hüfte auf maximaler Höhe.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Hip Thrust Hold — Boden',
        desc: 'Schulterblätter am Boden, Füße flach, Hüfte hochdrücken und halten.',
        cue: 'Schulterblätter, nicht der Nacken, tragen das Gewicht.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Hip Thrust Hold — Bank',
        desc: 'Schulterblätter auf einer Bank, höheres Niveau, Hüfte halten.',
        cue: 'Körper von Schulter bis Knie gerade — kein Durchhängen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Hip Thrust Hold — einbeinig',
        desc: 'Ein Bein gestreckt in der Luft, anderes stemmt. Hüfte auf Höhe halten.',
        cue: 'Hüfte kippt zur freien Seite — dagegen halten ist das Ziel.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hip Thrust Hold + March',
        desc: 'Aus dem Halten heraus ein Knie hochziehen und zurück. Hüfte bleibt oben.',
        cue: 'Hüfte kippt nicht — das ist der Unterschied zum normalen Bridge.',
      },
    ],
  },
  {
    id: 'hanging-knee-raise',
    name: 'Hanging Knee Raise',
    pattern: 'hip-flexion',
    concept: 'Hängende Hüftbeugung — volle Dekompression der Wirbelsäule kombiniert mit Kernkraft.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Hanging Hold',
        desc: 'An der Stange hängen, Körper stabil halten — keine Schaukelbewegung.',
        cue: 'Schulterblätter aktiv nach unten — nicht passiv hängen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Hanging Knee Raise',
        desc: 'Hängen, Knie zur Brust ziehen, kontrolliert absenken.',
        cue: 'Kein Schwung — die Kraft kommt aus dem Bauch, nicht dem Schwung.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Hanging Leg Raise',
        desc: 'Beine gestreckt parallel zum Boden heben und senken.',
        cue: '3 Sekunden für die Absenkphase — dort liegt der Trainingsreiz.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hanging Toes to Bar',
        desc: 'Gestreckte Beine bis zur Stange heben. Maximaler Hüftbeugeranspruch.',
        cue: 'Schultern stabil, Körper unter Kontrolle — kein Kippen.',
      },
    ],
  },
  {
    id: 'plank-pull-through',
    name: 'Plank Pull Through',
    pattern: 'anti-rotation',
    concept: 'Einseitige Last destabilisiert den Plank — Rumpf muss aktiv Rotation verhindern.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Plank Pull Through — langsam',
        desc: 'Hoher Plank, eine Hand greift unter dem Körper hindurch und zieht eine Flasche/Gewicht.',
        cue: 'Hüfte bleibt absolut still — kein Kippen beim Ziehen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Plank Pull Through — normal',
        desc: 'Gleiche Bewegung im normalen Tempo, abwechselnd beide Seiten.',
        cue: 'Je schwerer das Objekt, desto mehr Anti-Rotation ist nötig.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Plank Pull Through — schwer',
        desc: 'Schweres Gewicht durchziehen. Minimaler Zeitkontakt mit Boden.',
        cue: 'Schultern parallel zum Boden — kein Drehen der Körperachse.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Plank Pull Through — Tempo',
        desc: 'Schnelles Wechseln, konstante Destabilisierung, maximale Rumpfantwort.',
        cue: 'Schneller macht es schwerer — nicht einfacher.',
      },
    ],
  },
  {
    id: 'crunch',
    name: 'Crunch / Sit-up',
    pattern: 'hip-flexion',
    concept: 'Klassische Rumpfbeugung — kurze Kontraktionsbewegung der geraden Bauchmuskulatur.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Crunch — kurz',
        desc: 'Rückenlage, Knie gebeugt, Hände hinter Kopf. Nur Schulterblätter heben.',
        cue: 'Kinn zum Brustbein — nicht zum Knie. Kurze Bewegung.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Sit-up',
        desc: 'Füße fixiert oder frei, vollständige Aufrichtung bis aufrecht sitzen.',
        cue: 'Rollen statt Hochreißen — Wirbel für Wirbel aufbauen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Decline Sit-up',
        desc: 'Auf einer geneigten Bank (Kopf unten), vollständiger Sit-up gegen die Schwerkraft.',
        cue: 'Je steiler die Bank, desto mehr Körpergewicht — kontrolliert bleiben.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Gewichteter Sit-up',
        desc: 'Sit-up mit Gewicht (Hantel, Medizinball) vor der Brust oder überm Kopf.',
        cue: 'Das Gewicht verlängert den Hebel — Rücken schützen, langsam ablegen.',
      },
    ],
  },
  {
    id: 'flutter-kicks',
    name: 'Flutter Kicks',
    pattern: 'hip-flexion',
    concept: 'Kontinuierliche Beinbewegung mit isometrisch gehaltener Rumpfspannung — Ausdauer trifft Kraft.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Flutter Kicks — klein',
        desc: 'Rückenlage, Beine 45°, kleine schnelle Wechselbewegungen der Beine.',
        cue: 'Lendenwirbelsäule bleibt am Boden — das ist nicht verhandelbar.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Flutter Kicks — tief',
        desc: 'Beine tiefer (ca. 20°), größere Amplitude. Rücken flach.',
        cue: 'Wenn der Rücken sich hebt, Beine höher — Qualität vor Tiefe.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Hollow Flutter Kicks',
        desc: 'Aus der Hollow-Position heraus — Schulterblätter heben, Arme gestreckt, Kicks.',
        cue: 'Hollow-Spannung nie aufgeben — der Flutter ist nur das Sahnehäubchen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hanging Flutter Kicks',
        desc: 'An der Stange hängen, Beine gestreckt abwechselnd heben und senken.',
        cue: 'Schultern aktiv — nicht passiv hängen und Beine schleudern.',
      },
    ],
  },
  {
    id: 'heel-touches',
    name: 'Heel Touches',
    pattern: 'lateral-flexion',
    concept: 'Seitliche Bauchmuskelaktivierung durch diagonale Streckbewegung — niedrig, aber präzise.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Heel Touches — langsam',
        desc: 'Rückenlage, Knie gebeugt. Seitlich zur Ferse tippen — linke Hand links, rechte rechts.',
        cue: 'Schulterblatt hebt — der Rest des Rückens bleibt am Boden.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Heel Touches — Tempo',
        desc: 'Gleiche Bewegung schneller, rhythmisches Tippen abwechselnd.',
        cue: 'Seite zu Seite ohne Stop in der Mitte — fließende Bewegung.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Heel Touches — Beine tiefer',
        desc: 'Füße weiter weg vom Gesäß — längerer Hebel, mehr Reichweite nötig.',
        cue: 'Je weiter die Füße, desto mehr Seitenbeugung ist nötig.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Heel Touches — mit Beinstreckung',
        desc: 'Beim seitlichen Tippen das gegenüberliegende Bein kurz strecken.',
        cue: 'Vier Punkte gleichzeitig — Koordination und Stabilität.',
      },
    ],
  },
  {
    id: 'standing-knee-raise',
    name: 'Standing Knee Raise',
    pattern: 'hip-flexion',
    concept: 'Stehende Hüftbeugung — Core-Kontrolle in aufrechter Position, Transfer auf Sport.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Standing Knee Raise — langsam',
        desc: 'Stehend, ein Knie zur Brust ziehen, halten, absenken. Wechseln.',
        cue: 'Oberkörper bleibt aufrecht — nicht zum Knie neigen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'High Knee March',
        desc: 'Marschieren mit hohem Kniehub — Oberschenkel parallel zum Boden.',
        cue: 'Arme gegensynchron bewegen — wie beim Laufen.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Explosive Knee Drive',
        desc: 'Explosives Knieheben mit Armimpuls. Schnell und kräftig.',
        cue: 'Kraft kommt aus der Hüfte — Knie nach oben schießen lassen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hanging Knee-to-Elbow',
        desc: 'An der Stange hängen, Knie diagonal zum gegenüberliegenden Ellenbogen ziehen.',
        cue: 'Rotation und Hüftbeugung kombiniert — echte Kraft nötig.',
      },
    ],
  },
  {
    id: 'jackknife',
    name: 'Jackknife',
    pattern: 'hip-flexion',
    concept: 'Gleichzeitige Kontraktion von Ober- und Unterkörper zur Mitte — maximale Rumpfsynergie.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Toe Reach Crunch',
        desc: 'Rückenlage, Beine 90°, Arme zu den Füßen strecken — Schulterblätter heben.',
        cue: 'Finger berühren Zehen — nicht Zehen zu Fingern.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Jackknife — Knie',
        desc: 'Rückenlage gestreckt, Knie und Oberkörper gleichzeitig zur Mitte klappen.',
        cue: 'Gleichzeitig — nicht sequenziell. Der Rhythmus ist der Trick.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Jackknife — gestreckt',
        desc: 'Beine und Arme gestreckt, alles gleichzeitig zur Mitte heben.',
        cue: 'Beine gestreckt lassen — kein Abkürzen durch Beugen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Full Jackknife mit Pause',
        desc: 'Vollständiger Jackknife, in der Spitze 1-2 Sek halten. Kontrolliert ablegen.',
        cue: 'Die Pause macht es zur echten Maximalübung.',
      },
    ],
  },
  {
    id: 'v-sit',
    name: 'V-Sit Progression',
    pattern: 'bracing',
    concept: 'Statische Hüftbeugung und Rumpfspannung kombiniert — der Körper bildet ein stabiles V.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Seated Knee Tuck',
        desc: 'Sitzen, Hände neben Gesäß, Knie zur Brust ziehen und halten.',
        cue: 'Rücken mäßig geneigt — nicht zusammensacken.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'V-Sit Hold',
        desc: 'Beine halb gestreckt, Rücken geneigt — V-Form halten.',
        cue: 'Brustbein hoch — kein runder Rücken.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'V-Sit Crunch',
        desc: 'Aus dem V-Sit heraus Knie anziehen und wieder strecken — pulsierend.',
        cue: 'Gleichgewicht halten — die Hände helfen nur minimal.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'V-Sit — Beine gestreckt halten',
        desc: 'Klassisches L-Sit in V-Position: Beine gestreckt parallel halten, Hände am Boden.',
        cue: 'Fersen zusammen, Oberschenkel angespannt — das V bleibt.',
      },
    ],
  },
  {
    id: 'resistance-crunch',
    name: 'Resistance Crunch',
    pattern: 'hip-flexion',
    concept: 'Crunch gegen externen Widerstand — höhere Kraftentwicklung durch Band oder Kabel.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Standing Band Crunch',
        desc: 'Stehend, Band hinter dem Kopf fixiert, Oberkörper nach unten crunchen.',
        cue: 'Hüfte still — nur der Oberkörper bewegt sich nach unten.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Band Crunch — kniend',
        desc: 'Kniend, Band oder Kabel von oben, Ellenbogen zu den Oberschenkeln.',
        cue: 'Band unter Spannung halten — kein Loslassen am Tiefpunkt.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Cable Crunch',
        desc: 'Am Kabelzug kniend, Seil hinter dem Kopf, Crunchen gegen Widerstand.',
        cue: 'Hüfte als Drehpunkt — Bewegung kommt aus dem Bauch, nicht dem Rücken.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Cable Crunch — schwer',
        desc: 'Maximales Gewicht am Kabelzug, langsame exzentrische Phase.',
        cue: '3-4 Sekunden hochkontrolliert zurück — das ist die Schlüsselphase.',
      },
    ],
  },
  {
    id: 'rkc-plank',
    name: 'RKC Plank',
    pattern: 'bracing',
    concept: 'Maximale Gesamtkörperspannung im Plank — alle Muskelgruppen gleichzeitig aktiviert.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Knie-Plank — aktiv',
        desc: 'Knie am Boden, aktiv alle Muskeln anspannen: Gesäß, Bauch, Schultern, Quads.',
        cue: 'Stell dir vor, du wirst von oben und unten gleichzeitig gedrückt.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Plank — maximale Spannung',
        desc: 'Voller Unterarmplank: Ellenbogen zum Fuß ziehen, Fuß zum Ellenbogen — ohne Bewegung.',
        cue: 'Isometrische Kontraktion: nichts bewegt sich, alles ist angespannt.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'RKC Plank',
        desc: 'Fäuste am Boden, Boden zwischen Fäusten und Füßen "zusammenziehen". Maximale Ganzkörperspannung.',
        cue: 'Gesäß, Bauch, Quads, Schultern — alles gleichzeitig maximal.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'RKC Plank + Gewicht',
        desc: 'RKC Plank mit Gewichtsscheibe auf dem Rücken. Stabilisierung unter Last.',
        cue: 'Das Gewicht ist nur ein Test — die Spannung kommt von innen.',
      },
    ],
  },
  {
    id: 'star-side-plank',
    name: 'Star Side Plank',
    pattern: 'lateral-flexion',
    concept: 'Seitliche Rumpfstabilisierung in maximaler Ausladung — alle Extremitäten gestreckt.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Side Plank — Arm hoch',
        desc: 'Normaler Side Plank, oberer Arm senkrecht zur Decke gestreckt.',
        cue: 'Die gerade Linie von Fuß über Hüfte bis zur Hand halten.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Side Plank + Bein oben',
        desc: 'Oberes Bein heben und halten — drei Punkte in der Luft.',
        cue: 'Hüfte bleibt oben — das Bein bewegt sich, nicht die Hüfte.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Star Side Plank',
        desc: 'Oberes Bein und oberer Arm gleichzeitig ausgestreckt — Sternform.',
        cue: 'Vier Extremitäten strecken, Hüfte hoch — das ist echter Lateral.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Star Side Plank — Dips',
        desc: 'Aus der Sternposition Hüfte senken und heben. Maximale laterale Kraft.',
        cue: 'Langsam senken, explosiv heben — die Absenkphase ist der Reiz.',
      },
    ],
  },
  {
    id: 'hanging-wiper',
    name: 'Hanging Windshield Wiper',
    pattern: 'rotation',
    concept: 'Rotatorische Kraft am Reck — der Rumpf kontrolliert das Gewicht der Beine beim Pendeln.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Hanging Wiper — Knie',
        desc: 'Hängen, Knie zur Brust ziehen, dann Knie zur Seite absenken und zurück.',
        cue: 'Schultern stabil — die Bewegung kommt aus der Hüfte.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Hanging Wiper — halb',
        desc: 'Beine 90° angewinkelt, seitlich pendeln. Kontrolliert.',
        cue: 'Beide Seiten gleich weit — nicht zur stärkeren Seite schummeln.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Hanging Wiper — gestreckt',
        desc: 'Beine senkrecht gestreckt, seitlich absenken. Maximaler Hebel.',
        cue: 'Kontrolliert bis zur Seite, nicht fallen lassen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Hanging Wiper — 360°',
        desc: 'Vollständige Kreisbewegung der gestreckten Beine am Reck.',
        cue: 'Volle Kontrolle in jeder Position — kein unkontrolliertes Pendeln.',
      },
    ],
  },
  {
    id: 'garhammer-raise',
    name: 'Garhammer Raise',
    pattern: 'hip-flexion',
    concept: 'Hängende Hüftbeugung mit Hüftextension — maximale untere Bauchmuskelrekrutierung.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Garhammer — Knie kurz',
        desc: 'Hängen, Knie zur Brust ziehen, kurz halten. Kontrolliert absenken.',
        cue: 'Das Senken ist das Workout — nicht fallen lassen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Garhammer — Knie hoch',
        desc: 'Knie über Hüfthöhe ziehen, Becken rollt leicht nach oben.',
        cue: 'Das Becken muss rollen — dann aktivierst du den unteren Bauch.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Garhammer — gestreckt',
        desc: 'Beine gestreckt heben, Hüfte rollt am höchsten Punkt nach oben.',
        cue: 'Der Hüftroll ist der entscheidende Moment — dort ist die Kontraktion.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Garhammer Raise — langsam',
        desc: 'Voller Garhammer Raise mit 4-Sek-Absenkphase. Maximale exzentrische Arbeit.',
        cue: 'Langsam ist stärker als schnell — das hier ist Muskelaufbau pur.',
      },
    ],
  },
  {
    id: 'plank-jack',
    name: 'Plank Jack',
    pattern: 'bracing',
    concept: 'Dynamisches Bracing mit Beinbewegung — Rumpf stabilisiert während Beine springen.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Plank Jack — schrittweise',
        desc: 'Hoher Plank, Füße abwechselnd nach außen treten und zurück.',
        cue: 'Hüfte bleibt auf Plank-Niveau — kein Hochwerfen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Plank Jack — springend',
        desc: 'Beide Füße gleichzeitig nach außen springen und zurück.',
        cue: 'Jeder Sprung destabilisiert — der Rumpf muss sofort antworten.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Plank Jack — Tempo',
        desc: 'Schnelles kontinuierliches Springen, Rumpf unter Dauerspannung.',
        cue: 'Schnell und stabil — kein Nachlassen in der Rumpfspannung.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Plank Jack + Shoulder Tap',
        desc: 'Jedes zweite Plank Jack kombiniert mit Shoulder Tap — doppelte Destabilisierung.',
        cue: 'Zwei Anforderungen gleichzeitig — das ist echter Maximalbereich.',
      },
    ],
  },
  {
    id: 'ab-march',
    name: 'Supine March',
    pattern: 'anti-extension',
    concept: 'Kontrollierte Hüftbeugung in Rückenlage — Einsteiger in die Anti-Extension mit Fokus auf Atemtechnik.',
    variants: [
      {
        level: 'easy',
        label: 'Leicht',
        name: 'Supine March — langsam',
        desc: 'Rückenlage, Knie 90°, ein Bein kurz heben, zurück, wechseln. Sehr langsam.',
        cue: 'Ausatmen beim Heben — Bauch zieht sich zusammen.',
      },
      {
        level: 'medium',
        label: 'Mittel',
        name: 'Supine March — Tempo',
        desc: 'Gleiches Muster etwas schneller, Rumpf bleibt unter konstantem Druck.',
        cue: 'Lendenwirbel bleibt auf dem Boden — immer.',
      },
      {
        level: 'hard',
        label: 'Schwer',
        name: 'Supine March — Armstreckung',
        desc: 'Beim Bein heben den gegenüberliegenden Arm nach hinten strecken.',
        cue: 'Vier-Gliedmaßen-Koordination — der Rumpf hält alles zusammen.',
      },
      {
        level: 'maximum',
        label: 'Maximum',
        name: 'Supine March — mit Band',
        desc: 'Band um die Knie (Abduktionswiderstand) während du marschierst.',
        cue: 'Das Band zieht die Knie zusammen — aktiv gegensteuern.',
      },
    ],
  },
]

// Activation exercise — always first
export const ACTIVATION_EXERCISE = {
  id: 'dead-bug',
  name: 'Dead Bug',
}

export const BURNOUT_EXERCISES = [
  {
    id: 'burnout-plank',
    name: 'Plank Max Hold',
    concept: 'Maximale statische Ausbelastung — alles was du hast in die letzte Plank.',
    variants: [
      { level: 'easy', label: 'Leicht', name: 'Unterarmplank', desc: 'Unterarmplank so lange wie möglich halten.', cue: 'Lass alles raus — das ist das Ende!' },
      { level: 'medium', label: 'Mittel', name: 'Hoher Plank', desc: 'Hoher Stütz, maximale Spannung halten.', cue: 'Alles aktivieren — Gesäß, Core, Schultern!' },
      { level: 'hard', label: 'Schwer', name: 'Plank + Tap', desc: 'Plank mit Shoulder Taps bis zum Versagen.', cue: 'Jede Wiederholung ist ein Geschenk!' },
      { level: 'maximum', label: 'Maximum', name: 'Pike Plank', desc: 'Hoher Stütz, Gesäß in der Luft — maximale Spannung.', cue: '🔥 ALLES GEBEN! 🔥' },
    ],
  },
  {
    id: 'burnout-hollow',
    name: 'Hollow Body Burnout',
    concept: 'Bis zum Versagen — die Hollow-Form so lange wie möglich halten.',
    variants: [
      { level: 'easy', label: 'Leicht', name: 'Hollow — Knie hoch', desc: 'Knie angewinkelt, Hollow so lange wie möglich.', cue: 'Wenn es brennt, bist du am richtigen Ort!' },
      { level: 'medium', label: 'Mittel', name: 'Hollow — Beine halb gestreckt', desc: 'Beine 45° gesenkt, maximale Spannung halten.', cue: 'Rücken flach — alles andere ist verhandelbar!' },
      { level: 'hard', label: 'Schwer', name: 'Hollow — voll gestreckt', desc: 'Volle Hollow Position bis zum Versagen.', cue: 'Das ist der Finisher — gib alles!' },
      { level: 'maximum', label: 'Maximum', name: 'Hollow Rocks', desc: 'Aus der Hollow raus schaukeln bis die Form zusammenbricht.', cue: '🔥 LETZTE RUNDE! 🔥' },
    ],
  },
  {
    id: 'burnout-climber',
    name: 'Mountain Climber Burnout',
    concept: 'Maximales Tempo — dynamische Ausbelastung als Abschluss.',
    variants: [
      { level: 'easy', label: 'Leicht', name: 'Slow Climber', desc: 'Mountain Climber langsam aber ohne Stop.', cue: 'Dein eigenes Tempo — aber niemals aufhören!' },
      { level: 'medium', label: 'Mittel', name: 'Steady Climber', desc: 'Gleichmäßiges Tempo, Rumpf stabil.', cue: 'Finde deinen Rhythmus und halte ihn!' },
      { level: 'hard', label: 'Schwer', name: 'Fast Climber', desc: 'So schnell wie möglich — Form soweit machbar halten.', cue: 'Schneller! Schneller! Schneller!' },
      { level: 'maximum', label: 'Maximum', name: 'Sprint Climber', desc: 'Maximales Sprint-Tempo — alles rausgeben.', cue: '🔥 SPRINT! SPRINT! SPRINT! 🔥' },
    ],
  },
  {
    id: 'burnout-vup',
    name: 'V-Up Burnout',
    concept: 'Abschluss mit explosiver Gesamtkontraktion — jedes Rep zählt.',
    variants: [
      { level: 'easy', label: 'Leicht', name: 'V-Up — Knie', desc: 'Angewinkelte V-Ups so viele wie möglich.', cue: 'Zähl nicht — spür es einfach!' },
      { level: 'medium', label: 'Mittel', name: 'V-Up — halbgestreckt', desc: 'Halbgestreckte V-Ups im Burnout-Tempo.', cue: 'Kein Stop bis der Timer endet!' },
      { level: 'hard', label: 'Schwer', name: 'V-Up — voll', desc: 'Volle V-Ups bis zum Versagen.', cue: 'Jede Wiederholung ist ein Sieg!' },
      { level: 'maximum', label: 'Maximum', name: 'V-Up mit Pause', desc: 'Volle V-Ups mit 1-Sek-Pause oben — maximale Spannung.', cue: '🔥 LETZTER SATZ DES TAGES! 🔥' },
    ],
  },
  {
    id: 'burnout-bicycle',
    name: 'Bicycle Crunch Burnout',
    concept: 'Rotatorische Ausbelastung — maximale Wiederholungen als Abschluss.',
    variants: [
      { level: 'easy', label: 'Leicht', name: 'Slow Bicycle', desc: 'Langsame Bicycle Crunches durchgehend.', cue: 'Qualität bleibt — Tempo kann sinken!' },
      { level: 'medium', label: 'Mittel', name: 'Steady Bicycle', desc: 'Gleichmäßiges Tempo, volle Rotation.', cue: 'Ellenbogen trifft Knie — immer!' },
      { level: 'hard', label: 'Schwer', name: 'Fast Bicycle', desc: 'Hohes Tempo, maximale Rotationsbandbreite.', cue: 'Schnell UND vollständig — kein Schummeln!' },
      { level: 'maximum', label: 'Maximum', name: 'Bicycle Sprint', desc: 'Maximales Sprint-Tempo der Bicycle — alles raus.', cue: '🔥 LETZTE SEKUNDE ZÄHLT! 🔥' },
    ],
  },
]

// Shuffle array without mutation
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// All level keys in order
export const ALL_LEVELS = ['easy', 'medium', 'hard', 'maximum']

// Select exercises: start with activation, then mix patterns
// levels = array of level keys to include, e.g. ['hard', 'maximum']
export function selectExercises(count, levels = ALL_LEVELS, extraExercises = []) {
  const allExercises = [...EXERCISES, ...extraExercises]
  const activation = allExercises.find(e => e.id === 'dead-bug') || allExercises[0]
  const rest = allExercises.filter(e => e.id !== activation.id)
  const shuffled = shuffle(rest)

  const selected = [activation]
  let lastPattern = activation.pattern

  for (const ex of shuffled) {
    if (selected.length >= count) break
    if (ex.pattern !== lastPattern) {
      selected.push(ex)
      lastPattern = ex.pattern
    }
  }

  // Fill remaining if pattern constraint prevented it
  for (const ex of shuffled) {
    if (selected.length >= count) break
    if (!selected.find(s => s.id === ex.id)) {
      selected.push(ex)
    }
  }

  const weightedEquip = ['dumbbell', 'cable']
  const usingWeighted = weightedEquip.some(e => availableEquipment.includes(e))

  // Filter variants to selected levels (preserve order)
  return selected.slice(0, count).map(ex => {
    const filtered = ex.variants.filter(v => levels.includes(v.level))
    // Weighted exercises: reduce to 1 variant (hardest available) — intensity via weight
    if (usingWeighted && ex.equipment && ex.equipment.some(e => weightedEquip.includes(e))) {
      const order = ['maximum', 'hard', 'medium', 'easy']
      const best = order.map(l => filtered.find(v => v.level === l)).find(Boolean)
      return { ...ex, variants: best ? [best] : filtered.slice(0, 1) }
    }
    return { ...ex, variants: filtered }
  })
}

// Single mode: each exercise gets exactly one variant (round-robin over selected levels)
export function selectExercisesSingle(count, levels = ALL_LEVELS, extraExercises = []) {
  const allExercises = [...EXERCISES, ...extraExercises]
  const activation = allExercises.find(e => e.id === 'dead-bug') || allExercises[0]
  const rest = allExercises.filter(e => e.id !== activation.id)
  const shuffled = shuffle(rest)

  const selected = [activation]
  let lastPattern = activation.pattern
  for (const ex of shuffled) {
    if (selected.length >= count) break
    if (ex.pattern !== lastPattern) { selected.push(ex); lastPattern = ex.pattern }
  }
  for (const ex of shuffled) {
    if (selected.length >= count) break
    if (!selected.find(s => s.id === ex.id)) selected.push(ex)
  }

  return selected.slice(0, count).map((ex, i) => {
    const level = levels[i % levels.length]
    const variant = ex.variants.find(v => v.level === level) || ex.variants.find(v => levels.includes(v.level))
    return { ...ex, variants: variant ? [variant] : [] }
  }).filter(ex => ex.variants.length > 0)
}

export function selectBurnout(levels = ALL_LEVELS) {
  const picked = shuffle(BURNOUT_EXERCISES)[0]
  return { ...picked, variants: picked.variants.filter(v => levels.includes(v.level)) }
}

// Return exercises not in excludeIds (for swapping in preview)
export function getSwapCandidates(excludeIds, extraExercises = []) {
  return [...EXERCISES, ...extraExercises].filter(e => !excludeIds.includes(e.id))
}
