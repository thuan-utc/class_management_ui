<template>
  <div class="m-datatable" v-if="config">
    <table v-bind:id="config.id" class="table table-striped">
      <thead>
        <tr>
          <th v-for="col in config.dataTable.columns" :key="col.title">{{ col.title }}</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>

export default {
  name: 'data-table',
  props: ['config'],
  data() {
    return {
      table: {}
    }
  },
  methods: {
    initializeDataTable(config) {
      $(document).ready(function () {
        if ($.fn.dataTable.isDataTable('#' + config.id)) {
          this.table = $('#' + config.id).DataTable();
        } else {
          this.table = $('#' + config.id).DataTable(config.dataTable);
          // Attach events
          if (config.events) {
            config.events.forEach(event => {
              if (event.selector) {
                this.table.on(event.event, event.selector, event.handler);
              } else {
                this.table.on(event.event, event.handler);
              }
            });
          }
        }
      })
    }
  },
  watch: {
      config: {
        immediate: true,
        handler: function (config) {
          if (config && config.id && config.dataTable) {
            this.initializeDataTable(config)
          }
        }
      }
    }
}
</script>

<style scoped></style>
