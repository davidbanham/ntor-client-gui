#!/bin/bash

# OSX
wget https://s3.amazonaws.com/node-webkit/v0.4.2/node-webkit-v0.4.2-osx-ia32.zip
mkdir osx
unzip node-webkit-v0.4.2-osx-ia32.zip
mv node-webkit.app osx/ntor-client-gui.app
rm node-webkit-v0.4.2-osx-ia32.zip

# Windows
wget https://s3.amazonaws.com/node-webkit/v0.4.2/node-webkit-v0.4.2-win-ia32.zip
mkdir -p windows/sources
unzip node-webkit-v0.4.2-win-ia32.zip 
mv node-webkit-v0.4.2-win-ia32 windows/sources/node-webkit-v0.4.2-win-ia32
rm node-webkit-v0.4.2-win-ia32.zip
