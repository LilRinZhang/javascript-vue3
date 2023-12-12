<script setup>
// Composition API
import { computed, ref } from 'vue'
const answer2 = computed(() => {
    return 2 + 2
})
// 背景色・文字色変更
const message = computed(() => {
    return 'ようこそ <strong>' + myname.value + '</strong>さん'
})
const msgColor = ref('blue')
const myname = ref('')
// ボタンaddファンクション
const number = ref(0)
const add = () => {
    number.value++
}
// 繰り返し処理
const items = ref([])
const item = ref("")
const addItem = () => {
    items.value.push(item.value)
    item.value = ''
}
// 項目削除
const removeItem = (index) => {
    items.value.splice(index, 1)
}

const answer = 2
</script>

<template>
    <router-view />

    <a class="d-inline-block mx-4 text-decoration-none text-primary" href="https://v3.vuetifyjs.com/" target="_blank"
        rel="noopener noreferrer" title="Vuetify Documentation">
        <v-img alt="Vuetify logo" width="64" src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg" />
    </a>
    <p>2 + 2 = {{ answer2 }}</p>
    <p>1 + 1 = {{ answer }}</p>

    <v-text-field label="お名前は : " type="text" size="30" v-model="myname"></v-text-field>
    <p>入力された名前:{{ myname }}</p>
    <p v-html="message" :style="{ color: msgColor, backgroundColor: 'orange' }"></p>
    <p><v-text-field label="Times" type="text" size="30" v-model="number"></v-text-field><v-btn @click="add()">+1</v-btn>
    </p>
    <div><input type="text" size="30" v-model="item"><v-btn @click="addItem">追加</v-btn></div>

    <ul v-if="items.length > 0">
        <li v-for="(msg, i) in items" v-bind:key="i">{{ msg }} <span @click="removeItem(i)" style="cursor: pointer">x</span>
        </li>
    </ul>
    <p v-else>※ Itemを追加してください</p>

    <ul class="tab-menu-base">
        <li><router-link to="/routing">Rounting Test</router-link></li>
    </ul>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
