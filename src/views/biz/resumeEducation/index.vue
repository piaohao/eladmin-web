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
          <el-form-item label="school">
            <el-input v-model="form.school" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="major">
            <el-input v-model="form.major" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="education">
            <el-input v-model="form.education" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="enrollmentTime">
            <el-input v-model="form.enrollmentTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="graduationTime">
            <el-input v-model="form.graduationTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="gpa">
            <el-input v-model="form.gpa" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="scoreRanking">
            <el-input v-model="form.scoreRanking" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="majorCourse">
            <el-input v-model="form.majorCourse" style="width: 370px;" />
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
        <el-table-column prop="school" label="school" />
        <el-table-column prop="major" label="major" />
        <el-table-column prop="education" label="education" />
        <el-table-column prop="enrollmentTime" label="enrollmentTime" />
        <el-table-column prop="graduationTime" label="graduationTime" />
        <el-table-column prop="gpa" label="gpa" />
        <el-table-column prop="scoreRanking" label="scoreRanking" />
        <el-table-column prop="majorCourse" label="majorCourse" />
        <el-table-column v-permission="['admin','resumeEducation:edit','resumeEducation:del']" label="操作" width="150px" align="center">
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
import crudResumeEducation from '@/api/biz/resumeEducation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, resumeId: null, school: null, major: null, education: null, enrollmentTime: null, graduationTime: null, gpa: null, scoreRanking: null, majorCourse: null }
export default {
  name: 'ResumeEducation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'ResumeEducation', url: 'api/resumeEducation', sort: 'id,desc', crudMethod: { ...crudResumeEducation }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'resumeEducation:add'],
        edit: ['admin', 'resumeEducation:edit'],
        del: ['admin', 'resumeEducation:del']
      },
      rules: {
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
