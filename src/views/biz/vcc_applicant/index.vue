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
          <el-form-item label="resumeId">
            <el-input v-model="form.resumeId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="vacancyId">
            <el-input v-model="form.vacancyId" style="width: 370px;" />
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
          <el-form-item label="willInterviewAt">
            <el-input v-model="form.willInterviewAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="interviewComment">
            <el-input v-model="form.interviewComment" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="timeline">
            <el-input v-model="form.timeline" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="面试地点">
            <el-input v-model="form.interviewPlace" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.interviewPerson" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="面试电话">
            <el-input v-model="form.interviewMobile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="录用说明">
            <el-input v-model="form.hireComment" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="不合适说明">
            <el-input v-model="form.improperComment" style="width: 370px;" />
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
        <el-table-column prop="resumeId" label="resumeId" />
        <el-table-column prop="vacancyId" label="vacancyId" />
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
        <el-table-column prop="willInterviewAt" label="willInterviewAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.willInterviewAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="interviewComment" label="interviewComment" />
        <el-table-column prop="timeline" label="timeline" />
        <el-table-column prop="interviewPlace" label="面试地点" />
        <el-table-column prop="interviewPerson" label="联系人" />
        <el-table-column prop="interviewMobile" label="面试电话" />
        <el-table-column prop="hireComment" label="录用说明" />
        <el-table-column prop="improperComment" label="不合适说明" />
        <el-table-column v-permission="['admin','VccApplicant:edit','VccApplicant:del']" label="操作" width="150px" align="center">
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
import crudVccApplicant from '@/api/VccApplicant'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, resumeId: null, vacancyId: null, status: null, createdAt: null, updatedAt: null, willInterviewAt: null, interviewComment: null, timeline: null, interviewPlace: null, interviewPerson: null, interviewMobile: null, hireComment: null, improperComment: null }
export default {
  name: 'VccApplicant',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'vcc_applicant', url: 'api/VccApplicant', sort: 'id,desc', crudMethod: { ...crudVccApplicant }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'VccApplicant:add'],
        edit: ['admin', 'VccApplicant:edit'],
        del: ['admin', 'VccApplicant:del']
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
