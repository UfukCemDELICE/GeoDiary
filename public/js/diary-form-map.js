(() => {
  const el = document.querySelector('#form-map');
  if (!el || !el.dataset.mapboxToken) return;
  mapboxgl.accessToken = el.dataset.mapboxToken;
  const lng = document.querySelector('#longitude');
  const lat = document.querySelector('#latitude');
  const existing =
    Number.isFinite(Number(lng.value)) &&
    Number.isFinite(Number(lat.value)) &&
    lng.value !== '' &&
    lat.value !== '';
  const center = existing ? [Number(lng.value), Number(lat.value)] : [0, 20];
  const map = new mapboxgl.Map({
    container: el,
    style: 'mapbox://styles/mapbox/streets-v12',
    center,
    zoom: existing ? 10 : 1,
  });
  let marker = existing ? new mapboxgl.Marker().setLngLat(center).addTo(map) : null;
  map.on('click', ({ lngLat }) => {
    if (!marker) marker = new mapboxgl.Marker();
    marker.setLngLat(lngLat).addTo(map);
    lng.value = lngLat.lng.toFixed(6);
    lat.value = lngLat.lat.toFixed(6);
  });
})();
