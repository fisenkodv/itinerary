# Itinerary Web Application

## Projects
### Itinerary.Web
#### Steps to run ####
1. Restore both the .NET and NPM dependencies. Execute the following commands:
```
dotnet restore
npm install
```
2. Set an environment variable to tell ASP.NET to run in development mode:
* If you’re using PowerShell in Windows, execute ```$Env:ASPNETCORE_ENVIRONMENT = "Development"```
* If you’re using cmd.exe in Windows, execute ```setx ASPNETCORE_ENVIRONMENT "Development"```, and then restart your command prompt to make the change take effect
* If you’re using Mac/Linux, execute ```export ASPNETCORE_ENVIRONMENT=Development```
3. Start your the app by running ```dotnet run```. It will listen on port 5000, so point your browser to [http://localhost:5000](http://localhost:5000) to see it.

#### Invoking Webpack manually ####
The dev middleware feature means you don’t normally need to invoke Webpack manually. But if you do want to run Webpack manually on the command line, you can run the following:

```
npm run build-vendor:dev
npm run build:dev
```

The first line repackages all of your vendor dependencies, i.e., third party libraries such as Angular or React and all their dependencies. You only need to run this if you modify your third-party dependencies, such as if you update to a newer version of your chosen SPA framework.

The second line (running webpack with no parameters) rebuilds your own application code. Separating your own application code from your vendor dependencies makes your builds much faster.

These commands will produce development-mode builds. If you want to produce production-mode builds, then also pass the flag ```--env.prod``` when invoking Webpack.

#### Publishing for deployment ####

To deploy your application to production, you can use the publish feature which is built into dotnet command line tooling and Visual Studio. For example, on the command line, run:

```
dotnet publish -c Release
```

This will produce a ready-to-deploy production build of your application. It includes .NET code compiled in Release mode, and invokes Webpack with the ```--env.prod``` flag to produce a production build of front-end assets. Equivalently, you can use the Publish option from Visual Studio’s Build menu.

#### Itinerary API ####
Use [Postman](https://www.getpostman.com/) to see api collection from ```docs\Itinerary.postman_collection.json```

## Google API
* Places API ```AIzaSyAHtJrpKyxsARFESBwI-a0qaWjsD5ZW-3w```
* Google Maps JavaScript API ```AIzaSyBkxFjVilFXxTMLb6JxL2x-AGeCOLIRO1M```

## Guidelines ##
1. [Overall structural guidelines](https://angular.io/docs/ts/latest/guide/style-guide.html#!#file-tree)

## Deployment to Digital Ocean

### Create build
```dotnet publish src/Itinerary.Web/Itinerary.Web.csproj -o ../../release/```

### Copy to Digital Ocean
```rsync -a release/ root@174.138.76.175:/var/www/itinerary -v```

### Copy nginx config from/to configs dir
From ```rsync -a root@174.138.76.175:/etc/nginx/nginx.conf .```

To ```rsync -a nginx.conf root@174.138.76.175:/etc/nginx/nginx.conf```

### Copy supervisor config from/to configs dir
From ```rsync -a root@174.138.76.175:/etc/supervisor/conf.d/itinerary.conf .```

To ```rsync -a itinerary.conf root@174.138.76.175:/etc/supervisor/conf.d/itinerary.conf```
### Connect to Digital Ocean
```ssh root@174.138.76.175```

### Pathes
nginx ```/etc/nginx/nginx.conf```

supervisor ```/etc/supervisor/conf.d/itinerary.conf```

## Links
* [Microsoft ASP.NET Core JavaScript Services](https://github.com/aspnet/JavaScriptServices)
* [Building Single Page Applications on ASP.NET Core with JavaScriptServices](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/)
