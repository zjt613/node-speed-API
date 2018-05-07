/**
 * 添加导航
 */
let ajax = global.custom.ajax;
ajax({
    type: 'post',
    path: '/api/add/nav'
  }, function (param, req, res) {
    global.custom.plugins.verifyUse({
      // userToken: param.userToken,
      limit: [1],
      userId: param.userId,
    }, res, () => {
      /**
       * 添加父级
       */
      if (param.type == 1) {
        let sql = "INSERT INTO nav(id,p_id,title,sort_index,c_time,m_time) VALUES(0,?,?,?,?,?)"
        let sqlParams = [
          0,
          param.title,
          parseInt(param.sortIndex) ? parseInt(param.sortIndex) : 100,
          new Date(),
          new Date()
        ];
        this.query(sql, sqlParams, (err, result) => {
          if (err) {
            global.custom.plugins.systemError(res, err)
            return;
          }
          let r1 = global.custom.plugins.hump(result, {
            deleteParam: ['cTime', 'mTime', 'isEnable', 'sortIndex']
          })
          res.send({
            status: 200,
            data: {
              message: '新增父级分类成功',
              data: {
                id: r1.insertId,
                pId: 0,
                title: param.title
              }
            }
          })
        })
        return
      }
      /**
       * 添加子集
       */
      if (param.type == 2) {
        // 检查是否可以新增导航 开始
        let selSql = 'SELECT * FROM nav WHERE p_id = ? AND id = ?'
        let selSqlParams = [
          0,
          param.id
        ]
        this.query(selSql, selSqlParams, (err, result) => {
          if (err) {
            global.custom.plugins.systemError(res, err)
            return;
          }
          if (result.length > 0) {
            addFn.call(this)
          } else {
            res.send({
              status: 5001,
              error: '新增导航失败'
            })
          }
        })

        function addFn() {
          let sql = "INSERT INTO nav(id,p_id,title,sort_index,c_time,m_time) VALUES(0,?,?,?,?,?)"
          let id = parseInt(param.id) ? parseInt(param.id) : null
          if (!id) {
            res.send({
              status: 5001,
              error: '没有传递父级ID'
            })
            return
          }
          let sqlParams = [
            id,
            param.title,
            parseInt(param.sortIndex) ? parseInt(param.sortIndex) : 100,
            new Date(),
            new Date()
          ]
          this.query(sql, sqlParams, (err, result) => {
            if (err) {
              global.custom.plugins.systemError(res, err)
              return;
            }
            let r1 = global.custom.plugins.hump(result, {
              deleteParam: ['cTime', 'mTime', 'isEnable', 'sortIndex']
            })
            res.send({
              status: 200,
              data: {
                message: '新增子级分类成功',
                data: {
                  id: r1.insertId,
                  pId: 0,
                  title: param.title
                }
              }
            })
          })
        }

      }

    })
  }
)
