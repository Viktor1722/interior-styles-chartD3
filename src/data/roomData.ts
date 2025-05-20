export interface RoomData {
  user: number;
  room: string;
  style: string;
  date: string;
}

export interface SearchVolumeData {
  style: string;
  searches: number;
  ranking: string;
}

export interface CountryStyleData {
  country: string;
  style: string;
}

export const roomData: RoomData[] = [
  { user: 1, room: "Bedroom", style: "Scandinavian", date: "2025-05-01" },
  { user: 2, room: "Living Room", style: "Minimalist", date: "2025-05-02" },
  { user: 3, room: "Kitchen", style: "Industrial", date: "2025-05-02" },
  { user: 4, room: "Bedroom", style: "Boho", date: "2025-05-03" },
  { user: 5, room: "Living Room", style: "Minimalist", date: "2025-05-03" },
  { user: 6, room: "Kitchen", style: "Scandinavian", date: "2025-05-04" },
  { user: 7, room: "Bedroom", style: "Scandinavian", date: "2025-05-04" },
  { user: 8, room: "Living Room", style: "Industrial", date: "2025-05-05" },
  { user: 9, room: "Bedroom", style: "Minimalist", date: "2025-05-05" },
  { user: 10, room: "Kitchen", style: "Boho", date: "2025-05-05" },
  { user: 11, room: "Bedroom", style: "Scandinavian", date: "2025-05-06" },
  { user: 12, room: "Living Room", style: "Scandinavian", date: "2025-05-06" },
  { user: 13, room: "Kitchen", style: "Industrial", date: "2025-05-07" },
  { user: 14, room: "Living Room", style: "Minimalist", date: "2025-05-08" },
  { user: 15, room: "Bedroom", style: "Boho", date: "2025-05-09" },
];

export const searchVolumeData: SearchVolumeData[] = [
  { style: "Vintage", searches: 48560, ranking: "1st" },
  { style: "Industrial", searches: 38710, ranking: "2nd" },
  { style: "Contemporary", searches: 37650, ranking: "3rd" },
  { style: "Scandinavian", searches: 33660, ranking: "4th" },
  { style: "Rustic", searches: 31900, ranking: "5th" },
  { style: "Coastal", searches: 29170, ranking: "6th" },
];

export const countryStyleData: CountryStyleData[] = [
  { country: "Iceland", style: "Contemporary" },
  { country: "Ireland", style: "Luxury" },
  { country: "United Kingdom", style: "Colourful" },
  { country: "Portugal", style: "Minimalist" },
  { country: "Spain", style: "Minimalist" },
  { country: "France", style: "Modern" },
  { country: "Belgium", style: "Scandinavian" },
  { country: "Netherlands", style: "Scandinavian" },
  { country: "Luxembourg", style: "Bauhaus" },
  { country: "Germany", style: "Modern" },
  { country: "Switzerland", style: "Wabi Sabi" },
  { country: "Italy", style: "Luxury" },
  { country: "Austria", style: "Scandinavian" },
  { country: "Czech Republic", style: "Modern" },
  { country: "Slovakia", style: "Scandinavian" },
  { country: "Poland", style: "Boho" },
  { country: "Norway", style: "Scandinavian" },
  { country: "Sweden", style: "Japanese" },
  { country: "Finland", style: "Scandinavian" },
  { country: "Denmark", style: "Scandinavian" },
  { country: "Hungary", style: "Scandinavian" },
  { country: "Slovenia", style: "Art Deco" },
  { country: "Croatia", style: "Modern" },
  { country: "Bosnia and Herzegovina", style: "Modern" },
  { country: "Serbia", style: "Modern" },
  { country: "Montenegro", style: "Contemporary" },
  { country: "Albania", style: "Minimalist" },
  { country: "North Macedonia", style: "Scandinavian" },
  { country: "Greece", style: "Mediterranean" },
  { country: "Bulgaria", style: "Industrial" },
  { country: "Romania", style: "Modern" },
  { country: "Moldova", style: "Art Deco" },
  { country: "Ukraine", style: "Modern" },
  { country: "Belarus", style: "Contemporary" },
  { country: "Lithuania", style: "Modern" },
  { country: "Latvia", style: "Modern" },
  { country: "Estonia", style: "Art Deco" },
  { country: "Turkey", style: "Minimalist" },
];
