//1
var table, tr, td;
table = document.createElement("table");
table.border = "1";
table.style.fontSize = "16px"
table.style.textAlign = "center"
for (let i=0; i<10; i++) {
    tr = document.createElement("tr");
    for (let j=0; j<10; j++) {
        td = document.createElement("td");
        td.innerText = (i==0 ? j : (i*j==0 ? i : i*j))
        td.setAttribute("style", "padding: 9px")
        tr.appendChild(td)
    }
    table.appendChild(tr)
}
document.querySelector("body").appendChild(table)

//2
for (let td of table.querySelectorAll("td")) {
    td.onmouseover = function() {
        this.style.backgroundColor = "blue"
    }
    td.onmouseout = function() {
        this.style.backgroundColor = ""
    }
}

//3
for (let td of table.querySelectorAll("td")) {    
    td.onmouseover = function() {
        for (let i of table.children) {
            i.children[this.cellIndex].style.backgroundColor = "red"
           
        }
        this.parentElement.style.backgroundColor = "red"
    }
    td.onmouseout = function() {
        for (let i of td.parentElement.parentElement.children) {
            i.children[this.cellIndex].style.backgroundColor = ""
           
        }
        this.parentElement.style.backgroundColor = ""
    }
}

//4
var tegDiv = document.createElement("div")
tegDiv.innerText = "Введите первый параметр показаний электричества"
document.body.appendChild(tegDiv)
var tegInput = document.createElement("input");
tegInput.setAttribute("type","Number");
tegInput.id = "input1";
document.body.appendChild(tegInput);

tegDiv = document.createElement("div")
tegDiv.innerText = "Введите последний параметр показаний электричества"
document.body.appendChild(tegDiv)
tegInput = document.createElement("input");
tegInput.setAttribute("type","Number");
tegInput.id = "input2";
document.body.appendChild(tegInput);

var tegButton = document.createElement("button");
tegButton.innerText= "Paccчитать";
tegButton.id = "btn";
document.body.appendChild(tegButton);
tegDiv = document.createElement("div")
tegDiv.innerText = "Сумма к оплате:"
document.body.appendChild(tegDiv)

tegDiv = document.createElement("div");
tegDiv.id = "value";
document.body.appendChild(tegDiv);
tegDiv.style.height = "20px"

function electricityCalc (firstParEl = input1.value, lastParEl = input2.value) {
    if ((lastParEl - firstParEl) <= 100) {
        return (lastParEl - firstParEl)*0.9
    } else {
        return (lastParEl - firstParEl)*1.68
    }
}

btn.onclick = function () {
    let tegSpan = document.createElement("span")
    tegSpan.innerText = electricityCalc()
    value.innerText = ``;
    value.appendChild(tegSpan)
}

//5
tegInput = document.createElement("input");
tegInput.setAttribute("type","Number");
tegInput.id = "result";
document.body.appendChild(tegInput);
function calc() {
    result.value = electricityCalc()
}
input1.oninput = calc
input2.oninput = calc

//6
tegDiv = document.createElement("div");
tegDiv.id = "messageInterface";
document.body.appendChild(tegDiv);
tegDiv.style.paddingTop = "9px"
const socket = io("http://socketchat.fs.a-level.com.ua/");
const nickInput = document.createElement("input");
const messageInput = document.createElement("input");
const sendButton = document.createElement("button");
sendButton.innerText = "send";
messageInterface.appendChild(nickInput);
messageInterface.appendChild(messageInput);
messageInterface.appendChild(sendButton);
sendButton.onclick = function () {
    socket.emit("msg", {nick: nickInput.value, message: messageInput.value})

}
socket.on("msg", ({nick, message}) => {
    const messageOnElement = document.createElement("div")
    messageInterface.appendChild(messageOnElement)
    messageOnElement.innerHTML = `<b style = "color: grey">${nick}</b>: <i>${message}</i>`
})





















