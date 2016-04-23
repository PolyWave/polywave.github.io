FROM  monostream/nodejs-gulp-bower

RUN apt-get update
RUN apt-get install -y ruby-full
RUN gem install scss_lint

