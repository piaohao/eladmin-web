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
          <el-form-item label="project">
            <el-input v-model="form.project" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="startTime">
            <el-input v-model="form.startTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="endTime">
            <el-input v-model="form.endTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="duty">
            <el-input v-model="form.duty" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="description">
            <el-input v-model="form.description" style="width: 370px;" />
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
        <el-table-column prop="project" label="project" />
        <el-table-column prop="startTime" label="startTime" />
        <el-table-column prop="endTime" label="endTime" />
        <el-table-column prop="duty" label="duty" />
        <el-table-column prop="description" label="description" />
        <el-table-column v-permission="['admin','resumeProject:edit','resumeProject:del']" label="操作" width="150px" align="center">
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
import crudResumeProject from '@/api/biz/resumeProject'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, resumeId: null, project: null, startTime: null, endTime: null, duty: null, description: null }
export default {
  name: 'ResumeProject',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'ResumeProject', url: 'api/resumeProject', sort: 'id,desc', crudMethod: { ...crudResumeProject }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'resumeProject:add'],
        edit: ['admin', 'resumeProject:edit'],
        del: ['admin', 'resumeProject:del']
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
