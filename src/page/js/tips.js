export default function (msg) {
  return new Promise(function (resolve, reject) {
    let div = document.createElement('div')
    div.style.cssText = 'position:fixed; z-index:20; width:500px; height:auto; background:#fff; top:200px; left:0; right: 0; margin: 0 auto;border: 1px solid #9c9c9c; box-shadow:0 0 10px #888888; border-radius:5px;'

    let title = document.createElement('div')
    title.innerText = '提示'
    title.style = 'font-size:18px; padding:8px 16px; color:#9c9c9c'

    let closeThis = function () {
      bg.remove()
      resolve()
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
    enterBtn.onclick = closeThis // resolve

    btnGroup.appendChild(enterBtn)

    div.appendChild(title)
    div.appendChild(confirmText)
    div.appendChild(btnGroup)

    let bg = document.createElement('div')
    bg.id = 'asdasd'
    bg.style.cssText = 'position:fixed; z-index:20; height:100%; width:100%; top:0;'
    bg.appendChild(div)
    document.body.appendChild(bg)
  })
}
