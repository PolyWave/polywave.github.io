FROM monostream/nodejs-gulp-bower:latest

MAINTAINER Guillaume Clochard <guillaume.clochard@etu.univ-nantes.fr>

RUN apt-get update
RUN apt-get install -y ruby-full
RUN gem install scss_lint
