REM Creating a Root Certificate
makecert -r -n "CN=ItineraryRoot" -pe -sv ItineraryRoot.pvk -a sha1 -len 2048 -b 01/01/2017 -e 01/01/2030 ItineraryRoot.cer

REM Creating an SSL Certificate
REM makecert -iv ItineraryRoot.pvk -ic ItineraryRoot.cer -n "CN=web.local" -pe -sv web.local.pvk -a sha1 -len 2048 -b 01/01/2017 -e 01/01/2030 -sky exchange web.local.cer -eku 1.3.5.1.5.5.7.3.1

pvk2pfx -pvk ItineraryRoot.pvk -spc ItineraryRoot.cer -pfx ItineraryRoot.pfx