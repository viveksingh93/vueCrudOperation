<template>
<div class="container mt-3">
    <div class="row">
        <div class="col">
            <p class="h3 text-pink fw-bold">Contact Manager
                <router-link to="/contacts/add" class="btn btn-Danger btn-sm">
                    <i class="fa fa-plus-circle"></i> New
                </router-link>
            </p>
            <form>
            </form>
        </div>
    </div>
</div>
<div class="container mt-3" v-if="contacts.length > 0">
    <div class="row">
        <div class="col-md-6" v-for="contact of contacts" :key="contact">
            <div class="card my-2">
                <div class="card-body">
                    <div class="row">
                        <div class="row align-items-center">
                            <div class="col-sm-1">
                                <img :src="contact.photo" alt="" class="contact-img">
                            </div>
                            <div class="col-sm-9">
                                <ul class="list-group">
                                    <li class="list-group-item">date : <span class="fw-bold">{{contact.date}}</span></li>
                                    <li class="list-group-item">temperatureC : <span class="fw-bold">{{contact.temperatureC}}</span></li>
                                    <li class="list-group-item">summary : <span class="fw-bold">{{contact.summary}}</span></li>
                                </ul>
                            </div>
                            <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                                <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-warning my-1">
                                    <i class="fa fa-eye"></i>
                                </router-link>

                                <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-primary my-1">
                                    <i class="fa fa-pen"></i>
                                </router-link>
                                <button class="btn btn-danger my-1" @click="clickDeleteContact(contact.id)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ContactService
} from "@/services/ContactService";
export default {
    name: 'ContactManager',
    data() {
        return {
            contacts: [],
            errorMessage: null
        }
    },
    async created() {
        try {
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
        } catch (error) {
            this.errorMessage = error;
        }
    },
    methods: {
        async clickDeleteContact(id) {
            try {
                let response = await ContactService.deleteContact(id);
                if (response) {
                    let response = await ContactService.getAllContacts();
                    this.contacts = response.data;
                } else {
                    alert("delete failed");
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>

</style>
