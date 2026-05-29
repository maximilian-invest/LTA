export type Feature = {
  icon: FeatureIconName;
  title: string;
  note: string;
  clay?: boolean;
};

export type FeatureIconName =
  | "sun"
  | "warehouse"
  | "dumbbell"
  | "shower-head"
  | "tent"
  | "snowflake"
  | "waves"
  | "users-round"
  | "badge-euro"
  | "goal"
  | "mountain"
  | "layout-grid"
  | "lightbulb"
  | "calendar-range"
  | "handshake";

export type LocationStat = {
  value: string;
  label: string;
  isEuro?: boolean;
};

export type Location = {
  id: string;
  index: string;
  name: string;
  city: string;
  eyebrow: string;
  season: string;
  seasonShort: string;
  tagline: string;
  blurb: string;
  photo: string;
  photoAlt: string;
  address: string[];
  mapsQuery: string;
  coords: { x: number; y: number };
  features: Feature[];
  stats: LocationStat[];
};

export const LOCATIONS: Location[] = [
  {
    id: "hallein",
    index: "01",
    name: "1. Halleiner Tennisclub",
    city: "Hallein",
    eyebrow: "Heim­anlage · Ganzjährig",
    season: "Sommer + Winter",
    seasonShort: "12 Monate",
    tagline:
      "Sand draußen, Teppich-Granulat drinnen — die einzige Anlage im Tennengau, auf der du das ganze Jahr durchtrainierst.",
    blurb:
      "Unsere Heimat. Fünf Outdoor-Sand­plätze für die warme Saison, drei moderne Teppich-Granulat-Hallen­plätze für Herbst und Winter. Kraftkammer, neue Umkleiden und der Stützpunkt der LTA-Tenniscamps — alles an einem Ort, keine Trainings­pause.",
    photo: "/assets/photo-court-hallein.avif",
    photoAlt:
      "Fünf rote Sandplätze des 1. Halleiner Tennisclubs an einem sonnigen Sommertag",
    address: [
      "Tennisanlage Hallein",
      "Neualmer Straße, 5400 Hallein",
      "Salzburg, Österreich",
    ],
    mapsQuery: "1.+Halleiner+Tennisclub+Hallein",
    coords: { x: 50, y: 26 },
    features: [
      { icon: "sun", title: "5 Sand­plätze", note: "Outdoor · Frühling – Herbst", clay: true },
      { icon: "warehouse", title: "3 Hallen­plätze", note: "Teppich-Granulat · ganzjährig" },
      { icon: "dumbbell", title: "Kraftkammer", note: "Athletik & Reha vor Ort" },
      { icon: "shower-head", title: "Umkleiden", note: "Modern · Sanitär neu" },
      { icon: "tent", title: "Camp-Stützpunkt", note: "Koop. mit Soccer Academy" },
      { icon: "snowflake", title: "Winter­training", note: "Keine Saison­pause" },
    ],
    stats: [
      { value: "8", label: "Plätze gesamt" },
      { value: "12", label: "Monate Saison" },
    ],
  },
  {
    id: "kuchl",
    index: "02",
    name: "TC Kuchl",
    city: "Kuchl",
    eyebrow: "Sommer · am Bürgerausee",
    season: "Sommer",
    seasonShort: "Apr – Okt",
    tagline:
      "Tennis direkt am See, mit Bergpanorama — und für alle unter 18 dank Gemeinde-Förderung kostenlos.",
    blurb:
      "Direkt am Bürgerausee und neben der Fußball­anlage gelegen — einer der schönsten Trainings­orte der Region. Das Kinder- und Jugend­training organisieren wir gemeinsam mit der Tennisschule Rosenkranz. Dank Förderung der Gemeinde Kuchl nutzen alle unter 18 die Anlage gratis.",
    photo: "/assets/photo-court-kuchl.avif",
    photoAlt:
      "Tennisplatz des TC Kuchl mit schneebedecktem Bergpanorama im Hintergrund",
    address: [
      "TC Kuchl — am Bürgerausee",
      "Sportzentrum, 5431 Kuchl",
      "Salzburg, Österreich",
    ],
    mapsQuery: "TC+Kuchl+B%C3%BCrgerausee",
    coords: { x: 38, y: 70 },
    features: [
      { icon: "waves", title: "Lage am See", note: "Direkt am Bürgerausee" },
      { icon: "users-round", title: "Jugend­training", note: "mit TS Rosenkranz" },
      { icon: "badge-euro", title: "Gratis U18", note: "Gemeinde-Förderung" },
      { icon: "goal", title: "Fußball­anlage", note: "Direkt benachbart" },
      { icon: "mountain", title: "Bergpanorama", note: "Training im Grünen" },
      { icon: "sun", title: "Sand­plätze", note: "Sommer-Saison", clay: true },
    ],
    stats: [
      { value: "0", label: "€ für alle U18", isEuro: true },
      { value: "100%", label: "am Wasser" },
    ],
  },
  {
    id: "vigaun",
    index: "03",
    name: "UTC Bad Vigaun",
    city: "Bad Vigaun",
    eyebrow: "Sommer · Allcourt mit Flutlicht",
    season: "Feb – Nov",
    seasonShort: "Feb – Nov",
    tagline:
      "Drei Allcourt-Plätze mit Flutlicht — wir betreuen die Anlage über die lange Sommer­saison.",
    blurb:
      "Unser dritter Partner­verein, den wir über den Sommer betreuen. Drei moderne Allcourt-Plätze inklusive Flutlicht ermöglichen Trainings­betrieb von Februar bis November — auch am Abend, wenn andere Anlagen längst dunkel sind.",
    photo: "/assets/photo-court-vigaun.avif",
    photoAlt: "Moderne rote Allcourt-Plätze der Anlage in Bad Vigaun",
    address: [
      "UTC Bad Vigaun",
      "Sportplatzweg, 5424 Bad Vigaun",
      "Salzburg, Österreich",
    ],
    mapsQuery: "UTC+Bad+Vigaun",
    coords: { x: 66, y: 54 },
    features: [
      { icon: "layout-grid", title: "3 Allcourt", note: "Moderner Belag" },
      { icon: "lightbulb", title: "Flutlicht", note: "Training bis spät" },
      { icon: "calendar-range", title: "Lange Saison", note: "Februar – November" },
      { icon: "handshake", title: "Partner­verein", note: "Betreuung im Sommer" },
    ],
    stats: [
      { value: "3", label: "Allcourt-Plätze" },
      { value: "10", label: "Monate offen" },
    ],
  },
];
