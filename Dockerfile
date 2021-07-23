FROM centos:latest
RUN yum -y install httpd
COPY ./dist/survey /var/www/html
ENTRYPOINT ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80
