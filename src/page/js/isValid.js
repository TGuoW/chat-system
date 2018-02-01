export default function () {
  let valid = true
  Array.prototype.forEach.call(arguments, element => {
    try {
      if (element.type === 'password') {
        if (element.data.value.length < 6 || element.data.value.length > 16) {
          throw new Error('密码长度在6到16之间')
        }
      } else if (element.type === 'text') {
        if (element.data.value.length === 0) {
          throw new Error('用户名不能为空')
        }
      }
    } catch (error) {
      let id = error.toString() + element.data.id
      if (!document.getElementById(id)) {
        let span = document.createElement('p')
        span.id = error.toString() + element.data.id
        span.innerText = error.toString().split(' ')[1]
        // span.style.width = '120px'
        span.style.fontSize = '12px'
        span.style.color = 'red'
        span.style.textAlign = 'left'
        span.style.padding = '4px 0px 4px 40px'
        span.style.marginBottom = '-23px'
        element.data.parentNode.insertBefore(span, element.data.nextSibling)
        element.data.onfocus = function () {
          span.remove()
        }
      }
      valid = false
    }
  })
  return valid
}
