<template>
  <div>
    <div
      is="header"
      v-for="item in items"
      v-once
      id="uniqueID"
      ref="header"
      :key="item.nn"
      v-model="headerData"
      my-prop="prop"
      @click="functionCall"
      v-text="textContent"
    >
      <div v-if="!visible">
        <img src="http://xxxxx" style="border:1px solid #ccc">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {

  },
  props: {
    value: {
      type: Boolean,
    },
  },
  data () {
    return {
      items: [],
    }
  },
  beforeMount () {
    // ...
  },
  mounted () {
    // ...
  },
  methods: {
  },
}
</script>
<style lang="less">
</style>
