export function decode (url) {
  return decodeURIComponent(decodeURIComponent(url))
}

export function getAllItem (param, key, o) {
  for (const paramElement of param) {
    if (paramElement.meta === undefined || paramElement.meta.length === 0) {
      o[paramElement[key]] = {
        componentName: '',
        keepAlive: false
      }
    } else {
      o[paramElement[key]] = paramElement.meta
    }
    if (paramElement.children) {
      getAllItem(paramElement.children, key, o)
    }
  }
}

function findOpenMenu (menus, name, open) {
  for (const menu of menus) {
    if (menu.children !== undefined) {
      open.push(menu.title)
      return findOpenMenu(menu.children, name, open)
    } else {
      if (menu.title === name) {
        return menu.title
      }
    }
  }
}

// 根据当前router的name反向查找select的菜单(key），和打开的父级菜单(title)
export function findMenu (menus, name) {
  const result = { open: [], select: [] }
  for (const menu of menus) {
    result.open = []
    if (menu.title === name) {
      result.select = [menu.title]
      break
    } else if (menu.children !== undefined) {
      result.open.push(menu.title)
      const key = findOpenMenu(menu.children, name, result.open)
      if (key) {
        result.select = [key]
        break
      }
    }
  }
  return result
}
//
// const x = [{
//   key: '1',
//   title: '首页'
// }, {
//   key: '2',
//   title: '报表',
//   children: [{
//     key: '3',
//     title: '试算性能'
//   }, {
//     key: '4',
//     title: '预占性能'
//   }, {
//     key: '5',
//     title: '实占性能',
//     children: [{
//       key: '6',
//       title: '6'
//     },
//     {
//       key: '7',
//       title: '7'
//     },
//     {
//       key: '8',
//       title: '8',
//       children: [{
//         key: '9',
//         title: '9'
//       },
//       {
//         key: '10',
//         title: '10'
//       }]
//     }]
//   }
//   ]
// },
// {
//   key: '11',
//   title: '11'
// }
// ]
//
// console.log(findMenu(x, '9'))
