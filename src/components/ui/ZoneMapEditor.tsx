'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

export interface LatLng {
  lat: number
  lng: number
}

interface ZoneMapEditorProps {
  polygon?: LatLng[]
  onChange?: (polygon: LatLng[]) => void
  readOnly?: boolean
}

export default function ZoneMapEditor({ polygon, onChange, readOnly = false }: ZoneMapEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((containerRef.current as any)._leaflet_id) return

    let cancelled = false

    async function init() {
      const L = (await import('leaflet')).default
      await import('leaflet-draw')

      // Bail out if the effect was cleaned up while awaiting imports
      if (cancelled || !containerRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((containerRef.current as any)._leaflet_id) return

      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(containerRef.current, {
        center: [52.52, 13.405],
        zoom: 9,
        zoomControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Donnée cartographiques © 2026 GeoBase DE-BKG (©2009) GeoBa',
      }).addTo(map)

      // Zoom controls bottom-left
      L.control.zoom({ position: 'bottomleft' }).addTo(map)

      mapRef.current = map

      const drawnItems = new L.FeatureGroup()
      map.addLayer(drawnItems)

      if (!readOnly) {
        const drawControl = new (L as unknown as { Control: { Draw: new (opts: unknown) => L.Control } }).Control.Draw({
          position: 'topleft',
          draw: {
            polygon: {
              shapeOptions: { color: '#EAB308', fillColor: '#EAB308', fillOpacity: 0.2 },
            },
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          },
          edit: {
            featureGroup: drawnItems,
          },
        })
        map.addControl(drawControl)

        map.on(L.Draw.Event.CREATED, (e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const layer = (e as any).layer
          drawnItems.addLayer(layer)
          if (onChange && layer instanceof L.Polygon) {
            const latlngs = layer.getLatLngs()[0] as L.LatLng[]
            onChange(latlngs.map((ll) => ({ lat: ll.lat, lng: ll.lng })))
          }
        })

        map.on(L.Draw.Event.EDITED, (e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const layers = (e as any).layers as L.LayerGroup
          layers.eachLayer((layer) => {
            if (onChange && layer instanceof L.Polygon) {
              const latlngs = layer.getLatLngs()[0] as L.LatLng[]
              onChange(latlngs.map((ll) => ({ lat: ll.lat, lng: ll.lng })))
            }
          })
        })
      }

      // Draw initial polygon if provided
      if (polygon && polygon.length > 0) {
        const poly = L.polygon(polygon.map((p) => [p.lat, p.lng]), {
          color: '#EAB308',
          fillColor: '#EAB308',
          fillOpacity: 0.2,
        })
        drawnItems.addLayer(poly)
        map.fitBounds(poly.getBounds())
      }
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-72 w-full rounded-lg overflow-hidden border border-neutral-300"
    />
  )
}
