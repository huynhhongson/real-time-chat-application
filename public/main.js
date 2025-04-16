const socket = io()

const clientTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    sendMessage()
})
socket.on('client-total', (data) => {
    clientTotal.innerText = `Total Clients: ${data}`
})

function sendMessage(){
    console.log(messageInput.value)
    const data = {
        
        message: messageInput.value,
        name: nameInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data)=>{
    // console.log(data)
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data){
    const element = `<li class="${isOwnMessage ? "message-right" : "message-left"}">
                    <p class="message">
                        ${data.message}
                        <span> ${data.name} HCM, ${moment(data.dateTime).fromNow()}</span>
                    </p>
                </li>`
    messageContainer.innerHTML += element
}