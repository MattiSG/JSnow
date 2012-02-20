JSnow!
======

JSnow! is a learning project offering a ski resort management webapp, made with Node.js and the Express framework.

Objectives
----------

- Inform skiers about snow conditions at various ski hills.
- Allow skiers to contribute real-time feedback about the said conditions.

How to use
----------

### Dependencies ###

You will need:

- [Node.js](http://nodejs.org) v0.6.9+
- [MongoDB](http://www.mongodb.org/downloads) v2.0+

### Simple install ###

If you just downloaded MongoDB for this application, you must have a folder with a `bin` folder in it. Simply move that folder to `lib/mongodb` (so that the binaries are in `lib/mongodb`, not `lib/mongodb/bin`).

Then:

    git clone git://github.com/MattiSG/JSnow.git	# or simply download a zipball on the "download" tab
    ./jsnow

### Custom install ###

If you already have MongoDB in your `PATH`, then do something along the lines of:

    git clone git://github.com/MattiSG/JSnow.git	# or simply download a zipball on the "download" tab
    npm install -d	# install all necessary dependencies
    mkdir data	# prepare database storage
    sudo path/to/your/install/of/mongodb/bin/mongod	# start up MongoDB daemon; possibly see --dbpath option
    node app.js	# start the application

…and you can simply hit `localhost:3000` on your favorite browser.

Authors
-------

- Jérémy Gabriele
- [Matti Schneider-Ghibaudo](http://mattischneider.fr)
