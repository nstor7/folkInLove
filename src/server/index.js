import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'


const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
  const seo = activeRoute.seo
  ?  activeRoute.seo(req.url.split('/')[2])
  :  {title:'', description:''}

  const chimpScript = activeRoute.chimpScript
  ?  activeRoute.chimpScript
  :  ''

  const fbEvent = activeRoute.fbEvent
  ?  activeRoute.fbEvent(req.url.split('/')[2])
  :  ''
  
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

  
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-118329881-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-118329881-1');
          </script>
        
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><meta name="google-site-verification" content="A8E9MrD4Av9bQbh6y4jcxY4I-yoSDqg8yuMCsidXEIU" />
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <title>${seo.title} </title>
          <link rel="stylesheet" href="/index.css">
          <script src="/bundle.js" defer></script>
          <link rel='apple-touch-icon', sizes='57x57', href='/images/apple-icon-57x57.png'/>
          <link rel='apple-touch-icon', sizes='60x60', href='/images/apple-icon-60x60.png'/>
          <link rel='apple-touch-icon', sizes='72x72', href='/images/apple-icon-72x72.png'/>
          <link rel='apple-touch-icon', sizes='76x76', href='/images/apple-icon-76x76.png'/>
          <link rel='apple-touch-icon', sizes='114x114', href='/images/apple-icon-114x114.png'/>
          <link rel='apple-touch-icon', sizes='120x120', href='/images/apple-icon-120x120.png'/>
          <link rel='apple-touch-icon', sizes='144x144', href='/images/apple-icon-144x144.png'/>
          <link rel='apple-touch-icon', sizes='152x152', href='/images/apple-icon-152x152.png'/>
          <link rel='apple-touch-icon', sizes='180x180', href='/images/apple-icon-180x180.png'/>
          <link rel='icon', type='image/png', sizes='192x192', href='/images/android-icon-192x192.png'/>
          <link rel='icon', type='image/png', sizes='32x32', href='/images/favicon-32x32.png'/>
          <link rel='icon', type='image/png', sizes='96x96', href='/images/favicon-96x96.png'/>
          <link rel='icon', type='image/png', sizes='16x16', href='/images/favicon-16x16.png'/>
          <link rel='manifest', href='/images/manifest.json'/>
          <meta name='msapplication-TileColor', content='#ffffff'/>
          <meta name='msapplication-TileImage', content='/images/ms-icon-144x144.png'/>
          <meta name='theme-color', content='#ffffff'/>
          <meta property="og:title" content="${seo.title}"/>
          <meta name='description' content="${seo.description}"/>
          <meta property="og:type" content="article"/> 
          <meta property="og:url" content= "${seo.link}"/> 
          <meta property="og:image" content = "${seo.image}"/>
          <meta property='og:description', content="${seo.description}"/>
          <script type='application/ld+json'>
          {
           "@context": "http://schema.org",
           "@type": "${seo.schemaType}", 
           "mainEntityOfPage": {
           "@type": "WebPage",
           "@id": "https://folkinlovepty.com/"
           },
           "headline": "${seo.title}",
           "image": "${seo.schemaImages}" ,
           "datePublished": "${seo.schemaPublished}",
           "dateModified": "${seo.schemaModified}",
           "author": {
           "@type": "Person",
           "name": "Cinthia González"
           },
           "publisher": {
           "@type": "Organization",
           "name": "Folk in Love",
           "logo": {
           "@type": "ImageObject",
           "url": "https://folkinlovepty.com/images/folkInLove-logo.png"
           }
           },
           "description": "${seo.description}"
           }

          </script>
          <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2556254097725082');
            fbq('track', 'PageView');
          </script>


          <noscript>
            img(height='1', width='1', style='display:none', src='https://www.facebook.com/tr?id=2556254097725082&ev=PageView&noscript=1')</noscript>
            ${chimpScript}
            
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          ${fbEvent}
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/