(() => {
  const el = document.querySelector('#form-map');
  if (!el || !el.dataset.mapboxToken) return;
  mapboxgl.accessToken = el.dataset.mapboxToken;

  const lng = document.querySelector('#longitude');
  const lat = document.querySelector('#latitude');
  const coordStatus = document.querySelector('#coord-status');
  const coordText = document.querySelector('#coord-text');

  function updateCoordStatus(lngVal, latVal) {
    if (!coordStatus || !coordText) return;
    const set = lngVal !== '' && latVal !== '';
    if (set) {
      coordStatus.className =
        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all bg-primary/10 text-primary';
      coordText.textContent = `Pin set at (${parseFloat(lngVal).toFixed(4)}, ${parseFloat(latVal).toFixed(4)})`;
      coordStatus.querySelector('.material-symbols-outlined').textContent = 'check_circle';
    } else {
      coordStatus.className =
        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all bg-error-container/40 text-error border border-error/20';
      coordText.textContent = 'Click the map to set a location pin';
      coordStatus.querySelector('.material-symbols-outlined').textContent = 'warning';
    }
  }

  const existing =
    lng.value !== '' &&
    lat.value !== '' &&
    Number.isFinite(Number(lng.value)) &&
    Number.isFinite(Number(lat.value));

  const center = existing ? [Number(lng.value), Number(lat.value)] : [0, 20];

  const map = new mapboxgl.Map({
    container: el,
    style: 'mapbox://styles/mapbox/streets-v12',
    center,
    zoom: existing ? 10 : 1,
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  let marker = null;

  map.on('load', () => {
    if (existing) {
      marker = new mapboxgl.Marker({ color: '#003629' }).setLngLat(center).addTo(map);
    }
    updateCoordStatus(lng.value, lat.value);
  });

  map.on('click', ({ lngLat }) => {
    if (!marker) {
      marker = new mapboxgl.Marker({ color: '#003629' });
    }
    marker.setLngLat(lngLat).addTo(map);
    lng.value = lngLat.lng.toFixed(6);
    lat.value = lngLat.lat.toFixed(6);
    updateCoordStatus(lng.value, lat.value);
  });
})();
