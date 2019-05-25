<template>
  <div id="map">
    <l-map ref="mainMap" :zoom="zoom" :center="center" @contextmenu="onRightClickMap">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <Point v-for="(point, index) in points" :key="point.lat" :index="index" :point="point"/>
    </l-map>
    <vue-context ref="menuMap">
      <ul>
        <li v-for="option in menuOptions" @click="onClickOption(option.key)">{{option.title}}</li>
      </ul>
    </vue-context>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  import { VueContext } from 'vue-context';
  import Point from './Point';
  import routing from 'leaflet-routing-machine';

  export default {
    name: "ThisMap",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      Point,
      VueContext
    },
    computed: {
      points() {
        // console.log(this.$store.getters.getPoints());
        return this.$store.getters.getPoints;
      }
    },
    methods: {
      onRightClickMap (event) {
        localStorage.rightClickCoordinates = JSON.stringify(event.latlng);
        this.$refs.menuMap.open(event.originalEvent, event.originalEvent.target);
      },
      onClickOption (optionKey) {
        switch (optionKey) {
          case 'addPoint':
            let coordinates = JSON.parse(localStorage.rightClickCoordinates);
            // console.log(`${coordinates.lat}${coordinates.lng}`);
            this.$store.dispatch('addPoint', L.latLng(coordinates.lat, coordinates.lng));
            break;
          case 'createRout':
            // console.log(this.$store.getters.getPoints);
            L.Routing.control({ waypoints: this.$store.getters.getPoints }).addTo(this.$refs.mainMap.mapObject);
            break;
          case 'removeRout':
            console.log(this.$refs.mainMap.mapObject);
            break;
        }
      }
    },
    data(){
      return {
        zoom:13,
        center: L.latLng(47.909898, 33.392257),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(47.908633, 33.375434),
        menuOptions: [
          { key: 'addPoint', title: 'Add point' },
          { key: 'createRout', title: 'Create rout' },
          { key: 'removeRout', title: 'Remove rout' }
        ]
      }
    }
  }
</script>

<style>
  #map {
    height: 100%;
    margin: 0;
  }
</style>
