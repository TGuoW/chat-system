import './page/css/index.scss'
import index from './page/js/index'
import './static/HYQiHeiX1-55W.ttf'
import confirm from './page/js/confirm'
import tips from './page/js/tips'
import isValid from './page/js/isValid'
import $ from 'jquery'

$(function () {
  document.onload = $(function () {
    index.checkCookie()
  })
  let bg = document.createElement('div')
  bg.className = 'logIn-bg'
  $('#app').append(bg)
  $('#loginText').addClass('active-tab')
  showLogin(true)
})

function showLogin (res) {
  $('.logIn-bg').css('display', res ? 'block' : 'none')
  $('#log').css('display', res ? 'block' : 'none')
  $('#register-form').css('display', !res ? 'block' : 'none')
}

document.getElementById('login').onclick = login
document.getElementById('register').onclick = register

$('.select label').click(function () {
  $(this).siblings('span').addClass('active')
  $(this).parent().siblings('div').find('span').removeClass('active')
})

function showOneTab (res) {
  if (res) {
    $('#log').css('height', '290px')
    $('#loginText').addClass('active-tab')
    $('#registerText').removeClass('active-tab')
  } else {
    $('#log').css('height', '440px')
    $('#loginText').removeClass('active-tab')
    $('#registerText').addClass('active-tab')
  }
  $('#login-form').css('display', res ? 'block' : 'none')

  $('#register-form').css('display', !res ? 'block' : 'none')
}

$('#loginText').click(function () {
  showOneTab(true)
})

$('#registerText').click(function () {
  showOneTab(false)
})

function login () {
  let valid = isValid(
    {data: document.getElementById('lUserName'), type: 'text'},
    {data: document.getElementById('lPassword'), type: 'password'}
  )
  if (valid) {
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
          $('.logIn-bg').css('opacity', '1')
          index.getHistory()
        } else {
          console.log('用户名或密码错误')
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status)
        console.log(XMLHttpRequest.readyState)
        console.log(textStatus)
      }
    })
  }
}

function register () {
  let valid = isValid(
    {data: document.getElementById('rUserName'), type: 'text'},
    {data: document.getElementById('rPassword'), type: 'password'},
    {data: document.getElementById('rCheckPassword'), type: 'password'}
  )
  if (valid) {
    let sex = document.getElementsByName('sex')
    let selectValue = null
    for (let i = 0; i < sex.length; i++) {
      if (sex[i].checked === true) {
        selectValue = sex[i].value
        break
      }
    }
    $.ajax({
      type: 'POST',
      data: {
        'userName': $('#rUserName')[0].value,
        'password': $('#rPassword')[0].value,
        'sex': selectValue,
        'bornTime': document.getElementById('bornTime').value
      },
      url: 'http://39.108.221.165:3000/register',
      dataType: 'json',
      success: function (msg) {
        console.log('注册成功！')
        tips('注册成功！').then(_ => {
          showOneTab(true)
        })
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status)
        console.log(XMLHttpRequest.readyState)
        console.log(textStatus)
      }
    })
  }
}

$('#portrait').click(function () {
  $('#edit-information').css('display', 'block')
})

$('#close').click(function () {
  $('#edit-information').css('display', 'none')
})

$('#input').focus(function () {
  $('#current').css('background', '#fff')
})

$('#input').blur(function () {
  $('#current').css('background', '#f5f5f5')
})

$('#signUp').click(function () {
  confirm('确认注销？').then(_ => {
    $.ajax({
      type: 'POST',
      url: 'http://39.108.221.165:3000/signUp',
      data: {
        userID: $('#userID')[0].innerText
      },
      dataType: 'json',
      success: function (msg) {
        showLogin(true)
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status)
        console.log(XMLHttpRequest.readyState)
        console.log(textStatus)
      }
    })
  })
})
