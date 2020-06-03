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
          <el-form-item label="companyId">
            <el-input v-model="form.companyId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="gender">
            <el-input v-model="form.gender" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="age">
            <el-input v-model="form.age" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="photo">
            <el-input v-model="form.photo" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="joinedAt">
            <el-input v-model="form.joinedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="tags">
            <el-input v-model="form.tags" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="contactMobile">
            <el-input v-model="form.contactMobile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="position">
            <el-input v-model="form.position" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="profile">
            <el-input v-model="form.profile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createdAt" prop="createdAt">
            <el-input v-model="form.createdAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updatedAt" prop="updatedAt">
            <el-input v-model="form.updatedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="专业id">
            <el-input v-model="form.majorId" style="width: 370px;" />
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
        <el-table-column prop="companyId" label="companyId" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="gender" label="gender" />
        <el-table-column prop="age" label="age" />
        <el-table-column prop="photo" label="photo" />
        <el-table-column prop="joinedAt" label="joinedAt" />
        <el-table-column prop="tags" label="tags" />
        <el-table-column prop="contactMobile" label="contactMobile" />
        <el-table-column prop="position" label="position" />
        <el-table-column prop="profile" label="profile" />
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
        <el-table-column prop="majorId" label="专业id" />
        <el-table-column v-permission="['admin','Mentor:edit','Mentor:del']" label="操作" width="150px" align="center">
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
import crudMentor from '@/api/Mentor'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, companyId: null, name: null, gender: null, age: null, photo: null, joinedAt: null, tags: null, contactMobile: null, position: null, profile: null, createdAt: null, updatedAt: null, majorId: null }
export default {
  name: 'Mentor',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'mentor', url: 'api/Mentor', sort: 'id,desc', crudMethod: { ...crudMentor }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'Mentor:add'],
        edit: ['admin', 'Mentor:edit'],
        del: ['admin', 'Mentor:del']
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
