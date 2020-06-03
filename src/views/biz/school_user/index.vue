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
          <el-form-item label="provider" prop="provider">
            <el-input v-model="form.provider" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="uid" prop="uid">
            <el-input v-model="form.uid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="encryptedPassword" prop="encryptedPassword">
            <el-input v-model="form.encryptedPassword" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="resetPasswordToken">
            <el-input v-model="form.resetPasswordToken" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="resetPasswordSentAt">
            <el-input v-model="form.resetPasswordSentAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="allowPasswordChange">
            <el-input v-model="form.allowPasswordChange" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="rememberCreatedAt">
            <el-input v-model="form.rememberCreatedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="confirmationToken">
            <el-input v-model="form.confirmationToken" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="confirmedAt">
            <el-input v-model="form.confirmedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="confirmationSentAt">
            <el-input v-model="form.confirmationSentAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="unconfirmedEmail">
            <el-input v-model="form.unconfirmedEmail" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="failedAttempts" prop="failedAttempts">
            <el-input v-model="form.failedAttempts" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="unlockToken">
            <el-input v-model="form.unlockToken" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lockedAt">
            <el-input v-model="form.lockedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="signInCount">
            <el-input v-model="form.signInCount" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="currentSignInAt">
            <el-input v-model="form.currentSignInAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lastSignInAt">
            <el-input v-model="form.lastSignInAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="currentSignInIp">
            <el-input v-model="form.currentSignInIp" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="lastSignInIp">
            <el-input v-model="form.lastSignInIp" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="nickname">
            <el-input v-model="form.nickname" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="avatar">
            <el-input v-model="form.avatar" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="mobile">
            <el-input v-model="form.mobile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="minaOpenid">
            <el-input v-model="form.minaOpenid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="wxUnionid">
            <el-input v-model="form.wxUnionid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="tokens">
            <el-input v-model="form.tokens" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createdAt" prop="createdAt">
            <el-input v-model="form.createdAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="updatedAt" prop="updatedAt">
            <el-input v-model="form.updatedAt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="schoolId">
            <el-input v-model="form.schoolId" style="width: 370px;" />
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
        <el-table-column prop="provider" label="provider" />
        <el-table-column prop="uid" label="uid" />
        <el-table-column prop="encryptedPassword" label="encryptedPassword" />
        <el-table-column prop="resetPasswordToken" label="resetPasswordToken" />
        <el-table-column prop="resetPasswordSentAt" label="resetPasswordSentAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.resetPasswordSentAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="allowPasswordChange" label="allowPasswordChange" />
        <el-table-column prop="rememberCreatedAt" label="rememberCreatedAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.rememberCreatedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="confirmationToken" label="confirmationToken" />
        <el-table-column prop="confirmedAt" label="confirmedAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.confirmedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="confirmationSentAt" label="confirmationSentAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.confirmationSentAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unconfirmedEmail" label="unconfirmedEmail" />
        <el-table-column prop="failedAttempts" label="failedAttempts" />
        <el-table-column prop="unlockToken" label="unlockToken" />
        <el-table-column prop="lockedAt" label="lockedAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.lockedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="signInCount" label="signInCount" />
        <el-table-column prop="currentSignInAt" label="currentSignInAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.currentSignInAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lastSignInAt" label="lastSignInAt">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.lastSignInAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currentSignInIp" label="currentSignInIp" />
        <el-table-column prop="lastSignInIp" label="lastSignInIp" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="nickname" label="nickname" />
        <el-table-column prop="avatar" label="avatar" />
        <el-table-column prop="email" label="email" />
        <el-table-column prop="mobile" label="mobile" />
        <el-table-column prop="minaOpenid" label="minaOpenid" />
        <el-table-column prop="wxUnionid" label="wxUnionid" />
        <el-table-column prop="tokens" label="tokens" />
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
        <el-table-column prop="schoolId" label="schoolId" />
        <el-table-column v-permission="['admin','SchoolUser:edit','SchoolUser:del']" label="操作" width="150px" align="center">
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
import crudSchoolUser from '@/api/SchoolUser'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, provider: null, uid: null, encryptedPassword: null, resetPasswordToken: null, resetPasswordSentAt: null, allowPasswordChange: null, rememberCreatedAt: null, confirmationToken: null, confirmedAt: null, confirmationSentAt: null, unconfirmedEmail: null, failedAttempts: null, unlockToken: null, lockedAt: null, signInCount: null, currentSignInAt: null, lastSignInAt: null, currentSignInIp: null, lastSignInIp: null, name: null, nickname: null, avatar: null, email: null, mobile: null, minaOpenid: null, wxUnionid: null, tokens: null, createdAt: null, updatedAt: null, schoolId: null }
export default {
  name: 'SchoolUser',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'school_user', url: 'api/SchoolUser', sort: 'id,desc', crudMethod: { ...crudSchoolUser }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'SchoolUser:add'],
        edit: ['admin', 'SchoolUser:edit'],
        del: ['admin', 'SchoolUser:del']
      },
      rules: {
        provider: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        uid: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        encryptedPassword: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        failedAttempts: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
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
