<template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Manage Classrooms</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <data-table :config="tableConfig"></data-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from '@/common/DataTable.vue'
import { test } from '../utils/all-class-room-api'
export default {
  name: 'all-classroom',
  components: {
    DataTable
  },
  data() {
    return {
      isLoading: false,
      showFilter: true,
      tableConfig: null
    }
  },
  methods: {
    toggleShowFilter() {
      this.showFilter = !this.showFilter
      $('#filter').collapse('toggle')
    },
    initTable() {
      this.tableConfig = {
        id: 'classroomTable',
        datatable: {
          orderData: [[0, 'desc']],
          searching: false,
          lengthChange: !1,
          pageLength: 5,
          select: 0,
          scrollX: true,
          scrollY: true,
          scrollY: 200,
          bServerSide: true,
          bProcessing: true,
          aoColumns: [
            { sTitle: 'ID', mData: 'id' },
            { sTitle: 'Name', mData: 'name' },
            { sTitle: 'Phone', mData: 'phone' },
            { sTitle: 'Email', mData: 'email' },
            { sTitle: 'Address', mData: 'address' },
            { sTitle: 'Created Date', mData: 'createdDate' }
          ],
          fnServerData: this.mockData
        }
      }
    },
    mockData(sSource, aoData, fnCallback) {
      let dataContent = [];
      let data = {}
      for (let i = 0; i < 10; i++) {
        dataContent.push({
          id: i + 1,
          name: `Classroom ${i + 1}`,
          phone: `123-456-${i}`,
          email: `classroom${i + 1}@example.com`,
          address: `Address ${i + 1}`,
          createdDate: new Date().toISOString().split('T')[0]
        });
      }
      data.recordsTotal = 10
      data.recordsFiltered = 5
      data.data = dataContent
      fnCallback(data)
    }
  },
  mounted() {
    this.initTable()
  }
}
</script>