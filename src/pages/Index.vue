<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :rows="users"
        :columns="columns"
        :loading="loading"
        row-key="username"
      >
        <template v-slot:top>
          <div class="row items-center col-8 q-gutter-xs">
            <div class="col-xs-12 col-md-6 col-lg-6">
              <q-input
                v-model="filter"
                placeholder="Search Keyword"
                class="q-pr-md"
                v-on:keyup.enter="searchByKeyword"
              >
                <template v-slot:prepend>
                  <q-icon name="search" @click="searchByKeyword" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 col-lg-2">
              <q-btn-dropdown color="primary" label="Filter" size="md">
                <q-list>
                  <q-item
                    clickable
                    v-model="users"
                    v-close-popup
                    @click="filterByGenderMale"
                  >
                    <q-item-section>
                      <q-item-label>Male</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    v-model="users"
                    v-close-popup
                    @click="filterByGenderFemale"
                  >
                    <q-item-section>
                      <q-item-label>Female</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="col-xs-12 col-md-2 col-lg-2">
              <q-btn
                color="primary"
                label="Reset Filter"
                @click="resetFilter"
                size="md"
              />
            </div>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import ApiService from "../libs/api/api";
import moment from "moment";

export default {
  name: "DataTableRandomUser",
  data() {
    return {
      columns: [
        {
          name: "username",
          label: "Username",
          align: "center",
          field: "username",
          sortable: true,
        },
        {
          name: "name",
          label: "Name",
          align: "center",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          align: "center",
          field: "email",
          sortable: true,
        },
        {
          name: "gender",
          label: "Gender",
          align: "center",
          field: "gender",
          sortable: true,
        },
        {
          name: "registeredDate",
          label: "RegisteredDate",
          align: "center",
          field: "registeredDate",
          sortable: true,
        },
      ],
      users: [],
      loading: ref(true),
      filter: null,
      male: false,
      female: false,
    };
  },
  mounted() {
    this.fetchDataFirstLoad();
  },
  methods: {
    async searchByKeyword() {
      const Service = await ApiService.getInstance(this);

      try {
        this.users = [];
        this.loading = ref(true);

        const response = await Service.getDataSearchByKeyword(this.filter);

        if (Array.isArray(response.results) && response.results.length > 0) {
          response.results.forEach((data) => {
            this.users.push({
              username: data.login.username,
              name: `${data.name.first} ${data.name.last}`,
              email: data.email,
              gender: data.gender,
              registeredDate: moment(data.registered.date).format(
                "DD-MM-YYY HH:MM"
              ),
            });
          });

          if (Array.isArray(this.users) && this.users.length > 0) {
            this.loading = ref(false);
          }
        }
      } catch (err) {
        setTimeout(() => {
          this.$q.notify({
            type: "negative",
            message:
              err.error == "" || err.error == null ? err.toString() : err.error,
            position: "top-right",
          });
        }, 2000);
        this.loading = ref(false);
      }
    },
    async fetchDataFirstLoad() {
      const Service = await ApiService.getInstance(this);

      try {
        this.users = [];
        this.loading = ref(true);

        const response = await Service.getFirstLoad();

        if (Array.isArray(response.results) && response.results.length > 0) {
          response.results.forEach((data) => {
            this.users.push({
              username: data.login.username,
              name: `${data.name.first} ${data.name.last}`,
              email: data.email,
              gender: data.gender,
              registeredDate: moment(data.registered.date).format(
                "DD-MM-YYY HH:MM"
              ),
            });
          });

          if (Array.isArray(this.users) && this.users.length > 0) {
            this.loading = ref(false);
          }
        }
      } catch (err) {
        setTimeout(() => {
          this.$q.notify({
            type: "negative",
            message:
              err.error == "" || err.error == null ? err.toString() : err.error,
            position: "top-right",
          });
        }, 2000);
        this.loading = ref(false);
      }
    },
    async filterByGenderMale() {
      const Service = await ApiService.getInstance(this);

      try {
        this.users = [];
        this.loading = ref(true);

        const response = await Service.getDataByGenderMale();
        if (Array.isArray(response.results) && response.results.length > 0) {
          response.results.forEach((data) => {
            this.users.push({
              username: data.login.username,
              name: `${data.name.first} ${data.name.last}`,
              email: data.email,
              gender: data.gender,
              registeredDate: moment(data.registered.date).format(
                "DD-MM-YYY HH:MM"
              ),
            });
          });

          if (Array.isArray(this.users) && this.users.length > 0) {
            this.loading = ref(false);
          }
        }
      } catch (err) {
        setTimeout(() => {
          this.$q.notify({
            type: "negative",
            message:
              err.error == "" || err.error == null ? err.toString() : err.error,
            position: "top-right",
          });
        }, 2000);
        this.loading = ref(false);
      }
    },
    async filterByGenderFemale() {
      const Service = await ApiService.getInstance(this);

      try {
        this.users = [];
        this.loading = ref(true);

        const response = await Service.getDataByGenderFemale();
        if (Array.isArray(response.results) && response.results.length > 0) {
          response.results.forEach((data) => {
            this.users.push({
              username: data.login.username,
              name: `${data.name.first} ${data.name.last}`,
              email: data.email,
              gender: data.gender,
              registeredDate: moment(data.registered.date).format(
                "DD-MM-YYY HH:MM"
              ),
            });
          });

          if (Array.isArray(this.users) && this.users.length > 0) {
            this.loading = ref(false);
          }
        }
      } catch (err) {
        setTimeout(() => {
          this.$q.notify({
            type: "negative",
            message:
              err.error == "" || err.error == null ? err.toString() : err.error,
            position: "top-right",
          });
        }, 2000);
        this.loading = ref(false);
      }
    },
    resetFilter() {
      this.fetchDataFirstLoad();
    },
  },
};
</script>
