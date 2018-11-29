<template>
  <div class="test-component" :class="{disabled}">
    <div class="header" @click="count++">{{ header }}</div>
    <div class="footer" @click="count--">{{ footer }}</div>
    <div class="emit" @click="emit">emit</div>
    <div class="count">{{ count }}</div>
    <div class="fetch" @click="fetch"></div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: ''
    },
    footer: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    /** 测试 $emit */
    emit () {
      this.$emit('click', 'test')
    },
    /** 测试异步 */
    fetch () {
      return new Promise((resolve, reject) => {
        this.count = 100
        resolve()
      })
    }
  }
}
</script>