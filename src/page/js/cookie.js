function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let aarr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (aarr === document.cookie.match(reg)) {
    return unescape(aarr[2])
  } else {
    return null
  }
}

function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}

module.exports = function () {
  let userInfo = getCookie('userInfo')
  if (userInfo !== '' && userInfo === null) {
    // alert('Welcome again !')
  } else {
    userInfo = prompt('Please enter your name:', '')
    if (userInfo !== '' && userInfo !== null) {
      setCookie('userInfo', userInfo, 365)
    }
  }
  console.log(document.cookie)
}
