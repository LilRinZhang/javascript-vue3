<template>
    <v-sheet color="grey-lighten-2" rounded :height="720" class="pa-20">
        <v-alert v-if="loading" type="success" icon="$success" title="Customer has been updated successfully!"></v-alert>

        <v-card class="mx-auto px-6 py-8" max-width="720" title="Customer Update" location="end center" :border="true">
            <v-form class="mx-auto px-3 py-4" v-model="form" @submit.prevent="update">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="customerBefore.name" readonly class="mb-2" label="NameBefore"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="params.name" :readonly="loading" :rules="[required]" class="mb-2" clearable
                            placeholder="Input the CustomerName" label="New Name" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="customerBefore.phone" readonly label="PhoneNumberBefore"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="params.phone" :readonly="loading" :rules="[required]" class="mb-2" clearable
                            placeholder="Input the CustomerName" label="New PhoneNumber" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="customerBefore.email" readonly label="EmailBefore"
                            variant="outlined"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="params.email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                            placeholder="Input the CustomerName" label="New Email" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="select" :items="names" :rules="[v => !!v || 'Customer is required']"
                            label="CustomerName"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                            prepend-icon="mdi-check-circle" variant="elevated">
                            Update
                        </v-btn></v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:8080/api/customer",
})

const customers = ref([])
const form = ref(false)
const names = ref([])
const select = ref("")
const params = ref({
    id: 0,
    name: null,
    phone: null,
    email: null
})
const customerBefore = computed(() => {
    const c = customers.value.find(customer => customer.name === select.value)
    if (select.value == "") {
        return {
            id: 0,
            name: null,
            phone: null,
            email: null,
        }
    } else {
        return {
            id: c.id,
            name: c.name,
            phone: c.phone,
            email: c.email,
        }
    }
}
)

const loading = ref(false)

const required = (v) => {
    return !!v || 'Field is required'
}
const update = () => {
    if (!form.value) return
    loading.value = true
    setTimeout(() => (
        comfirm()
    ), 2000)
}

const comfirm = () => {
    params.value.id = customerBefore.value.id
    console.log(params.value)
    http.post('/update', params.value)
    loading.value = false
    params.value = []
    select.value = ""
    initCustomer()
}

const initCustomer = () => {

    http.get('/retrieve').then(Response => {
        Response.data.forEach(customer =>
            names.value.push(customer.name)
        )
        customers.value = Response.data
    }
    )
}

onMounted(() => {
    initCustomer()
})
</script>