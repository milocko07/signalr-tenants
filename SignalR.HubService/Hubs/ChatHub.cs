using Microsoft.AspNetCore.SignalR;

namespace SignalR.HubService;

public class ChatHub : Hub
{
    //public async Task SendMessageToGroup(string user, string message)
    //    => await Clients.Group("Tenant Group").SendAsync("ReceiveMessage", user, message);

    private readonly IGroupManager _groupManager; // Optional dependency for managing groups (explained later)

    public ChatHub(IGroupManager groupManager = null) // Optional injection of IGroupManager
    {
        _groupManager = groupManager;
    }

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task SendMessage(string message, string groupName)
    {
        if (string.IsNullOrEmpty(groupName))
        {
            await Clients.All.SendAsync("receiveMessage", message);
        }
        else
        {
            await Clients.Group(groupName).SendAsync("receiveMessage", message);
        }
    }
}
