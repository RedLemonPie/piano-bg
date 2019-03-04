<template>
  <section class="list-wrap">
    <div class="list" v-if="list.length > 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        list: [],
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '真实姓名',
            key: 'real_name'
          },
          {
            title: '班级',
            key: 'school_class'
          },
          {
            title: '学号',
            key: 'school_id'
          },
          {
            title: '积分',
            key: 'score'
          },
          {
            title: '信用',
            key: 'credit'
          },
          {
            title: '创建时间',
            key: 'createdAt'
          },
          {
            title: '更新时间',
            key: 'updatedAt'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                // h('Button', {
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px'
                //   },
                //   on: {
                //     click: () => {
                //       this.show(params.index)
                //     }
                //   }
                // }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
      }
    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getUserList()
    },
    methods: {
      ...mapActions({
        userList: 'user/userList'
      }),
      // 获取用户列表
      async getUserList() {
        try {
          const ret = await this.userList();
          this.list = ret.data.data;
        } catch (e) {

        }
      },
      async deleteUser(id) {
        try {
          const ret = await this.deleteUser(id);
          this.list = ret.data.data;
        } catch (e) {

        }
      },
      show(index) {
        console.log(index+1);
      },
      remove(index) {
        console.log(index+1);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
