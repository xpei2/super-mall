<template>
   <div class="param-info" v-if="Object.keys(paramsInfo).length !== 0">
       <h3 class="base-info-msg"><span>{{paramsInfo.title}}</span></h3>
       <table class="info-size" v-for="(table, index) in paramsInfo.sizes" :key="index">
           <tr v-for="(tr, indey) in table" :key="indey">
               <td v-for="(td, indez) in tr" :key="indez">
                   {{td}}
               </td>
           </tr>
       </table>
       <table class="info-param">
           <tr v-for="(info, index) in paramsInfo.infos" :key="index">
               <td class="info-param-key">{{info.key}}</td>
               <td class="info-param-value">{{info.value}}</td>
           </tr>
       </table>
       <div class="info-img" v-if="paramsInfo.image.length !== 0">
           <img :src="paramsInfo.image" alt="">
       </div>
   </div>
</template>

<script>
export default {
   name: 'DetailParamInfo',
   props: {
       paramsInfo: {
           type: Object,
           default() {
               return {}
           }
       }
   }
}
</script>

<style scoped>
.param-info {
  font-size: 14px;
  padding: 20px 15px;
  border-bottom: 5px solid #f8f8f8;
}
.base-info-msg {
    padding-left: 0;
}
.param-info p {
  font-size: 15px;
  margin-bottom: 10px;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
.info-param {
  border-top: 5px solid rgba(0, 0, 0, 0.1);
}
.info-param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>