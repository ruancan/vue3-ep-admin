export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        sessionId: 'MWRhMTVmYjctZWU0NC00N2FmLWFkYTYtY2JhMzQ1MzI4OWQ1',
        message: '登录成功'
      }
    }
  }, {
    url: '/api/user/logout',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        message: '成功'
      }
    }
  }, {
    url: '/api/user/info',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        message: null,
        result: null,
        data: {
          nickname: 'ruancan',
          username: 'ruancan',
          email: '85345902@qq.com',
          token: 'ZjExZWJlMzMtY2Y4My00MzRhLWEyOGUtZDY3ZTE2NDY5Yjdh',
          menuElements: null,
          menus: [
            {
              key: '1',
              title: '首页'
            },
            {
              key: '2',
              title: '性能报表',
              children: [
                {
                  key: '3',
                  title: 'login接口'
                },
                {
                  key: '4',
                  title: 'userInfo接口'
                }
              ]
            },
            {
              key: '5',
              title: '表格',
              children: [
                {
                  key: '6',
                  title: '表格示例'
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    url: '/api/table/simple',
    method: 'post',
    response: (config) => {
      const body = config.body
      const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      },
      {
        key: '4',
        name: 'Joe Black4',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool']
      }, {
        key: '5',
        name: 'Jim Black5',
        age: 32,
        address: 'Sidney No. 5 Lake Park',
        tags: ['cool', 'teacher']
      }, {
        key: '7',
        name: 'Joe Black6',
        age: 32,
        address: 'Sidney No. 7 Lake Park',
        tags: ['cool']
      }, {
        key: '8',
        name: 'Jim Black7',
        age: 32,
        address: 'Sidney No. 8 Lake Park',
        tags: ['cool', 'teacher']
      }, {
        key: '10',
        name: 'Joe Black10',
        age: 32,
        address: 'Sidney No. 10 Lake Park',
        tags: ['cool', 'teacher']
      }]
      const result = data.filter((item) => {
        let flag = true
        if (body.tag) {
          flag = item.tags.indexOf(body.tag) > -1
        }
        if (flag && body.name) {
          flag = item.name.indexOf(body.name) > -1
        }
        // console.log(flag)
        return flag
      }
      )
      return {
        code: 20000,
        // 模拟后台分页取数时取当前（页数-1）*页面条数至页数*页面条数
        data: result.slice(body.pageSize * (body.current - 1), body.pageSize * body.current),
        total: result.length
      }
    }
  }, {
    url: '/api/table/tags',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: [{
          value: 'teacher',
          label: 'teacher'
        },
        {
          value: 'cool',
          label: 'cool'
        },
        {
          value: 'nice',
          label: 'nice'
        },
        {
          value: 'developer',
          label: 'developer'
        }, {
          value: 'loser',
          label: 'loser'
        }]
      }
    }
  }
]
