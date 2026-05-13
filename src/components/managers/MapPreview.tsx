export function MapPreview() {
  return (
    <div className="w-full h-40 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100">
      <iframe
        title="map-preview"
        src="https://www.openstreetmap.org/export/embed.html?bbox=7.3,46.9,7.6,47.1&layer=mapnik"
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>
  )
}
