<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const Items = ref([])

// 全件取得（一覧）
const findCategory = () => {
    axios.get("http://127.0.0.1:8080/api/categories/retrieve").then(response => {
        Items.value = response.data
    }).catch(e => {
        console.log(e.response)
    })
}

// 追加パラメータ
const params = ref(
    {
        name: '',
        slug: '',
    }
)

// 検索パラメータ
const filterParams = ref(
    {
        name: '',
    }
)

// 追加カテゴリー名
const item = ref("")

// 変更カテゴリー名
const updateName = ref("")

// 検索項目
const filterItem = ref("")

const updateKey = ref(-1)

// カテゴリー検索
const search = () => {
    if (filterItem.value == "") alert("検索内容を入力してください")
    else {
        filterParams.value.name = filterItem.value
        console.log(filterParams.value)
        axios.get("http://127.0.0.1:8080/api/categories/search", { params: filterParams.value }).then(() => {
            findCategory()
            filterItem.value == ""
        }
        )
    }
}

// カテゴリー追加
const add = () => {
    if (item.value == "") alert("カテゴリー名を入力してください")
    else {
        let length = Items.value.length
        let newId = parseInt(Items.value[length - 1].id) + 1
        params.value.name = item.value
        params.value.slug = newId
        axios.post("http://127.0.0.1:8080/api/categories/create", params.value).then(() => {
            findCategory()
            item.value = ""
        }
        )
    }
}

// カテゴリー削除
const destory = (id) => {
    axios.delete("http://127.0.0.1:8080/api/categories/destory/" + id + "/").then(() => {
        findCategory()
    }
    )
}

// カテゴリー名更新
const updateById = (item) => {
    if (updateName.value == []) alert("更新するカテゴリー名を入力してください")
    else {
        params.value.name = updateName.value
        params.value.slug = item.slug
        axios.put("http://127.0.0.1:8080/api/categories/update/" + item.id + "/", params.value).then(() => {
            findCategory()
            shouldUpdate(-1)
            updateName.value = ""
        }
        )
    }
}

const shouldUpdate = (key) => {
    return updateKey.value = key
}

onMounted(() => {
    findCategory()
})
</script>

<template>
    <div>
        <div v-for="(item, key) in Items" :key="key">
            <hr>
            <p>ID: {{ item.id }}</p>
            <p>カテゴリ: {{ item.name }} </p>
            <p>key: {{ key }}</p>
            <p><v-btn @click="destory(item.id)" style="cursor: pointer">削除</v-btn><button @click="shouldUpdate(key)"
                    style="cursor: pointer">変更</button></p>
            <p v-if="updateKey == key"><input type="text" size="20" v-model="updateName"><button @click="updateById(item)"
                    style="cursor: pointer">カテゴリー名更新</button>
                <button @click="shouldUpdate(-1)" style="cursor: pointer">キャンセル</button>
            </p>
            <hr>
        </div>
    </div>
    <div>
        <div><input type="text" size="30" v-model="item"><button @click="add()" style="cursor: pointer">追加</button></div>
        <div><input type="text" size="30" v-model="filterItem"><button @click="search()" style="cursor: pointer">検索</button>
        </div>
    </div>
</template>
