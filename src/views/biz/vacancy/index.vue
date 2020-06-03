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
          <el-form-item label="address">
            <el-input v-model="form.address" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="description">
            <el-input v-model="form.description" style="width: 370px;" />
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
          <el-form-item label="isHottest">
            <el-input v-model="form.isHottest" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="viewCount">
            <el-input v-model="form.viewCount" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="applyCount">
            <el-input v-model="form.applyCount" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="stateId">
            <el-input v-model="form.stateId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="cityId">
            <el-input v-model="form.cityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="districtId">
            <el-input v-model="form.districtId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lat">
            <el-input v-model="form.lat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lng">
            <el-input v-model="form.lng" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="vccTypeId">
            <el-input v-model="form.vccTypeId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="educationId">
            <el-input v-model="form.educationId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="isIntern">
            <el-input v-model="form.isIntern" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="internDuration">
            <el-input v-model="form.internDuration" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="日，月，年">
            <el-input v-model="form.salaryType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="salaryRangeLow">
            <el-input v-model="form.salaryRangeLow" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="salaryRangeHigh">
            <el-input v-model="form.salaryRangeHigh" style="width: 370px;" />
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
        <el-table-column prop="address" label="address" />
        <el-table-column prop="description" label="description" />
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
        <el-table-column prop="isHottest" label="isHottest" />
        <el-table-column prop="viewCount" label="viewCount" />
        <el-table-column prop="applyCount" label="applyCount" />
        <el-table-column prop="stateId" label="stateId" />
        <el-table-column prop="cityId" label="cityId" />
        <el-table-column prop="districtId" label="districtId" />
        <el-table-column prop="lat" label="lat" />
        <el-table-column prop="lng" label="lng" />
        <el-table-column prop="vccTypeId" label="vccTypeId" />
        <el-table-column prop="educationId" label="educationId" />
        <el-table-column prop="isIntern" label="isIntern" />
        <el-table-column prop="internDuration" label="internDuration" />
        <el-table-column prop="salaryType" label="日，月，年" />
        <el-table-column prop="salaryRangeLow" label="salaryRangeLow" />
        <el-table-column prop="salaryRangeHigh" label="salaryRangeHigh" />
        <el-table-column v-permission="['admin','Vacancy:edit','Vacancy:del']" label="操作" width="150px" align="center">
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
import crudVacancy from '@/api/Vacancy'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, companyId: null, name: null, address: null, description: null, status: null, createdAt: null, updatedAt: null, isHottest: null, viewCount: null, applyCount: null, stateId: null, cityId: null, districtId: null, lat: null, lng: null, vccTypeId: null, educationId: null, isIntern: null, internDuration: null, salaryType: null, salaryRangeLow: null, salaryRangeHigh: null }
export default {
  name: 'Vacancy',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'vacancy', url: 'api/Vacancy', sort: 'id,desc', crudMethod: { ...crudVacancy }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'Vacancy:add'],
        edit: ['admin', 'Vacancy:edit'],
        del: ['admin', 'Vacancy:del']
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
