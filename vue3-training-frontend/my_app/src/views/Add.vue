<template>
    <v-sheet color="grey-lighten-2" rounded :height="720" class="pa-20">
        <v-alert v-if="loading" type="success" icon="$success" title="Customer has been created successfully!"></v-alert>
        <v-card class="mx-auto px-6 py-8" max-width="360" title="New Customer" location="end center" :border="true">
            <v-form class="mx-auto px-3 py-4" v-model="form" @submit.prevent="add">
                <v-text-field v-model="name" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    placeholder="Input the CustomerName" label="Name" variant="outlined"></v-text-field>

                <v-text-field v-model="phone" :readonly="loading" :rules="[required]" clearable label="PhoneNumber"
                    placeholder="Input the CustomerPhoneNumber" variant="outlined"></v-text-field>

                <v-text-field v-model="email" :readonly="loading" :rules="[required]" clearable label="Email"
                    placeholder="Input the CustomerEmail" variant="outlined"></v-text-field>

                <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated" prepend-icon="mdi-check-circle">
                    Create
                </v-btn>
            </v-form>
            <v-dialog transition="dialog-bottom-transition" v-model="dialog" width="500">
                <v-card>
                    <v-toolbar height="30" color="info" title="Create Confirm"></v-toolbar>
                    <v-card-text>
                        Are you sure to create this customer?
                    </v-card-text>
                    <v-card-text>
                        <v-spacer></v-spacer>
                        <v-form>
                            <v-text-field v-model="name" readonly class="mb-2" label="New Customer Name"
                                variant="outlined"></v-text-field>

                            <v-text-field v-model="phone" readonly label="New Customer PhoneNumber"
                                variant="outlined"></v-text-field>

                            <v-text-field v-model="email" readonly label="New Customer Email"
                                variant="outlined"></v-text-field>
                        </v-form>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="warning" variant="flat" text @click="dialog = false">
                            <slot name="cancelBtn">Cancel</slot>
                        </v-btn>
                        <v-btn color="success" variant="flat" text @click="Confirm" append-icon="mdi-account-check">
                            <slot name="okBtn">Confirm</slot>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref(false)
var name = ref("")
var phone = ref("")
var email = ref("")
const loading = ref(false)
const dialog = ref(false)

const required = (v) => {
    return !!v || 'Field is required'
}
const add = () => {
    if (!form.value) return
    dialog.value = true
}

const Confirm = () => {
    const params = {
        name: name.value,
        phone: phone.value,
        email: email.value
    }
    const http = axios.create({
        baseURL: "http://localhost:8080/api/customer",
    })
    http.post('/create', params).then(
        dialog.value = false,
        loading.value = true
    ).then(
        setTimeout(() => (
            loading.value = false
        ), 2000),
        name = ref(""),
        phone = ref(""),
        email = ref("")
    )


}
</script>