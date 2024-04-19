<template>
  <div class='m-datatable' v-if="config">
      <table v-bind:id='config.id' 
      class="table table-striped table-hover table-bordered" width="100%" cellspacing="0">
          <thead>
              <tr>
                  <th v-for="col in config.datatable.aoColumns" :key="col.sTitle">{{col.sTitle}}</th>
              </tr>
          </thead>
      </table>
  </div>
</template>

<script>

export default {
  name: 'data-table',
  props: ['config'],
  data () {
    return {
      table: {}
    }
  },
  methods: {
    setupDatatable (config) {
      $(document).ready(function () {
        if ($.fn.dataTable.isDataTable('#' + config.id)) {
          this.table = $('#' + config.id).DataTable()
        } else {
          this.table = $('#' + config.id).DataTable(config.datatable)
          if (config.events) {
            for (let ev of config.events) {
              if (ev.selector) {
                this.table.on(ev.event, ev.selector, ev.handler)
              } else {
                this.table.on(ev.event, ev.handler)
              }
            }
          }
        }
      })
    }
  },
  watch: {
    config: {
      immediate: true,
      handler: function (config) {
        if (config && config.id && config.datatable) {
          this.setupDatatable(config)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
