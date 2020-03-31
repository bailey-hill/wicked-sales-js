server {

  server_name catalog.baileyohill.com;

  root /home/ubuntu/$server_name/server/public;

   location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {

  proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;

    proxy_pass http://localhost:3001;
  }

}
