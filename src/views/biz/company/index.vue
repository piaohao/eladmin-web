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
          <el-form-item label="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="logo">
            <el-input v-model="form.logo" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="address">
            <el-input v-model="form.address" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="homePage">
            <el-input v-model="form.homePage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="profile">
            <el-input v-model="form.profile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="tags">
            <el-input v-model="form.tags" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="photos">
            <el-input v-model="form.photos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lat">
            <el-input v-model="form.lat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lng">
            <el-input v-model="form.lng" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createdAt" prop="createdAt">
            <el-input v-model="form.createdAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updatedAt" prop="updatedAt">
            <el-input v-model="form.updatedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="isStar">
            <el-input v-model="form.isStar" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="companyScaleId">
            <el-input v-model="form.companyScaleId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="companyFinancingId">
            <el-input v-model="form.companyFinancingId" style="width: 370px;" />
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
          <el-form-item label="industryId">
            <el-input v-model="form.industryId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="welfareId">
            <el-input v-model="form.welfareId" style="width: 370px;" />
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
        <el-table-column prop="name" label="name" />
        <el-table-column prop="logo" label="logo" />
        <el-table-column prop="address" label="address" />
        <el-table-column prop="homePage" label="homePage" />
        <el-table-column prop="profile" label="profile" />
        <el-table-column prop="tags" label="tags" />
        <el-table-column prop="photos" label="photos" />
        <el-table-column prop="lat" label="lat" />
        <el-table-column prop="lng" label="lng" />
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
        <el-table-column prop="isStar" label="isStar" />
        <el-table-column prop="companyScaleId" label="companyScaleId" />
        <el-table-column prop="companyFinancingId" label="companyFinancingId" />
        <el-table-column prop="stateId" label="stateId" />
        <el-table-column prop="cityId" label="cityId" />
        <el-table-column prop="districtId" label="districtId" />
        <el-table-column prop="industryId" label="industryId" />
        <el-table-column prop="welfareId" label="welfareId" />
        <el-table-column v-permission="['admin','Company:edit','Company:del']" label="操作" width="150px" align="center">
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
import crudCompany from '@/api/Company'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, name: null, logo: null, address: null, homePage: null, profile: null, tags: null, photos: null, lat: null, lng: null, createdAt: null, updatedAt: null, isStar: null, companyScaleId: null, companyFinancingId: null, stateId: null, cityId: null, districtId: null, industryId: null, welfareId: null }
export default {
  name: 'Company',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'company', url: 'api/Company', sort: 'id,desc', crudMethod: { ...crudCompany }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'Company:add'],
        edit: ['admin', 'Company:edit'],
        del: ['admin', 'Company:del']
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
