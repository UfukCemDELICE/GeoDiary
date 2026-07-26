(() => {
  const el = document.querySelector('#diary-map');
  if (!el || !el.dataset.mapboxToken) return;
  mapboxgl.accessToken = el.dataset.mapboxToken;

  const PANEL_WIDTH = 320;
  const panel = document.getElementById('map-panel');
  const detailBack = document.getElementById('detail-back');
  const detailTitle = document.getElementById('detail-title');
  const detailDate = document.getElementById('detail-date');
  const detailLocationWrap = document.getElementById('detail-location-wrap');
  const detailLocation = document.getElementById('detail-location');
  const detailContent = document.getElementById('detail-content');
  const detailEditLink = document.getElementById('detail-edit-link');
  const detailDeleteForm = document.getElementById('detail-delete-form');

  const map = new mapboxgl.Map({
    container: el,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 20],
    zoom: 1,
  });
  window._mapInstance = map;
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // ── Panel state ──────────────────────────────────────────────
  function showDetail(entry) {
    detailTitle.textContent = entry.title;
    detailDate.textContent = new Date(entry.diaryDate).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    if (entry.locationName) {
      detailLocationWrap.classList.remove('hidden');
      detailLocation.textContent = entry.locationName;
    } else {
      detailLocationWrap.classList.add('hidden');
    }
    detailContent.textContent = entry.content || 'No story written yet.';
    detailEditLink.href = `/diaries/${entry.id}/edit`;
    if (detailDeleteForm) detailDeleteForm.action = `/diaries/${entry.id}?_method=DELETE`;
    panel.classList.add('show-detail');
  }

  function showList() {
    panel.classList.remove('show-detail');
  }

  detailBack && detailBack.addEventListener('click', showList);

  // ── Markers ──────────────────────────────────────────────────
  const markers = JSON.parse(el.dataset.markers || '[]');
  const markerInstances = {};

  map.on('load', () => {
    if (markers.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();

    markers.forEach((entry) => {
      bounds.extend(entry.coordinates);

      // Custom marker element — NO CSS transitions (they fight Mapbox's transform positioning)
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.title = entry.title;
      dot.style.cssText = [
        'width:32px', 'height:32px',
        'background:#003629', 'border:3px solid #fff',
        'border-radius:50%', 'cursor:pointer',
        'box-shadow:0 2px 8px rgba(0,54,41,0.35)',
        'display:flex', 'align-items:center', 'justify-content:center',
        'outline:none',
      ].join(';');
      dot.innerHTML = `<span style="font-family:'Material Symbols Outlined';font-size:14px;color:#fff;font-variation-settings:'FILL' 1;">location_on</span>`;

      dot.addEventListener('mouseenter', () => {
        dot.style.width = '38px';
        dot.style.height = '38px';
        dot.style.boxShadow = '0 4px 16px rgba(0,54,41,0.45)';
      });
      dot.addEventListener('mouseleave', () => {
        dot.style.width = '32px';
        dot.style.height = '32px';
        dot.style.boxShadow = '0 2px 8px rgba(0,54,41,0.35)';
      });

      dot.addEventListener('click', (e) => {
        // Stop the map canvas click from also firing (which would close the detail)
        e.stopPropagation();
        map.flyTo({ center: entry.coordinates, zoom: 13, duration: 600 });
        showDetail(entry);
        // Reset all markers then highlight this one
        Object.values(markerInstances).forEach((m) => {
          m.el.style.background = '#003629';
        });
        dot.style.background = '#735c00';
      });

      const marker = new mapboxgl.Marker({ element: dot })
        .setLngLat(entry.coordinates)
        .addTo(map);
      markerInstances[entry.id] = { marker, el: dot };
    });

    if (markers.length === 1) {
      map.setCenter(markers[0].coordinates);
      map.setZoom(12);
    } else {
      map.fitBounds(bounds, {
        padding: { top: 60, bottom: 60, left: 60, right: PANEL_WIDTH + 60 },
        maxZoom: 14,
      });
    }
  });

  // ── Entry row clicks in the list panel ───────────────────────
  document.querySelectorAll('.entry-row').forEach((row) => {
    row.addEventListener('click', () => {
      const entry = {
        id: row.dataset.entryId,
        title: row.dataset.entryTitle,
        diaryDate: row.dataset.entryDate,
        locationName: row.dataset.entryLocation,
        content: row.dataset.entryContent,
        coordinates: [parseFloat(row.dataset.lng), parseFloat(row.dataset.lat)],
      };
      map.flyTo({ center: entry.coordinates, zoom: 13, duration: 600 });
      showDetail(entry);
      // Highlight marker
      Object.values(markerInstances).forEach((m) => {
        m.el.style.background = '#003629';
      });
      if (markerInstances[entry.id]) {
        markerInstances[entry.id].el.style.background = '#735c00';
      }
    });
  });

  // Close detail when clicking on the map canvas
  map.on('click', () => {
    if (panel.classList.contains('show-detail')) showList();
  });
})();
