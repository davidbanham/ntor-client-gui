#!/bin/bash
echo "Installing deps"
cd .. && npm install && cd builds && echo "Success!"

echo "Creating app.nw package"
cd ../ && zip -r app.nw ./* --exclude ./builds/\* && cd builds && echo "Success!"

echo "Creating OSX package"
cp ../app.nw osx/ntor-client-gui.app/Contents/Resources/ && cd osx && zip -r ntor-client-gui.app.zip ntor-client-gui.app && cd .. && echo "Success!"

echo "Creating Windows package"
rm windows/ntor-gui.zip
cat windows/sources/node-webkit-v0.4.2-win-ia32/nw.exe ../app.nw > windows/sources/ntor-gui.exe && zip --junk-paths -r windows/ntor-gui.zip windows/sources/ntor-gui.exe windows/sources/node-webkit-v0.4.2-win-ia32/*.dll windows/sources/node-webkit-v0.4.2-win-ia32/nw.pak && echo "Success!"
