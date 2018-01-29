import $ from 'jquery'

$('#submit').click(function () {
  if ($('#input')[0].value !== '') {
    $.ajax({
      type: 'POST',
      url: 'http://39.108.221.165:3000/sendMsg',
      data: {
        user1Name: $('#userName')[0].innerText,
        user2Name: $('#userName-contact-now')[0].innerText,
        text: $('#input')[0].value
      },
      success: function (msg) {
        let ul = $('#' + $('#userName-contact-now')[0].innerText)[0]
        let li = document.createElement('li')
        let div = document.createElement('div')
        let span = document.createElement('span')
        let img = document.createElement('img')
        img.src = 'http://img5.imgtn.bdimg.com/it/u=12867320,655225767&fm=27&gp=0.jpg'
        li.id = 'send'
        span.id = 'text'
        span.innerText = $('#input')[0].value
        div.appendChild(span)
        li.appendChild(img)
        li.appendChild(div)
        ul.appendChild(li)
        $('#history').scrollTop($('#history')[0].scrollHeight)
        $('#input')[0].value = ''
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status)
        console.log(XMLHttpRequest.readyState)
        console.log(textStatus)
      }
    })
  } else {
    console.log('error input!')
    $('#tip').css('display', 'block')
    setTimeout(function () {
      $('#tip').css('display', 'none')
    }, 2000)
  }
})

function createContactEle (res) {
  let ul = document.createElement('ul')
  ul.id = res.userName
  ul.style.display = 'none'
  $('#history').append(ul)

  let li = document.createElement('li')
  let img = document.createElement('img')
  let div1 = document.createElement('div')
  let div2 = document.createElement('div')
  let span = document.createElement('span')
  let p1 = document.createElement('p')
  let p2 = document.createElement('p')
  img.src = res.imgUrl
  p1.innerText = res.userName
  // span.innerText = res.lastTime
  span.innerText = '12:13'
  p2.innerText = res.lastMsg
  li.id = res.userName + '-contact'
  div1.appendChild(p1)
  div1.appendChild(p2)
  div2.appendChild(span)
  li.appendChild(img)
  li.appendChild(div1)
  li.appendChild(div2)
  li.onclick = function () {
    routerPush(li)
  }
  $('#contact')[0].firstElementChild.append(li)
}

function routerPush (msg) {
  $('#userName-contact-now')[0].innerText = msg.children[1].children[0].innerText
  let id = '#' + msg.children[1].children[0].innerText
  $('#history').children().css('display', 'none')
  $(id).css('display', 'block')
  $('#history').scrollTop($('#history')[0].scrollHeight)
}

const getContact = function () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'GET',
      url: 'http://39.108.221.165:3000/getContact',
      data: {
        userID: $('#userID')[0].innerText
      },
      dataType: 'json',
      success: function (msg) {
        console.log(msg)
        for (let o in msg) {
          createContactEle(msg[o])
        }
      },
      complete: function (msg) {
        resolve()
      }
    })
  })
}

$('#signUp').click(function () {
  getMsg()
})

function getMsg () {
  $.ajax({
    type: 'GET',
    async: true,
    data: {
      userName: $('#userName')[0].innerText
    },
    url: 'http://39.108.221.165:3000/getMsg',
    dataType: 'json',
    success: function (msg) {
      // console.log(msg)
      for (let p in msg) {
        let ul = $('#' + msg[p].user1)[0]
        // ul.id = msg[p].user1
        // ul.style.display = 'none'
        for (let o in msg[p].history) {
          let li = document.createElement('li')
          let div = document.createElement('div')
          let span = document.createElement('span')
          let img = document.createElement('img')
          if (msg[p].history[o].status === 'receive') {
            img.src = msg[p].user2ImgUrl
            li.id = 'receive'
          } else {
            img.src = msg[p].user1ImgUrl
            li.id = 'send'
          }
          span.id = 'text'
          span.innerText = msg[p].history[o].text
          div.appendChild(span)
          li.appendChild(img)
          li.appendChild(div)
          ul.appendChild(li)
          $('#history').scrollTop($('#history')[0].scrollHeight)
          if (Number(o) === msg[p].history.length - 1) {
            $('#' + msg[p].user1 + '-contact').children().children()[1].innerText = msg[p].history[o].text
            $('#' + msg[p].user1 + '-contact').children().children()[2].innerText = msg[p].history[o].time
          }
        }
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status)
      console.log(XMLHttpRequest.readyState)
      console.log(textStatus)
    }
  })
}

function init () {
  // getContact()
  getContact().then(function (data) {
    setInterval(function () {
      getMsg()
      // console.log(1)
    }, 1000)
  }, function (error) {
    console.error('出错了', error)
  })
}

export default init
