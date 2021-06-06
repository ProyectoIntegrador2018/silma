<template>
  <v-container>
    <h1>Tiempos</h1>
    <template>
      <v-select
        v-model="defaultWriter"
        :items="writers"
        item-text="label"
        item-value="label"
         @change="onChange"
        style="max-width:35%;"
      >
      </v-select>
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
          centered
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item.tab"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item.tab"
          >
          <v-card flat>
              <v-card-text>
                <div class="table-wrapper" v-if="item.tab == 'Tabla'">
                    <reportsTable :items="dataTimesTable" :headers="headers" :loading="isLoading">
                    </reportsTable>
                </div>
                <div class="table-wrapper"  v-if="item.tab == 'Grafica'" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content:center;">
                  <div v-for="header in headersGraph"  :key="header.text" style="display: flex; flex-direction: column; align-items:center; justify-content:center;"> 
                    <h3>{{header.text}}</h3>
                    <PieChart  :chart-data="dataTimesGraph[header.value]" >
                    </PieChart>
                  </div>
                </div>
              </v-card-text>
          </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-container>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
}
</style>

<script>
import {
  deleteRequest,
  getRequest,
  postRequest
} from "../../utils/requestsNoErr";
import reportsTable from "../../components/reportsTable";
import PieChart from "../../components/PieChart";
import list from "../../mixins/list";
import { hasPermission } from "../../utils/utils";
import { chartColors, phases, chartLabels } from "@/utils/constants.js";

export default {
  components: {
    reportsTable,
    PieChart
  },
  mixins: [list],
  data() {
    return {
      hasPermission,
      dataTimesTable: [],
      tab: null,
      filter: '',
      rejectedFilter: false,
      isLoading: false,
      defaultWriter: {label: 'General'},
      writers: [{label: 'General'}],
      writersData: {},
      items: [
        {
          tab: 'Tabla',
        },
        {
          tab: 'Grafica',
        },
      ],
      headers: [
        { text: "Fase", value: "phase" },
        { text: "Minimo", value: "min" },
        { text: "Promedio", value: "avg" },
        { text: "Maximo", value: "max" },
        { text: "Total", value: "total" },
      ],
      headersGraph: [
        { text: "Minimo", value: "min" },
        { text: "Promedio", value: "avg" },
        { text: "Maximo", value: "max" },
        { text: "Total", value: "total" },
      ],
      dataTimesGraph: {
        min:{
          labels: chartLabels,
          datasets: [
            {
              label: 'min',
              data: [],
              backgroundColor: chartColors
            }
          ]
        },
        max:{
          labels: chartLabels,
          datasets: [
            {
              label: 'max',
              data: [],
              backgroundColor: chartColors
            }
          ]
        },
        avg:{
          labels: chartLabels,
          datasets: [
            {
              label: 'avg',
              data: [],
              backgroundColor: chartColors
            }
          ]
        },
        total:{
          labels: chartLabels,
          datasets: [
            {
              label: 'total',
              data: [],
              backgroundColor: chartColors
            }
          ]
        }
      }
    };
  },
  async mounted() {
    this.updateLoading(true);
    this.isLoading = true;
    await this.getTimes();
    this.updateLoading(false);
    this.isLoading = false;
  },
  methods: {  
    //Funcion que al inicio obtiene todos los textos en proceso
    async getTimes() {
      const token = this.$cookies.get("token");
      var data = await getRequest("timeBenchmarks", token);
      const dataPhase = Object.values(data).map((value, key) =>{
        let parsedData = this.parseBenchmarksRead(value)
        return {...parsedData, phase: key}
      })
      this.dataTimesTable = dataPhase;
      this.parseDataGraph(data)
      this.writersData = {'General': data}

      var dataW = await getRequest("timeBenchmarksByWriter", token);
      Object.keys(dataW).forEach((key, index) =>{ 
        this.writers.push({label:key})
      });
      this.writersData = {...this.writersData, ...dataW}
      console.log(this.writersData)
    },

    onChange(writer){
      console.log(writer)
      const data = this.writersData[writer]
      console.log(data)
      const dataPhase = Object.values(data).map((value, key) =>{
        let parsedData = this.parseBenchmarksRead(value)
        return {...parsedData, phase: key}
      })
      this.dataTimesTable = dataPhase;
      this.parseDataGraph(data)
    },

    parseBenchmarksRead(values){
      let time = {}
      time.avg = values.avg == null ? 'N/A' : values.avg.toFixed(2) + "h";
      time.max = values.max == Number.MIN_VALUE ?  'N/A' : values.max.toFixed(2) + "h";
      time.min = values.min == Number.MAX_VALUE ?  'N/A' : values.min.toFixed(2) + "h";
      time.total = values.total == 0 ?  'N/A' : values.total.toFixed(2) + "h";
      return time;
    },
    parseDataGraph(data){
      Object.assign(this.dataTimesGraph, resetGraph());
      console.log(this.dataTimesGraph)
      Object.values(data).forEach((value, key) =>{
        const parsedBenchmarks = this.parseBenchmarksGraph(value)
        if(key < 8){
          Object.keys(value).forEach((attr, ind) =>{ 
            this.dataTimesGraph[attr].datasets[0].data.push(parsedBenchmarks[attr])
          })
        }
      })
    },
    parseBenchmarksGraph(values){
      const time = {}
      time.avg = values.avg == null ? 0 : values.avg.toFixed(2);
      time.max = values.max == Number.MIN_VALUE ?  0 : values.max.toFixed(2);
      time.min = values.min == Number.MAX_VALUE ?  0 : values.min.toFixed(2);
      time.total = values.total == 0 ?  0 : values.total.toFixed(2);
      return time;
    },

  }
};
  function resetGraph(){
    return {
      min:{
        labels: chartLabels,
        datasets: [
          {
            label: 'min',
            data: [],
            backgroundColor: chartColors
          }
        ]
      },
      max:{
        labels: chartLabels,
        datasets: [
          {
            label: 'max',
            data: [],
            backgroundColor: chartColors
          }
        ]
      },
      avg:{
        labels: chartLabels,
        datasets: [
          {
            label: 'avg',
            data: [],
            backgroundColor: chartColors
          }
        ]
      },
      total:{
        labels: chartLabels,
        datasets: [
          {
            label: 'total',
            data: [],
            backgroundColor: chartColors
          }
        ]
      }
    }
  }
</script>
