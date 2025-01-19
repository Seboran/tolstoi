<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import * as d3 from 'd3'
import type { Map } from 'leaflet'

interface Country {
  nom: string
  code: string
  lat: number
  lng: number
}

interface TradeFlow {
  from: string
  to: string
  value: number
}

const props = defineProps<{
  matrix: number[][]
  euCountries: Country[]
}>()

const euCountries = props.euCountries

const emit = defineEmits<{
  (e: 'update:matrix', value: number[][]): void
}>()

const tradeFlows = ref<TradeFlow[]>([])
const mapInstance = ref<Map | null>(null)

const zoom = ref(4)
const center = ref([48.0, 7.0]) // Centered more on central Europe

function updateTradeFlows() {
  tradeFlows.value = []
  props.matrix.forEach((row, fromIndex) => {
    row.forEach((value, toIndex) => {
      if (value > 0) {
        tradeFlows.value.push({
          from: euCountries[fromIndex].code,
          to: euCountries[toIndex].code,
          value: value,
        })
      }
    })
  })
  drawArrows()
}

function latLngToPoint(lat: number, lng: number): [number, number] {
  if (!mapInstance.value) return [0, 0]
  const point = mapInstance.value.latLngToLayerPoint([lat, lng])
  return [point.x, point.y]
}

function drawArrows() {
  if (!mapInstance.value) return

  // Create SVG if it doesn't exist
  let svg = d3.select('.trade-flows-overlay svg')
  if (svg.empty()) {
    svg = d3
      .select('.trade-flows-overlay')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

    // Add arrow marker definition
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#ff0000')
  }

  // Clear existing paths
  svg.selectAll('path.flow').remove()

  tradeFlows.value.forEach((flow) => {
    const fromCountry = euCountries.find((c) => c.code === flow.from)
    const toCountry = euCountries.find((c) => c.code === flow.to)

    if (fromCountry && toCountry) {
      const [x1, y1] = latLngToPoint(fromCountry.lat, fromCountry.lng)
      const [x2, y2] = latLngToPoint(toCountry.lat, toCountry.lng)

      svg
        .append('path')
        .attr('class', 'flow')
        .attr('d', `M ${x1} ${y1} L ${x2} ${y2}`)
        .attr('stroke', '#ff0000')
        .attr('stroke-width', Math.log(flow.value / 50) + 1)
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)')
    }
  })
}

function onMapReady(map: Map) {
  mapInstance.value = map
  updateTradeFlows()
}

// Update arrows when map moves
watch([zoom, center], () => {
  if (mapInstance.value) {
    drawArrows()
  }
})

// Watch matrix changes
watch(
  () => props.matrix,
  () => {
    updateTradeFlows()
  },
  { deep: true },
)

onMounted(() => {
  updateTradeFlows()
})
</script>

<template>
  <div class="map-container">
    <l-map
      v-model:zoom="zoom"
      v-model:center="center"
      :use-global-leaflet="false"
      @ready="onMapReady"
      @moveend="drawArrows"
      @zoomend="drawArrows"
    >
      <l-tile-layer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        layer-type="base"
        name="CartoDB Light"
      />

      <l-marker
        v-for="country in euCountries"
        :key="country.code"
        :lat-lng="[country.lat, country.lng]"
      >
        <l-popup>{{ country.nom }}</l-popup>
      </l-marker>

      <div class="trade-flows-overlay">
        <!-- SVG will be added here by D3 -->
      </div>
    </l-map>
  </div>
</template>

<style scoped>
.map-container {
  height: 33rem;
  width: 100%;
  position: relative;
}

.matrix-input {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

table {
  border-collapse: collapse;
}

td,
th {
  padding: 5px;
  border: 1px solid #ddd;
}

input {
  width: 60px;
}

.trade-flows-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.trade-flows-overlay svg {
  width: 100%;
  height: 100%;
}
</style>
