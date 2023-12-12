<template>
    <v-alert v-if="showDeleteSuccess" type="success" icon="$success"
        title="Selected Customers have been deleted successfully!"></v-alert>
    <v-data-table :headers="headers" :items="customers" item-value="id" items-per-page="10" class="px-16" show-select
        hide-default-footer v-model="selected">
        <template v-slot:top>
            <v-toolbar flat height="60">
                <v-toolbar-title class="d-flex align-start">Customer List</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-btn class="text-none text-subtitle-1 d-flex align-right" variant="flat" color="error" dark
                    append-icon="mdi-delete-outline" @click="dialog = true">
                    Delete
                </v-btn>
                <v-dialog transition="dialog-bottom-transition" v-model="dialog" width="500">
                    <v-card v-if="selected.length > 0">
                        <v-toolbar height="30" color="error" title="Delete Confirm"></v-toolbar>
                        <v-card-text>
                            Are you sure to delete the selected customers?
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="success" variant="flat" text @click="dialog = false">
                                <slot name="cancelBtn">Cancel</slot>
                            </v-btn>
                            <v-btn color="error" variant="flat" text @click="confirm" append-icon="mdi-delete-outline">
                                <slot name="okBtn">Confirm</slot>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card v-if="selected.length == 0">
                        <v-toolbar height="30" color="error" title="Error"></v-toolbar>
                        <v-card-text>
                            There is no customer selected!
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
    </v-data-table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const customers = ref([])
const headers = ref([])
const selected = ref([])
const dialog = ref(false)
const showDeleteSuccess = ref(false)

const deleteAll = () => {
    selected.value.forEach(deleteItem => {
        const param = { id: deleteItem }
        http.post("/delete", param)
    }
    )
    dialog.value = false
    console.log(selected.value)
}

const http = axios.create({
    baseURL: "http://localhost:8080/api/customer",
})

const confirm = () => {
    deleteAll()
    initCustomer()
    showDeleteSuccess.value = true
    setTimeout(() => (
        showDeleteSuccess.value = false
    ), 2000)
}

// 全件取得する
const initCustomer = () => {
    http.get('/retrieve').then(Response =>
        customers.value = Response.data
    )

    headers.value = [
        {
            title: 'CustomerId',
            align: 'center',
            key: 'id',
        },
        { title: 'CustomerName', key: 'name', align: 'center' },
        { title: 'CustomerPhoneNumber', key: 'phone', align: 'center' },
        { title: 'CustomerEmail', key: 'email', align: 'center' },
    ]
}

onMounted(() => {
    initCustomer()
}
)
</script>
