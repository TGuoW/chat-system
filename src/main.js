import './page/css/index.scss'
import index from './page/js/index'
import './static/HYQiHeiX1-55W.ttf'
import $ from 'jquery'

$(function () {
  document.onload = $(function () {
    index.checkCookie()
  })
  let bg = document.createElement('div')
  bg.className = 'logIn-bg'
  bg.onclick = function () {
    $('#log').css('display', 'none')
    $('#edit-information').css('display', 'none')
    $('.logIn-bg').css('display', 'none')
  }
  $('#app').append(bg)
})

function createLogin () {
  let lUserNameInput = document.createElement('input')
  let lPasswordInput = document.createElement('input')
  let loginBtn = document.createElement('button')
  lUserNameInput.id = 'lUserName'
  lUserNameInput.className = 'inputMsg'
  lUserNameInput.name = 'lUserName'
  lUserNameInput.placeholder = '请输入用户名'
  lPasswordInput.id = 'lPassword'
  lPasswordInput.className = 'inputMsg'
  lPasswordInput.name = 'lPassword'
  lPasswordInput.placeholder = '请输入密码'
  loginBtn.id = 'login'
  loginBtn.className = 'log-btn'
  loginBtn.innerText = '登录'
  loginBtn.onclick = login
  $('#message').append(lUserNameInput)
  $('#message').append(lPasswordInput)
  $('#message').append(loginBtn)

  let rUserNameInput = document.createElement('input')
  let rPasswordInput = document.createElement('input')
  let registerBtn = document.createElement('button')
  rUserNameInput.id = 'rUserName'
  rUserNameInput.className = 'inputMsg'
  rUserNameInput.name = 'rUserName'
  rUserNameInput.placeholder = '请输入用户名'
  rUserNameInput.style.display = 'none'

  rPasswordInput.id = 'rPassword'
  rPasswordInput.className = 'inputMsg'
  rPasswordInput.name = 'rPassword'
  rPasswordInput.placeholder = '请输入密码'
  rPasswordInput.style.display = 'none'

  registerBtn.id = 'register'
  registerBtn.className = 'log-btn'
  registerBtn.style.display = 'none'
  registerBtn.innerText = '注册'
  registerBtn.onclick = login

  $('#message').append(rUserNameInput)
  $('#message').append(rPasswordInput)
  $('#message').append(registerBtn)
}

function showOneTab (res) {
  if (res) {
    $('#loginText').addClass('active-tab')
    $('#registerText').removeClass('active-tab')
  } else {
    $('#loginText').removeClass('active-tab')
    $('#registerText').addClass('active-tab')
  }
  $('#lUserName').css('display', res ? 'block' : 'none')
  $('#lPassword').css('display', res ? 'block' : 'none')
  $('#login').css('display', res ? 'block' : 'none')
  $('#rUserName').css('display', !res ? 'block' : 'none')
  $('#rPassword').css('display', !res ? 'block' : 'none')
  $('#register').css('display', !res ? 'block' : 'none')
}

$('#loginText').click(function () {
  showOneTab(true)
})

$('#registerText').click(function () {
  showOneTab(false)
})

function login () {
  $.ajax({
    type: 'GET',
    data: {
      'userName': $('#lUserName')[0].value,
      'password': $('#lPassword')[0].value
    },
    url: 'http://39.108.221.165:3000/login',
    // url: '/login',
    dataType: 'json',
    success: function (msg) {
      console.log(msg)
      if (msg.length > 0) {
        $('#userName')[0].innerText = msg[0].userName
        $('#userID')[0].innerText = msg[0].id
        $('#log').css('display', 'none')
        $('.logIn-bg').css('display', 'none')
      } else {
        console.log('用户名或密码错误')
      }
      index.getHistory()
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status)
      console.log(XMLHttpRequest.readyState)
      console.log(textStatus)
    }
  })
}

$('#portrait').click(function () {
  $('.logIn-bg').css('display', 'block')
  $('#edit-information').css('display', 'block')
})

$('#input').focus(function () {
  $('#current').css('background', '#fff')
})

$('#input').blur(function () {
  $('#current').css('background', '#f5f5f5')
})

$('#logIn').click(function () {
  $('.logIn-bg').css('display', 'block')
  $('#log').css('display', 'block')
  $('#loginText').addClass('active-tab')
  if ($('#lPassword').length < 1) {
    createLogin()
  }
})
