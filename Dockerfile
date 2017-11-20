FROM centos:6
MAINTAINER Mike Turner <turner.mike@gmail.com>


# ==========================================================================
#  Variables
# ==========================================================================

# public directory
WORKDIR ./public_html

# required by nano editor
ENV TERM xterm

# apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/httpd
ENV APACHE_LOCK_DIR /var/lock/httpd
ENV APACHE_PID_FILE /var/run/httpd.pid


# ==========================================================================
#  Installations
# ==========================================================================

# install software (extra packages for enterprise linux (EPEL), apache, mod_ssl, php)
RUN rpm -ivh http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
RUN yum install -y nano
RUN yum install -y httpd
RUN yum install -y mod_ssl openssl
RUN yum install --enablerepo=epel,remi-php70,remi -y \
                              php \
                              php-cli \
                              php-gd \
                              php-mbstring \
                              php-mcrypt \
                              php-xml \
                              php-xdebug


# ==========================================================================
#  Copy Files
# ==========================================================================

# add the files from deploy to public_html
# there was a problem using ADD for files in a parent directory. The Dockerfile location
# serves as the current context. To work around this, a sym link was created in the deploy
# directory to reference the Dockerfile in the build directory. That way, all docker configs
# are located in the build directory.
ADD ./deploy ./

# set file permissions
# RUN chmod 444 ./.htaccess

# overwrite the php.ini file
ADD ./docker-config/php/php.ini /etc/php.ini

# overwrite the httpd.conf file
ADD ./docker-config/httpd/httpd.conf /etc/httpd/conf/httpd.conf

# # copy key/cert files
# ADD ./docker-config/httpd/ca.crt /etc/pki/tls/certs/ca.crt
# ADD ./docker-config/httpd/ca.key /etc/pki/tls/private/ca.key
# ADD ./docker-config/httpd/ca.csr /etc/pki/tls/private/ca.csr

# # overwrite the ssl.conf file
# ADD ./docker-config/httpd/ssl.conf /etc/httpd/conf.d/ssl.conf


# ==========================================================================
#  Clean up
# ==========================================================================

# clean up installer
RUN yum clean all


# ==========================================================================
#  Start up
# ==========================================================================

# open ports
# EXPOSE 80 443
EXPOSE 80

# start apache
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]