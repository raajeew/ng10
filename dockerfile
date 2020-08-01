FROM nginx:1.18.0-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our default nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist /usr/share/nginx/html

# As we have used port 80 in deault.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]