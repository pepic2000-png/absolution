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
export function selectExercises(count, levels = ALL_LEVELS) {
  const activation = EXERCISES.find(e => e.id === 'dead-bug')
  const rest = EXERCISES.filter(e => e.id !== 'dead-bug')
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

  // Filter variants to selected levels (preserve order)
  return selected.slice(0, count).map(ex => ({
    ...ex,
    variants: ex.variants.filter(v => levels.includes(v.level)),
  }))
}

export function selectBurnout(levels = ALL_LEVELS) {
  const picked = shuffle(BURNOUT_EXERCISES)[0]
  return { ...picked, variants: picked.variants.filter(v => levels.includes(v.level)) }
}

// Return exercises not in excludeIds (for swapping in preview)
export function getSwapCandidates(excludeIds) {
  return EXERCISES.filter(e => !excludeIds.includes(e.id))
}
