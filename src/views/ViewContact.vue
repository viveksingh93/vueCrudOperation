<template>
<div class="container mt-3">
  <div class="row">
   <div class="col">
     <p class="h3 text-success fw-bold">View Contact</p>
   </div>
  </div>
</div>
<div class="container" v-if="isDone()">
  <div class="row align-items-center">
    <div class="col-md-4">
    <img :src="contact.photo"
         alt="" class="contact-img-big">
    </div>
    <div class="col-md-6">
    <ul class="list-group">
           <li class="list-group-item">Name : <span class="fw-bold">{{contact.name}}</span></li>
           <li class="list-group-item">Email : <span class="fw-bold">{{contact.email}}</span></li>
           <li class="list-group-item">Mobile : <span class="fw-bold">{{contact.mobile}}</span></li>
          </ul>
    </div>
  </div>
  <div class="row mt-3">
     <div class="col">
       <router-link to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
     </div>
  </div>
</div>
</template>
<script>
import {ContactService} from "@/services/ContactService";
export default {
  name:'ViewContact',
  data(){
    return{
      id:  this.$route.params.contactId,
      contact: {},
      group: {},
      errorMessage: null
    }
  },
  async created(){
    try{
      let response = await ContactService.getContact(this.id);
      let groupData = await ContactService.getGroup(response.data.groupId)
      this.group = groupData.data;
      this.contact = response.data;
    }
    catch(error)
    {
       this.errorMessage = error;
    }
  },
  methods: {
    isDone(){
      return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
    }
  },
}
</script>
<style>

</style>