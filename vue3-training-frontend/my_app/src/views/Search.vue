<template>
    <v-card-text class="text-h5 font-weight-bold mx-auto px-16 py-8">
        <v-text-field append-inner-icon="mdi-magnify" placeholder="LilRin" v-model="message" type="text"
            clear-icon="mdi-close-circle" clearable @click:clear="clearMessage" @click:append-inner="onClick"
            @keyup.enter="onClick" variant="outlined" class="mx-auto px-16 py-8">
            <template v-slot:label>
                <span>
                    Search Keyword of ID or Name<v-icon icon="mdi-file-find"></v-icon>
                </span>
            </template></v-text-field>
    </v-card-text>

    <v-data-table v-if="shouldShowResult" :headers="headers" :items="customers" item-value="id"
        class="elevation-1c flex-table px-16" items-per-page="5"></v-data-table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';


const customers = ref([])
const headers = ref([])
// const selected = ref([])
const shouldShowResult = ref(false)
const message = ref("")

const http = axios.create({
    baseURL: "http://localhost:8080/api/customer",
})
const onClick = () => {
    if (!message.value) return
    // customers.value = customers.value.filter(item=>{
    //     item.name.includes(message.value)
    // }
    // )
    // console.log(customers.value)
    // if (customers.value.length > 0) shouldShowResult.value = true
    //const param = { keyword: message.value }
    console.log(message.value)
    let param = message.value
    http.get('/search?keyword=' + param).then(response => {
        customers.value = response.data
        console.log("id-1: ", customers.value)
        if (customers.value.length > 0) shouldShowResult.value = true
    })
}

const clearMessage = () => {
    message.value = ""
}

const initCustomer = () => {
    http.get('/retrieve').then(response => {
        customers.value = response.data
    }).catch(e => {
        console.log(e.response)
    })

    headers.value = [
        {
            title: 'CustomerId',
            align: 'center',
            sortable: false,
            key: 'id',
        },
        { title: 'CustomerName', key: 'name', align: 'center' },
        { title: 'CustomerPhoneNumber', key: 'phone', align: 'center' },
        { title: 'CustomerEmail', key: 'email', align: 'center' },
    ]
    clearMessage()
}


onMounted(() => {
    initCustomer()
}

)
</script>
