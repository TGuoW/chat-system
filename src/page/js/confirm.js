export default function (msg) {
  return new Promise(function (resolve, reject) {
    let bg = document.createElement('div')
    bg.style.cssText = 'position:fixed; width:500px; height:auto; background:#fff; top:100px; left:0; right: 0; margin: 0 auto;border: 1px solid #9c9c9c; box-shadow:0 0 10px #888888; border-radius:5px;'

    let title = document.createElement('div')
    title.innerText = '提示'
    title.style = 'font-size:18px; padding:8px 16px; color:#9c9c9c'

    let closeThis = function () {
      bg.remove()
    }

    let close = document.createElement('span')
    close.onclick = closeThis
    close.className = 'closeDialog'
    document.styleSheets[0].insertRule(".closeDialog::before{content: '\u2716';}", 0)
    document.styleSheets[0].insertRule('.closeDialog:hover{color: #fff;background: rgb(224, 69, 69);}', 0)
    close.style.cssText = 'position: absolute; cursor: pointer; color: rgb(92, 92, 92); line-height: 32px; text-align: center; height: 30px; width: 40px; font-size: 18px; padding: 1px; top: 0px; right: 0px;'
    title.appendChild(close)

    let confirmText = document.createElement('p')
    confirmText.innerText = msg
    confirmText.style.cssText = 'padding:20px 40px;'

    let btnGroup = document.createElement('div')
    let enterBtn = document.createElement('button')
    let cancelBtn = document.createElement('button')
    btnGroup.style.cssText = 'width:100%; height:50px;'

    let btnStyle = 'outline:none;margin:10px;padding: 4px 20px;float:right;border:none;cursor:pointer;'
    enterBtn.innerText = '确认'
    enterBtn.type = 'button'
    enterBtn.style.cssText = btnStyle + 'background:#09bb07;color:#fff'
    enterBtn.onmouseover = function () {
      enterBtn.style.background = '#129611'
    }
    enterBtn.onmouseout = function () {
      enterBtn.style.background = '#09bb07'
    }
    enterBtn.onclick = function () { // resolve
      resolve()
      closeThis()
    }

    cancelBtn.innerText = '取消'
    cancelBtn.type = 'button'
    cancelBtn.style.cssText = btnStyle + 'background:#e7e7e7;color:#000'
    cancelBtn.onmouseover = function () {
      cancelBtn.style.background = '#d2d2d2'
    }
    cancelBtn.onmouseout = function () {
      cancelBtn.style.background = '#e7e7e7'
    }
    cancelBtn.onclick = closeThis
    btnGroup.appendChild(cancelBtn)
    btnGroup.appendChild(enterBtn)

    bg.appendChild(title)
    bg.appendChild(confirmText)
    bg.appendChild(btnGroup)
    document.body.appendChild(bg)
  })
}
