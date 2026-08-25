import type { BaseTerritory } from "../territories";

export const SERBIA_TERRITORIES: BaseTerritory[] = [
  {
    id: "RS-00",
    name: "Beograd",
    neighbors: [
      "RS-02", // Srednjebanatski okrug
      "RS-04", // Južnobanatski okrug
      "RS-07", // Sremski okrug
      "RS-08", // Mačvanski okrug
      "RS-09", // Kolubarski okrug
      "RS-10", // Podunavski okrug
      "RS-12", // Šumadijski okrug
    ],
  },
  {
    id: "RS-01",
    name: "Severnobački okrug",
    neighbors: [
      "RS-03", // Severnobanatski okrug
      "RS-05", // Zapadnobački okrug
      "RS-06", // Južnobački okrug
    ],
  },
  {
    id: "RS-02",
    name: "Srednjebanatski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-03", // Severnobanatski okrug
      "RS-04", // Južnobanatski okrug
      "RS-06", // Južnobački okrug
      "RS-07", // Sremski okrug
    ],
  },
  {
    id: "RS-03",
    name: "Severnobanatski okrug",
    neighbors: [
      "RS-01", // Severnobački okrug
      "RS-02", // Srednjebanatski okrug
      "RS-06", // Južnobački okrug
    ],
    offset: { x: -2, y: -1 },
  },
  {
    id: "RS-04",
    name: "Južnobanatski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-02", // Srednjebanatski okrug
      "RS-10", // Podunavski okrug
      "RS-11", // Braničevski okrug
    ],
  },
  {
    id: "RS-05",
    name: "Zapadnobački okrug",
    neighbors: [
      "RS-01", // Severnobački okrug
      "RS-06", // Južnobački okrug
    ],
    offset: { x: -1, y: 0 },
  },
  {
    id: "RS-06",
    name: "Južnobački okrug",
    neighbors: [
      "RS-01", // Severnobački okrug
      "RS-02", // Srednjebanatski okrug
      "RS-03", // Severnobanatski okrug
      "RS-05", // Zapadnobački okrug
      "RS-07", // Sremski okrug
    ],
    offset: { x: 1, y: 1 },
  },
  {
    id: "RS-07",
    name: "Sremski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-02", // Srednjebanatski okrug
      "RS-06", // Južnobački okrug
      "RS-08", // Mačvanski okrug
    ],
    offset: { x: 1, y: -2.5 },
  },
  {
    id: "RS-08",
    name: "Mačvanski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-07", // Sremski okrug
      "RS-09", // Kolubarski okrug
      "RS-16", // Zlatiborski okrug
    ],
    offset: { x: -1, y: -2.5 },
  },
  {
    id: "RS-09",
    name: "Kolubarski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-08", // Mačvanski okrug
      "RS-12", // Šumadijski okrug
      "RS-16", // Zlatiborski okrug
      "RS-17", // Moravički okrug
    ],
    offset: { x: 0, y: 1 },
  },
  {
    id: "RS-10",
    name: "Podunavski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-04", // Južnobanatski okrug
      "RS-11", // Braničevski okrug
      "RS-12", // Šumadijski okrug
      "RS-13", // Pomoravski okrug
    ],
    offset: { x: 0.6, y: 0 },
  },
  {
    id: "RS-11",
    name: "Braničevski okrug",
    neighbors: [
      "RS-04", // Južnobanatski okrug
      "RS-10", // Podunavski okrug
      "RS-13", // Pomoravski okrug
      "RS-14", // Borski okrug
    ],
  },
  {
    id: "RS-12",
    name: "Šumadijski okrug",
    neighbors: [
      "RS-00", // Beograd
      "RS-09", // Kolubarski okrug
      "RS-10", // Podunavski okrug
      "RS-13", // Pomoravski okrug
      "RS-17", // Moravički okrug
      "RS-18", // Raški okrug
    ],
    offset: { x: 1.5, y: 0.5 },
  },
  {
    id: "RS-13",
    name: "Pomoravski okrug",
    neighbors: [
      "RS-10", // Podunavski okrug
      "RS-11", // Braničevski okrug
      "RS-12", // Šumadijski okrug
      "RS-14", // Borski okrug
      "RS-15", // Zaječarski okrug
      "RS-18", // Raški okrug
      "RS-19", // Rasinski okrug
      "RS-20", // Nišavski okrug
    ],
  },
  {
    id: "RS-14",
    name: "Borski okrug",
    neighbors: [
      "RS-11", // Braničevski okrug
      "RS-13", // Pomoravski okrug
      "RS-15", // Zaječarski okrug
    ],
  },
  {
    id: "RS-15",
    name: "Zaječarski okrug",
    neighbors: [
      "RS-13", // Pomoravski okrug
      "RS-14", // Borski okrug
      "RS-20", // Nišavski okrug
      "RS-22", // Pirotski okrug
    ],
    offset: { x: -2, y: 0 },
  },
  {
    id: "RS-16",
    name: "Zlatiborski okrug",
    neighbors: [
      "RS-08", // Mačvanski okrug
      "RS-09", // Kolubarski okrug
      "RS-17", // Moravički okrug
      "RS-18", // Raški okrug
    ],
    offset: { x: -1, y: 0 },
  },
  {
    id: "RS-17",
    name: "Moravički okrug",
    neighbors: [
      "RS-09", // Kolubarski okrug
      "RS-12", // Šumadijski okrug
      "RS-16", // Zlatiborski okrug
      "RS-18", // Raški okrug
    ],
    offset: { x: 0.5, y: -2 },
  },
  {
    id: "RS-18",
    name: "Raški okrug",
    neighbors: [
      "RS-12", // Šumadijski okrug
      "RS-13", // Pomoravski okrug
      "RS-16", // Zlatiborski okrug
      "RS-17", // Moravički okrug
      "RS-19", // Rasinski okrug
      "RS-26", // Pećki okrug
      "RS-28", // Kosovsko-Mitrovački okrug
    ],
    offset: { x: 2, y: 0 },
  },
  {
    id: "RS-19",
    name: "Rasinski okrug",
    neighbors: [
      "RS-13", // Pomoravski okrug
      "RS-18", // Raški okrug
      "RS-20", // Nišavski okrug
      "RS-21", // Toplički okrug
      "RS-28", // Kosovsko-Mitrovački okrug
    ],
    offset: { x: 0, y: -2 },
  },
  {
    id: "RS-20",
    name: "Nišavski okrug",
    neighbors: [
      "RS-13", // Pomoravski okrug
      "RS-15", // Zaječarski okrug
      "RS-19", // Rasinski okrug
      "RS-21", // Toplički okrug
      "RS-22", // Pirotski okrug
      "RS-23", // Jablanički okrug
    ],
    offset: { x: 0, y: 1 },
  },
  {
    id: "RS-21",
    name: "Toplički okrug",
    neighbors: [
      "RS-19", // Rasinski okrug
      "RS-20", // Nišavski okrug
      "RS-23", // Jablanički okrug
      "RS-25", // Kosovski okrug
      "RS-28", // Kosovsko-Mitrovački okrug
    ],
    offset: { x: 0, y: -1 },
  },
  {
    id: "RS-22",
    name: "Pirotski okrug",
    neighbors: [
      "RS-15", // Zaječarski okrug
      "RS-20", // Nišavski okrug
      "RS-23", // Jablanički okrug
    ],
  },
  {
    id: "RS-23",
    name: "Jablanički okrug",
    neighbors: [
      "RS-20", // Nišavski okrug
      "RS-21", // Toplički okrug
      "RS-22", // Pirotski okrug
      "RS-24", // Pčinjski okrug
      "RS-25", // Kosovski okrug
      "RS-29", // Kosovsko-Pomoravski okrug
    ],
    offset: { x: -2, y: -1 },
  },
  {
    id: "RS-24",
    name: "Pčinjski okrug",
    neighbors: [
      "RS-23", // Jablanički okrug
      "RS-29", // Kosovsko-Pomoravski okrug
    ],
  },
  {
    id: "RS-25",
    name: "Kosovski okrug",
    neighbors: [
      "RS-21", // Toplički okrug
      "RS-23", // Jablanički okrug
      "RS-26", // Pećki okrug
      "RS-27", // Prizrenski okrug
      "RS-28", // Kosovsko-Mitrovački okrug
      "RS-29", // Kosovsko-Pomoravski okrug
    ],
    offset: { x: -0.5, y: 1 },
  },
  {
    id: "RS-26",
    name: "Pećki okrug",
    neighbors: [
      "RS-18", // Raški okrug
      "RS-25", // Kosovski okrug
      "RS-27", // Prizrenski okrug
      "RS-28", // Kosovsko-Mitrovački okrug
    ],
    offset: { x: -1.5, y: -1 },
  },
  {
    id: "RS-27",
    name: "Prizrenski okrug",
    neighbors: [
      "RS-25", // Kosovski okrug
      "RS-26", // Pećki okrug
    ],
    offset: { x: -0.6, y: -2 },
  },
  {
    id: "RS-28",
    name: "Kosovsko-Mitrovački okrug",
    neighbors: [
      "RS-18", // Raški okrug
      "RS-19", // Rasinski okrug
      "RS-21", // Toplički okrug
      "RS-25", // Kosovski okrug
      "RS-26", // Pećki okrug
    ],
    offset: { x: 0.5, y: 0.5 },
  },
  {
    id: "RS-29",
    name: "Kosovsko-Pomoravski okrug",
    neighbors: [
      "RS-23", // Jablanički okrug
      "RS-24", // Pčinjski okrug
      "RS-25", // Kosovski okrug
    ],
    offset: { x: -1.4, y: 0 },
  },
];
