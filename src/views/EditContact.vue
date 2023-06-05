<template>
<div class="container mt-3">
  <div class="row">
   <div class="col">
     <p class="h3 text-success fw-bold">Edit Contact</p>
   </div>
  </div>
</div>

<div class="container mt-3">
  <div class="row">
    <div class="col-md-4">
      <form @submit.prevent="updateSubmit()">
        <div class="mb-2">
          <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
       </div>
       <div class="mb-2">
          <input v-model="contact.email" type="email" class="form-control" placeholder="Email">
       </div>
       <div class="mb-2">
          <input v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile">
       </div>
       <div class="mb-2">
          <input v-model="contact.title" type="text" class="form-control" placeholder="Title">
       </div>
       <div class="mb-2">
          <select v-model="contact.groupId" class="form-control" v-if="group.length > 0">
           <option value="">Select Group</option>  
           <option :value="grp.id" v-for="grp of group" :key="grp.id">{{grp.name}}</option>
          </select>
       </div>
       <div class="mb-2">
          <input type="submit" class="btn btn-success" value="Update">
          <!-- <input type="cancel" class="btn btn-danger" value="Cancel"> -->
       </div>
      </form>
    </div>
    <div class="col-md-4">
     <img :src="contact.photo"
         alt="" class="contact-img">
    </div>
  </div>
</div>
</template>
<script>
import {ContactService} from "@/services/ContactService";
export default {
  name:'EditContact',
  data(){
   return {
      id: this.$route.params.contactId,
      contact:{},
      errorMessage: null,
      group: []
   }
  },
  async created(){
   try {
      
      let response = await ContactService.getContact(this.id);
      let  groupResponse =  await ContactService.getAllGroup();
      this.group = groupResponse.data;
      this.contact = response.data;
   } catch (error) {
      this.errorMessage = error;
   }
  },
  methods: {
   async updateSubmit(){
      try{
        let response = await ContactService.updateContact(this.contact,this.id);
        if(response)
        {
             return this.$router.push('/');
        }
        else{
            return this.$router.push(`/contacts/edit/${this.id}`);
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }
  },
}
</script>
<style>

</style>