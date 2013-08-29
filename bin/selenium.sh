#!/bin/bash

SELENIUM_JAR_FILENAME="selenium-server-standalone-2.32.0.jar"
SELENIUM_PID_FILE="/tmp/selenium-server-pid"

install() {
    if [ ! -f $SELENIUM_JAR_FILENAME ]; then
        echo "You need to clone https://github.com/mixedpuppy/selenium and build "
        echo "it using './go release'.  Place the built selenium in the top level "
        echo "directory of this repository."
        exit 0;
    fi
}

start() {
    if [ -f $SELENIUM_PID_FILE ]; then
        echo "Selenium server is already running ($SELENIUM_PID_FILE)"
        exit 1
    fi
    PWD=`pwd`
    java -jar $SELENIUM_JAR_FILENAME -Dwebdriver.firefox.bin=$PWD/bin/firefox -Dwebdriver.log.file=$PWD/console.log -Dwebdriver.firefox.logfile=$PWD/firefox.log &>/dev/null &
    PID=$!
    echo $PID > $SELENIUM_PID_FILE
    CODE="000"
    while [ $CODE != "200" ]; do
        CODE=$(curl -sL -w "%{http_code}" http://localhost:4444/wd/hub -o /dev/null)
        sleep 0.1
    done
    echo "Selenium server started"
}

stop() {
    if [ ! -f $SELENIUM_PID_FILE ]; then
        echo "Selenium server not running"
        exit 1
    fi
    cat $SELENIUM_PID_FILE | xargs kill -15
    rm -f $SELENIUM_PID_FILE
    echo "Selenium server stopped"
}

case "$1" in
    install)
        install
        ;;
    start)
        install
        start
        ;;
    stop)
        stop
        ;;
    restart|reload)
        stop
        start
        ;;
    *)
        echo $"Usage: $0 {install|start|stop|restart|reload}"
        exit 1
esac

exit 0
