<template>
  <div>
    <div class="query-form">
      <el-form ref="queryFormRef">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="name">
              <el-input v-model:value="state.queryForm.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="tags">
              <!--              <el-input v-model:value="state.form.tag"/>-->
              <el-select
                  v-model="state.queryForm.tag"
                  clearable
                  style="width: 100%"
              >
                <el-option
                    v-for="item in state.tagsOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: center">
            <el-button type="primary" @click.prevent="query">查询</el-button>
            <el-button style="margin-left: 10px" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-button-group class="buttons">
        <el-button type="primary" @click="onAdd">新增</el-button>
        <el-button type="primary" @click="onDeleteMany">删除</el-button>
      </el-button-group>

      <el-table
          border
          stripe
          :data="state.data"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="address" label="address">
        </el-table-column>
        <el-table-column prop="tags" label="tags">
          <template #default="scope">
            <el-tag v-for="tag in scope.row.tags"
                    :key="tag">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Action">
          <template #default="scope">
            <el-button size="small" @click="update(scope.row.key)"
            >Edit</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="onDeleteOne(scope.row.key)"
            >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
          v-model:current-page="state.queryForm.current"
          v-model:page-size="state.queryForm.pageSize"
          :page-sizes="state.pageSizeOptions"
          layout="->,total, prev, pager, next, sizes"
          :total="state.total"
          @size-change="query"
          @current-change="query"
      />
    </div>
    <el-dialog v-model="state.addFormVisible" width="900px" :title="state.formTitle">
      <el-form ref="addOrUpdateFormRef" label-width="25%">
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="name">
              <el-input v-model:value="state.addOrUpdateForm.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="age" >
              <!--              <el-input v-model:value="state.form.tag"/>-->
              <el-input
                  v-model:value="state.addOrUpdateForm.age"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="2">
            <el-form-item label="address">
              <el-input v-model:value="state.addOrUpdateForm.address"/>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="tags" :labelCol="{ span: 6, offset: 2 }">
              <!--              <el-input v-model:value="state.form.tag"/>-->
              <el-select
                  v-model="state.addOrUpdateForm.tags"
                  clearable
                  multiple
                  style="width: 100%"
              >
                <el-option
                    v-for="item in state.tagsOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onsubmit">提交</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { simpleTableApi, tagsOptionApi } from '@/api/table.js'

const state = reactive({
  queryForm: {
    name: '',
    tag: '',
    pageSize: 5,
    current: 1
  },
  addFormVisible: false,
  addOrUpdateForm: {
    key: '',
    name: '',
    age: '',
    address: '',
    tags: []
  },
  formTitle: '',
  updateKey: '0',
  tagsOption: [],
  data: [],
  columns: [{
    title: '序号',
    dataIndex: 'key',
    key: 'key'
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags'
  }, {
    title: 'Action',
    key: 'action'
  }],
  selectedRowKeys: [],
  pageSizeOptions: [3, 5, 10],
  total: 0
})

const getIndex = (key) => {
  for (let i = 0; i < state.data.length; i++) {
    if (state.data[i].key === key) {
      return i
    }
  }
  return -1
}

const query = () => {
  simpleTableApi({ ...state.queryForm }).then(res => {
    state.data = res.data.data
    state.total = res.data.total
  })
}

const getTagsOption = () => {
  tagsOptionApi().then(res => {
    state.tagsOption = res.data.data
  })
}

const reset = () => {
  state.queryForm.tag = ''
  state.queryForm.name = ''
  state.queryForm.pageSize = 3
  state.queryForm.current = 1
}

const onDeleteMany = () => {
  state.data = state.data.filter(item => {
    return state.selectedRowKeys.indexOf(item.key) === -1
  })
}
const onDeleteOne = (key) => {
  state.data = state.data.filter(item => {
    return item.key !== key
  })
}
const update = (key) => {
  state.formTitle = `编辑:${key}`
  state.addFormVisible = true
  state.updateKey = key
  const index = getIndex(state.updateKey)
  state.addOrUpdateForm = { ...state.data[index] }
}
const onCancel = () => {
  state.addOrUpdateForm = {
    key: '',
    name: '',
    age: '',
    address: '',
    tags: []
  }
  state.addFormVisible = false
}

const onAdd = () => {
  const key = (state.data.length + 1).toString()
  state.formTitle = `新增:${key}`
  state.addFormVisible = true
  state.updateKey = key
  state.addOrUpdateForm = {
    key,
    name: '',
    age: '',
    address: '',
    tags: []
  }
}

const onsubmit = () => {
  const index = getIndex(state.addOrUpdateForm.key)
  if (index > -1) {
    state.data[index] = { ...state.addOrUpdateForm }
  } else {
    state.data.push({ ...state.addOrUpdateForm })
  }

  state.addFormVisible = false
}

onMounted(() => {
  getTagsOption()
})

</script>
<style scoped>
.query-form {
  padding: 0 20px 20px 20px;
}

.pagination {
  padding: 20px;
}
</style>
