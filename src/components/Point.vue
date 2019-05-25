<template>
  <div>
    <l-marker :lat-lng="point" @contextmenu="onRightClickPoint"/>
    <vue-context ref="pointMap">
      <ul>
        <li v-for="option in menuOptions" @click="onClickOption(option.key)">{{option.title}}</li>
      </ul>
    </vue-context>
  </div>
</template>

<script>
  import { LMarker } from 'vue2-leaflet';
  import { VueContext } from 'vue-context';

  export default {
    name: "Point",
    components: {
      LMarker,
      VueContext
    },
    props: [
      'index',
      'point'
    ],
    methods: {
      onRightClickPoint (event) {
        this.$refs.pointMap.open(event.originalEvent, event.originalEvent.target);
        event.originalEvent.stopPropagation();
      },
      onClickOption (optionKey) {
        switch (optionKey) {
          case 'delete':
            this.$store.dispatch('deletePoint', this.index);
            break;
        }
      }
    },
    data() {
      return {
        menuOptions: [
          { key: 'delete', title: 'Delete' },
          { key: 'opt2', title: 'option 2' }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
