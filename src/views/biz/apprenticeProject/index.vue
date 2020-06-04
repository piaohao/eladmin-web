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
          <el-form-item label="schoolIds">
            <el-input v-model="form.schoolIds" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="companyId">
            <el-input v-model="form.companyId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="startAt">
            <el-input v-model="form.startAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="endAt">
            <el-input v-model="form.endAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="brief">
            <el-input v-model="form.brief" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="departments">
            <el-input v-model="form.departments" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="headCount">
            <el-input v-model="form.headCount" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="附件url">
            <el-input v-model="form.attachmentUrl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mentorIds">
            <el-input v-model="form.mentorIds" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="status">
            <el-input v-model="form.status" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createdAt" prop="createdAt">
            <el-input v-model="form.createdAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updatedAt" prop="updatedAt">
            <el-input v-model="form.updatedAt" style="width: 370px;" />
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
        <el-table-column prop="schoolIds" label="schoolIds" />
        <el-table-column prop="companyId" label="companyId" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="startAt" label="startAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endAt" label="endAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.endAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="brief" label="brief" />
        <el-table-column prop="departments" label="departments" />
        <el-table-column prop="headCount" label="headCount" />
        <el-table-column prop="attachmentUrl" label="附件url" />
        <el-table-column prop="mentorIds" label="mentorIds" />
        <el-table-column prop="status" label="status" />
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
        <el-table-column v-permission="['admin','apprenticeProject:edit','apprenticeProject:del']" label="操作" width="150px" align="center">
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
import crudApprenticeProject from '@/api/biz/apprenticeProject'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, schoolIds: null, companyId: null, name: null, startAt: null, endAt: null, brief: null, departments: null, headCount: null, attachmentUrl: null, mentorIds: null, status: null, createdAt: null, updatedAt: null }
export default {
  name: 'ApprenticeProject',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'ApprenticeProject', url: 'api/apprenticeProject', sort: 'id,desc', crudMethod: { ...crudApprenticeProject }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'apprenticeProject:add'],
        edit: ['admin', 'apprenticeProject:edit'],
        del: ['admin', 'apprenticeProject:del']
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
