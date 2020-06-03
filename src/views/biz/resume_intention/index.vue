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
          <el-form-item label="职位类型id">
            <el-input v-model="form.vccTypeId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="行业id">
            <el-input v-model="form.industryId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="城市id">
            <el-input v-model="form.cityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="求职性质,campus,intern,all">
            <el-input v-model="form.vccProperty" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="studentUserId">
            <el-input v-model="form.studentUserId" style="width: 370px;" />
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
        <el-table-column prop="vccTypeId" label="职位类型id" />
        <el-table-column prop="industryId" label="行业id" />
        <el-table-column prop="cityId" label="城市id" />
        <el-table-column prop="vccProperty" label="求职性质,campus,intern,all" />
        <el-table-column prop="studentUserId" label="studentUserId" />
        <el-table-column v-permission="['admin','ResumeIntention:edit','ResumeIntention:del']" label="操作" width="150px" align="center">
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
import crudResumeIntention from '@/api/ResumeIntention'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, vccTypeId: null, industryId: null, cityId: null, vccProperty: null, studentUserId: null }
export default {
  name: 'ResumeIntention',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'resume_intention', url: 'api/ResumeIntention', sort: 'id,desc', crudMethod: { ...crudResumeIntention }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'ResumeIntention:add'],
        edit: ['admin', 'ResumeIntention:edit'],
        del: ['admin', 'ResumeIntention:del']
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
