# SignalR Chat Example to connect Tenants

## Overview

This repository demonstrates the integration flow from an angular and vanilla js clients to communicate chat messages between each other in real time using a [SignalRCore](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0) group hub.

## Prerequisites

- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/community/) installed.
- [NPM](https://www.npmjs.com/) package manager installed.
- An azure SignalR service (optional).

## Setup

1. Clone o download this repository:

   ```bash
   git clone https://github.com/milocko07/signalr-tenants
2. Open and run [SignalR.HubService](https://github.com/milocko07/signalr-tenants/tree/Seed/SignalR.HubService/) Web Api project.
3. Copy the localhost URL that you got when that service when is running.
4. Open the [Angular client app](https://github.com/milocko07/signalr-tenants/tree/Seed/AngularClientApp) with VS 2022 if you prefer.
5. Change [Line 16](https://github.com/milocko07/signalr-tenants/blob/Seed/AngularClientApp/src/services/signalr.service.ts) with the correct localhost SignalR URL.
6. Compile and run the angular client app (if you did it with VS).
7. Open the [js file for the vanilla client app](https://github.com/milocko07/signalr-tenants/blob/Seed/JSClient/index.js) with any editor of you preferece and change line 17 with the correct localhost signalR service URL (same as you did for the angular app).
8. Open a OS prompt, go to the root when you downloaded the JS client app project and run the command **serve** (that will enable the local server for js).

   ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/cc5714cc-1ad9-49a1-ba76-16f00d803ff0)
10. To enable CORS: Stop the SignalR.HubService and in [Line 17](https://github.com/milocko07/signalr-tenants/blob/Seed/SignalR.HubService/Program.cs) replace the corresponding angular and js localhost URLS.
11. Run again the SignalR service.
12. Open the [JS index.html](https://github.com/milocko07/signalr-tenants/blob/Seed/JSClient/index.html) with any browser of you preferece.
13. Reopen the angular app as well.
14. You should see something similar to next flow:
    ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/b9c3dbf4-eeb2-4e9f-9229-2fb1e6e8b5b5)
    

    ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/59d7c11d-9757-422c-8f2e-c8d9d178fb44)

    ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/437f4b7a-0339-4658-a99e-67b5a9ccef12)
    

    ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/cbaebd09-0234-47c7-8930-e954ac1ed76e)

    ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/571c34a8-072f-4a2e-a8fe-785e3fb59714)

## Setup with Azure SignalR Service

1. Same steps as above but adding the AddAzureSignalR() method into the pipeline in [line 9](https://github.com/milocko07/signalr-tenants/blob/Seed/SignalR.HubService/Program.cs).
2. Then follow the [official guide]([url](https://learn.microsoft.com/en-us/azure/azure-signalr/signalr-quickstart-dotnet-core) to set local credentials that basically are two steps:
   dotnet user-secrets init
   dotnet user-secrets set Azure:SignalR:ConnectionString "<Your azure signalr connection string>"
3. Then run again the service and the client apps.
4. You should see something similar to this:

   ![image](https://github.com/milocko07/signalr-tenants/assets/37205551/04455152-a590-40cc-b3e1-ff4acf4d6874)

5. Finally you can monitor the SignalR service in the azure portal.
  




    


