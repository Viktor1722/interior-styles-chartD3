export const fetchEuropeGeoData = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Europe GeoJSON data");
  }
  return response.json();
};
