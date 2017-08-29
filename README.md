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

#### Database Migrations ####
Create Itinerary initial migration
```
dotnet ef migrations add InitialItineraryDbMigration -c ItineraryDbContext -o EntityFramework/Migrations/Itinerary
```
Create IdentityServer Configuration migration
```
dotnet ef migrations add InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o EntityFramework/Migrations/IdentityServer/ConfigurationDb
```
Create IdentityServer PersistedGrant migration
```
dotnet ef migrations add InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o EntityFramework/Migrations/IdentityServer/PersistedGrantDb
```

## Google API
[API Credentials](https://console.cloud.google.com/apis/credentials?project=itinerary-1488041928048)

## Deployment to Digital Ocean

### Create build
```
dotnet publish src/Itinerary.Web/Itinerary.Web.csproj -o ../../release/
```

### Connect to Digital Ocean
```
ssh root@itinerary.site
```

### Copy release to Digital Ocean
macOS, Linux: 
```
rsync -a release/ root@itinerary.site:/var/www/itinerary -v
```
Windows: 
```
pscp -r -v release\ root@itinerary.site:/var/www/itinerary
```

### Copy nginx config from/to configs dir
__From Digital Ocean to dev environment__:

macOS, Linux: 
```
rsync -a root@1itinerary.site:/etc/nginx/nginx.conf .
```
Windows:
```
pscp root@itinerary.site:/etc/nginx/nginx.conf .
```

__To Digital Ocean from dev environment__:
macOS, Linux:
```
rsync -a nginx.conf root@itinerary.site:/etc/nginx/nginx.conf
```

### Copy supervisor config from/to configs dir
__From Digital Ocean to dev environment__:
macOS, Linux:
```
rsync -a root@itinerary.site:/etc/supervisor/conf.d/itinerary.conf .
```
Windows:
```
pscp root@itinerary.site:/etc/supervisor/conf.d/itinerary.conf .
```

__To Digital Ocean from dev environment__:
macOS, Linux:
```
rsync -a itinerary.conf root@itinerary.site:/etc/supervisor/conf.d/itinerary.conf
```

### Pathes
nginx ```/etc/nginx/nginx.conf```

supervisor ```/etc/supervisor/conf.d/itinerary.conf```

### Certificates
All certificates are placed: ```/etc/letsencrypt/live/itinerary.site/```

To generate certificates: 
```
letsencrypt certonly  --webroot --webroot-path=/var/www/itinerary_cert -d itinerary.site -d www.itinerary.site -d itinerary.reise -d www.itinerary.reise
```

## Guidelines ##
1. [Overall structural guidelines](https://angular.io/docs/ts/latest/guide/style-guide.html#!#file-tree)

## Links
* [Microsoft ASP.NET Core JavaScript Services](https://github.com/aspnet/JavaScriptServices)
* [Building Single Page Applications on ASP.NET Core with JavaScriptServices](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/)
* [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
* [Generate Google Map Icon. Red](https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/generic-2-medium.png&highlight=ffffff,db4437,ffffff&color=ff000000?scale=1)
* [Generate Google Map Icon. Blue](https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/generic-2-medium.png&highlight=ffffff,4285F4,ffffff&color=ff000000?scale=3)
* [Как добавить HTTPS в nginx на Ubuntu Server (16.04 и выше)](https://900913.ru/2017/06/09/kak-dobavit-ssl-na-ubuntu-server-16-04-i-vyshe/)
* [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
