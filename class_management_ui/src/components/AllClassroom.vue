<template>
  <div class="container-fluid">
    <h1 class="display1 h3 mb-2 text-gray-800">Manage Classrooms</h1>

    <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
      <div v-if="isLoading" class="spinner-border" role="status">
        <span v-if="isLoading" class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <!-- <div>
          <button id="toggle" class="btn btn-outline-secondary" @click="toggleShowFilter">
            <i class="mdi mdi-format-vertical-align-center"></i>
            {{ showFilter ? 'Hide' : 'Search' }}</button>
          <div class="search-form collapse" id="filter">
            <form class="form-control">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-3">
                    <label>ID</label>
                    <input type="text" class="form-control search" placeholder="id" v-model="searchId"
                      @input="this.isfirstSearchWithCriteria = true">
                  </div>
                  <div class="col-lg-3">
                    <label>Name</label>
                    <input type="text" class="form-control search" placeholder="name" v-model="searchName"
                      @input="this.isfirstSearchWithCriteria = true">
                  </div>
                  <div class="col-lg-3">
                    <label>Phone</label>
                    <input type="text" class="form-control search" placeholder="phone" v-model="searchPhone"
                      @input="this.isfirstSearchWithCriteria = true">
                  </div>
                  <div class="col-lg-3">
                    <label>Email</label>
                    <input type="text" class="form-control search" placeholder="email" v-model="searchEmail"
                      @input="this.isfirstSearchWithCriteria = true">
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-3">
                    <label>Address</label>
                    <input type="text" class="form-control search" placeholder="address" v-model="searchAddress"
                      @input="this.isfirstSearchWithCriteria = true">
                  </div>
                  <div class="col-lg-3">
                    <label>Created Date</label>
                    <input type="date" class="form-control search" placeholder="date" v-model="searchCreatedDate"
                      @input="this.isfirstSearchWithCriteria = true">
                  </div>
                  <div class="col-lg-1" style="margin-top: 12px;">
                    <button type="" class="btn btn-info" @click.prevent="searchBy">Search</button>
                  </div>
                  <div class="col-lg-1">
                    <button type="reset" style="margin-top: 12px;" class="btn btn-success" @click="reset">Reset</button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div> -->
        <div class='reportTable tab-pane active' id='activeCampaign'>
          <data-table :config="tableConfig"></data-table>
        </div>
        
      </div>

    </div>
  </div>
</template>
<script>
import DataTable from '@/common/DataTable.vue';
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
        dataTable: {
          order: [[0, 'desc']],
          searching: false,
          lengthChange: !1,
          pageLength: 15,
          select: !0,
          scrollX: true,
          columns: [
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'Phone', field: 'phone' },
            { title: 'Email', field: 'email' },
            { title: 'Address', field: 'address' },
            { title: 'Created Date', field: 'createdDate' }
          ],
          sAjaxSource: '',
          bServerSide: true,
          bProcessing: true,
          language: {
            processing: '<div class="spinner-grow spinner-grow-lg text-primary" aria-hidden="false" aria-label="Loading" role="status"/>'
          },
          fnServerData: this.mockData,
          drawCallback: this.initTooltip,
        }
      },
      this.$forceUpdate()
    },
    mockData(sSource, aoData, fnCallback) {
      let data = [];
      data.push
      for (let i = 0; i < 10; i++) {
        data.push({
          id: i + 1,
          name: `Classroom ${i + 1}`,
          phone: `123-456-${i}`,
          email: `classroom${i + 1}@example.com`,
          address: `Address ${i + 1}`,
          createdDate: new Date().toISOString().split('T')[0]
        });
      }
      fnCallback(data)
    }
  },
  mounted() {
    this.initTable()
  }
}
</script>