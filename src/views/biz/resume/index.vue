<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="studentUserId">
            <el-input v-model="form.studentUserId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="gender">
            <el-input v-model="form.gender" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="dateOfBirth">
            <el-input v-model="form.dateOfBirth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mobile">
            <el-input v-model="form.mobile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createdAt" prop="createdAt">
            <el-input v-model="form.createdAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updatedAt" prop="updatedAt">
            <el-input v-model="form.updatedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="城市id">
            <el-input v-model="form.cityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="form.avatar" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="studentUserId" label="studentUserId" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="gender" label="gender" />
        <el-table-column prop="dateOfBirth" label="dateOfBirth" />
        <el-table-column prop="mobile" label="mobile" />
        <el-table-column prop="createdAt" label="createdAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="updatedAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updatedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cityId" label="城市id" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="avatar" label="头像" />
        <el-table-column v-permission="['admin','resume:edit','resume:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudResume from '@/api/biz/resume'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, studentUserId: null, name: null, gender: null, dateOfBirth: null, mobile: null, createdAt: null, updatedAt: null, cityId: null, email: null, avatar: null }
export default {
  name: 'Resume',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'Resume', url: 'api/resume', sort: 'id,desc', crudMethod: { ...crudResume }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'resume:add'],
        edit: ['admin', 'resume:edit'],
        del: ['admin', 'resume:del']
      },
      rules: {
        createdAt: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        updatedAt: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
