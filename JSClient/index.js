$(document).ready(function () {

    let selectedTenant = null;
    let user = null;

    const tenantDropdown = document.getElementById("tenantDropdown");
    const joinGroupButton = document.getElementById("joinGroupButton");
    const chatWindow = document.getElementById("chatWindow");
    const userId = document.getElementById("userId");
    const chatTextbox = document.getElementById("chatTextbox");
    const chatButton = document.getElementById("chatButton");
    const chatMessages = document.getElementById("chatMessages");
    const chatMessageTitle = document.getElementById("chatMessageTitle");
    const chatMessageList = document.getElementById("chatMessageList");
    
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7254/chatHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

    tenantDropdown.addEventListener("change", (event) => {
        selectedTenant = event.target.value;
        joinGroupButton.disabled = !selectedTenant; // Enable button only if tenant selected
        chatWindow.style.display = selectedTenant ? "block" : "none"; // Show chatWindow if tenant selected
        chatMessages.style.display = selectedTenant ? "block" : "none"; // Show chatWindow if tenant selected
    });

    joinGroupButton.addEventListener("click", () => {
        connection.invoke("JoinGroup", selectedTenant);
        tenantDropdown.disabled = true;
        joinGroupButton.disabled = true;
        chatTextbox.disabled = false;
        chatButton.disabled = false;
        user = generateRandomString();
        userId.innerText = 'User: ' + user;
    });

    chatButton.addEventListener("click", () => {
        connection.invoke("SendMessage", chatTextbox.value + " by user " + user, selectedTenant);
    });

    async function start() {
        try {
            await connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(start, 5000);
        }
    };

    connection.on("ReceiveMessage", (message) => {
        chatMessageTitle.textContent = 'List of Messages in the group: ' + selectedTenant;
        
        const newListItem = document.createElement("li");
        newListItem.textContent = message;
        chatMessageList.appendChild(newListItem);
        // const messageElement = document.createElement("p");
        // messageElement.textContent = `${message}`;
        // chatWindow.appendChild(messageElement);
    });

    connection.onclose(async () => {
        await start();
    });

    // Start the connection.
    start();
});

function generateRandomString(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}