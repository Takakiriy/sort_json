# sort_json

sort_json sorts the JSON file.

[日本語 README](./README-jp.md)


## Install

To use sort_json, you must install Node.js.

For Windows:

    Download and expand sort_json:
        - https://github.com/Takakiriy/sort_json >> Code >> Download.ZIP

    Install Node.js:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0-x64.exe)
        - Installation options are defaults

    Install packages used by sort_json:
        - Windows Start >> PowerShell
        - cd ___/sort_json
        - npm install --only=production

    To start sort_json, double click sort_json.bat file:

For mac:

    Download and expand sort_json:
        - https://github.com/Takakiriy/sort_json >> Code >> Download.ZIP

    Install Node.js:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0.pkg)
        - Installation options are defaults

    Install packages used by sort_json:
        - Launchpad >> Terminal
        - cd ___/sort_json
        - npm install --only=production

    copy node_modules_patch/indent-string to node_modules.

    Add execution attributes to "sort_json.command" file:
        - chmod +x sort_json.command

    To start sort_json, double click sort_json.command file:


## First example

For Windows, double click sort_json.bat file and type:
For mac, double click sort_json.command file and type:

    input .json file path> example.json

You can drag and drop a file to enter the file without having to type it from the keyboard.

example.json.updating file is created in the folder containing the input file.
