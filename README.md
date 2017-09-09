# Itinerary Web Application

## Development
### Itinerary.Api
Restore .NET dependencies:
```
dotnet restore
```
Set an environment variable to tell ASP.NET to run in development mode:
* If you’re using PowerShell in Windows, execute ```$Env:ASPNETCORE_ENVIRONMENT = "Development"```
* If you’re using cmd.exe in Windows, execute ```setx ASPNETCORE_ENVIRONMENT "Development"```, and then restart your command prompt to make the change take effect
* If you’re using Mac/Linux, execute ```export ASPNETCORE_ENVIRONMENT=Development```

Run Api application:
```
dotnet run
```

### Itinerary.Web

Run Web application:
```
npm start
```

### Database Migrations
Create Itinerary initial migration
```
dotnet ef migrations add InitialItineraryDbMigration -c ItineraryDbContext -o EntityFramework/Migrations/Itinerary
```

## Deployment

### Create build
```
dotnet publish src/Itinerary.Api/Itinerary.Api.csproj -o ../../release/
```

To create web application release build execute:
```
npm run build.prod.aot
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
rsync -a root@itinerary.site:/etc/nginx/nginx.conf .
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

### Certificates
All certificates are placed: ```/etc/letsencrypt/live/itinerary.site/```

To generate certificates:
* Comment line
```
return                      301 https://$host$request_uri;
``` 
in nginx.config
* Restart nginx ```service nginx restart```
* Call
```
letsencrypt certonly  --webroot --webroot-path=/var/www/itinerary_cert -d itinerary.site -d www.itinerary.site -d itinerary.reise -d www.itinerary.reise
```
* Uncomment line above
* Restart nginx

### Pathes
nginx ```/etc/nginx/nginx.conf```

supervisor ```/etc/supervisor/conf.d/itinerary.conf```

# Google API
[API Credentials](https://console.cloud.google.com/apis/credentials?project=itinerary-1488041928048)

# Guidelines ##
* [Overall structural guidelines](https://angular.io/docs/ts/latest/guide/style-guide.html#!#file-tree)

# Links
* [Microsoft ASP.NET Core JavaScript Services](https://github.com/aspnet/JavaScriptServices)
* [Building Single Page Applications on ASP.NET Core with JavaScriptServices](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/)
* [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
* [Generate Google Map Icon. Red](https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/generic-2-medium.png&highlight=ffffff,db4437,ffffff&color=ff000000?scale=1)
* [Generate Google Map Icon. Blue](https://www.google.com/maps/vt/icon/name=assets/icons/poi/quantum/container_background-2-medium.png,assets/icons/poi/quantum/container-2-medium.png,assets/icons/poi/quantum/generic-2-medium.png&highlight=ffffff,4285F4,ffffff&color=ff000000?scale=3)
* [Как добавить HTTPS в nginx на Ubuntu Server (16.04 и выше)](https://900913.ru/2017/06/09/kak-dobavit-ssl-na-ubuntu-server-16-04-i-vyshe/)
* [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
