const socket = io()

const clientTotal = document.getElementById('client-total')

socket.on('client-total', (data) => {
    clientTotal.innerText = `Total Clients: ${data}`
})