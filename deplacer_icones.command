#!/bin/bash
cd "$(dirname "$0")"
mkdir -p images
mv -f ~/Downloads/icon-*.png images/
cp -f images/icon-180x180.png images/apple-touch-icon.png
ls images/
echo "Terminé !"
