This is a GUI queue client for [ntor](https://github.com/davidbanham/ntor/ "ntor github repository").

The use case for this project is when you wish to consume media from an ntor server, but the intervening network isn't up to the task of just streaming the content on the fly. Run this on your home computer and it will automatically download anything you add to your queue in ntor.

This agent will report back to ntor with progress updates so you can monitor it remotely.

It is built on [node-webkit](https://github.com/rogerwang/node-webkit "node-webkit github repository"). To create a node-webkit package from the source, first install the required NPM modules with:
	npm install
 Then, just zip everything up. On OSX or most any other nix the command is
	zip -r app.nw ./* --exclude builds/\*

Prebuilt packages for OSX and Windows are available here:

[OSX](https://s3.amazonaws.com/ntor-client-gui/0.1.0/osx/ntor-client-gui.app.zip "Compilied OSX binary")
[Windows](https://s3.amazonaws.com/ntor-client-gui/0.1.0/windows/ntor-gui.zip "Compilied Windows binary")

And the generic .nw package is available [here](https://s3.amazonaws.com/ntor-client-gui/0.1.0/app.nw "Compiled .nw package").
