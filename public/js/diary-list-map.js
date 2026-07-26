(() => {
  const el = document.querySelector('#diary-map');
  if (!el || !el.dataset.mapboxToken) return;
  mapboxgl.accessToken = el.dataset.mapboxToken;
  const map = new mapboxgl.Map({
    container: el,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 20],
    zoom: 1,
  });
  const markers = JSON.parse(el.dataset.markers || '[]');
  markers.forEach((entry) => {
    const link = document.createElement('a');
    link.href = `/diaries/${encodeURIComponent(entry.id)}`;
    link.textContent = entry.title;
    new mapboxgl.Marker()
      .setLngLat(entry.coordinates)
      .setPopup(new mapboxgl.Popup().setDOMContent(link))
      .addTo(map);
  }); /* TODO(INTERN): FR-007 — Fit bounds and improve accessible marker details per SDD section 8. */
})();
