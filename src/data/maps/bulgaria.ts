import type { BaseTerritory } from "../territories";

export const BULGARIA_TERRITORIES: BaseTerritory[] = [
  {
    id: "BG-01",
    name: "Blagoevgrad",
    neighbors: [
      "BG-10", // Kjustendil
      "BG-13", // Pazardžik
      "BG-21", // Smoljan
      "BG-23", // Sofijska oblast
    ],
    offset: { x: -1, y: 0 },
  },
  {
    id: "BG-02",
    name: "Burgas",
    neighbors: [
      "BG-03", // Varna
      "BG-20", // Sliven
      "BG-27", // Šumen
      "BG-28", // Jambol
    ],
    offset: { x: -1, y: -1 },
  },
  {
    id: "BG-03",
    name: "Varna",
    neighbors: [
      "BG-02", // Burgas
      "BG-08", // Dobrič
      "BG-27", // Šumen
    ],
    offset: { x: 0.5, y: 0 },
  },
  {
    id: "BG-04",
    name: "Veliko Trnovo",
    neighbors: [
      "BG-07", // Gabrovo
      "BG-11", // Lovec
      "BG-15", // Pleven
      "BG-18", // Ruse
      "BG-20", // Sliven
      "BG-24", // Stara Zagora
      "BG-25", // Trgovište
    ],
    offset: { x: -0.75, y: 0 },
  },
  {
    id: "BG-05",
    name: "Vidin",
    neighbors: [
      "BG-12", // Montana
    ],
    offset: { x: -0.75, y: 0 },
  },
  {
    id: "BG-06",
    name: "Vraca",
    neighbors: [
      "BG-11", // Lovec
      "BG-12", // Montana
      "BG-15", // Pleven
      "BG-23", // Sofijska oblast
    ],
    offset: { x: -1, y: 0 },
  },
  {
    id: "BG-07",
    name: "Gabrovo",
    neighbors: [
      "BG-04", // Veliko Trnovo
      "BG-11", // Lovec
      "BG-24", // Stara Zagora
    ],
    offset: { x: -0.75, y: 0.75 },
  },
  {
    id: "BG-08",
    name: "Dobrič",
    neighbors: [
      "BG-03", // Varna
      "BG-19", // Silistra
      "BG-27", // Šumen
    ],
  },
  {
    id: "BG-09",
    name: "Kardžali",
    neighbors: [
      "BG-16", // Plovdiv
      "BG-21", // Smoljan
      "BG-26", // Haskovo
    ],
    offset: { x: -0.75, y: 0.75 },
  },
  {
    id: "BG-10",
    name: "Kjustendil",
    neighbors: [
      "BG-01", // Blagoevgrad
      "BG-14", // Pernik
      "BG-23", // Sofijska oblast
    ],
    offset: { x: -0.5, y: 3.5 },
  },
  {
    id: "BG-11",
    name: "Lovec",
    neighbors: [
      "BG-04", // Veliko Trnovo
      "BG-06", // Vraca
      "BG-07", // Gabrovo
      "BG-15", // Pleven
      "BG-16", // Plovdiv
      "BG-23", // Sofijska oblast
    ],
    offset: { x: -0.75, y: 0.75 },
  },
  {
    id: "BG-12",
    name: "Montana",
    neighbors: [
      "BG-05", // Vidin
      "BG-06", // Vraca
      "BG-23", // Sofijska oblast
    ],
    offset: { x: -0.75, y: 0 },
  },
  {
    id: "BG-13",
    name: "Pazardžik",
    neighbors: [
      "BG-01", // Blagoevgrad
      "BG-16", // Plovdiv
      "BG-21", // Smoljan
      "BG-23", // Sofijska oblast
    ],
    offset: { x: 0.5, y: 0 },
  },
  {
    id: "BG-14",
    name: "Pernik",
    neighbors: [
      "BG-10", // Kjustendil
      "BG-22", // Sofija - grad
      "BG-23", // Sofijska oblast
    ],
  },
  {
    id: "BG-15",
    name: "Pleven",
    neighbors: [
      "BG-04", // Veliko Trnovo
      "BG-06", // Vraca
      "BG-11", // Lovec
    ],
    offset: { x: 0.75, y: 0 },
  },
  {
    id: "BG-16",
    name: "Plovdiv",
    neighbors: [
      "BG-09", // Kardžali
      "BG-11", // Lovec
      "BG-13", // Pazardžik
      "BG-21", // Smoljan
      "BG-23", // Sofijska oblast
      "BG-24", // Stara Zagora
      "BG-26", // Haskovo
    ],
    offset: { x: -1.25, y: 0 },
  },
  {
    id: "BG-17",
    name: "Razgrad",
    neighbors: [
      "BG-18", // Ruse
      "BG-19", // Silistra
      "BG-25", // Trgovište
      "BG-27", // Šumen
    ],
    offset: { x: 1, y: 2 },
  },
  {
    id: "BG-18",
    name: "Ruse",
    neighbors: [
      "BG-04", // Veliko Trnovo
      "BG-17", // Razgrad
      "BG-19", // Silistra
      "BG-25", // Trgovište
    ],
    offset: { x: -2, y: 2.75 },
  },
  {
    id: "BG-19",
    name: "Silistra",
    neighbors: [
      "BG-08", // Dobrič
      "BG-17", // Razgrad
      "BG-18", // Ruse
      "BG-27", // Šumen
    ],
    offset: { x: 0, y: -1.25 },
  },
  {
    id: "BG-20",
    name: "Sliven",
    neighbors: [
      "BG-02", // Burgas
      "BG-04", // Veliko Trnovo
      "BG-24", // Stara Zagora
      "BG-25", // Trgovište
      "BG-27", // Šumen
      "BG-28", // Jambol
    ],
    offset: { x: 0, y: -2 },
  },
  {
    id: "BG-21",
    name: "Smoljan",
    neighbors: [
      "BG-01", // Blagoevgrad
      "BG-09", // Kardžali
      "BG-13", // Pazardžik
      "BG-16", // Plovdiv
    ],
    offset: { x: 0, y: -1.25 },
  },
  {
    id: "BG-22",
    name: "Sofija - grad",
    neighbors: [
      "BG-14", // Pernik
      "BG-23", // Sofijska oblast
    ],
    offset: { x: 0, y: 0 },
  },
  {
    id: "BG-23",
    name: "Sofijska oblast",
    neighbors: [
      "BG-01", // Blagoevgrad
      "BG-06", // Vraca
      "BG-10", // Kjustendil
      "BG-11", // Lovec
      "BG-12", // Montana
      "BG-13", // Pazardžik
      "BG-14", // Pernik
      "BG-16", // Plovdiv
      "BG-22", // Sofija - grad
    ],
    offset: { x: 4, y: -2 },
  },
  {
    id: "BG-24",
    name: "Stara Zagora",
    neighbors: [
      "BG-04", // Veliko Trnovo
      "BG-07", // Gabrovo
      "BG-16", // Plovdiv
      "BG-20", // Sliven
      "BG-26", // Haskovo
      "BG-28", // Jambol
    ],
    offset: { x: -1, y: -1 },
  },
  {
    id: "BG-25",
    name: "Trgovište",
    neighbors: [
      "BG-04", // Veliko Trnovo
      "BG-17", // Razgrad
      "BG-18", // Ruse
      "BG-20", // Sliven
      "BG-27", // Šumen
    ],
    offset: { x: 0, y: 3 },
  },
  {
    id: "BG-26",
    name: "Haskovo",
    neighbors: [
      "BG-09", // Kardžali
      "BG-16", // Plovdiv
      "BG-24", // Stara Zagora
      "BG-28", // Jambol
    ],
    offset: { x: 0, y: -2.75 },
  },
  {
    id: "BG-27",
    name: "Šumen",
    neighbors: [
      "BG-02", // Burgas
      "BG-03", // Varna
      "BG-08", // Dobrič
      "BG-17", // Razgrad
      "BG-19", // Silistra
      "BG-20", // Sliven
      "BG-25", // Trgovište
    ],
    offset: { x: 0.5, y: 0 },
  },
  {
    id: "BG-28",
    name: "Jambol",
    neighbors: [
      "BG-02", // Burgas
      "BG-20", // Sliven
      "BG-24", // Stara Zagora
      "BG-26", // Haskovo
    ],
  },
];
