# sort_json

sort_json は、JSON ファイルをソートします。 


## インストール

sort_json を使うには Node.js のインストールが必要です。

Windows の場合

    sort_json をダウンロードして展開します:
        - https://github.com/Takakiriy/sort_json >> Code >> Download.ZIP

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0-x64.exe）を開きます
        - インストール オプションはデフォルトを使用

    sort_json が使うパッケージをインストールします:
        - Windows スタート >> PowerShell
        - cd ___/sort_json
        - npm install --only=production

    sort_json.bat ファイルをダブルクリックすると sort_json が起動します:

mac の場合

    sort_json をダウンロードして展開します:
        - https://github.com/Takakiriy/sort_json >> Code >> Download.ZIP

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0.pkg）を開きます
        - インストール オプションはデフォルトを使用

    sort_json が使う xlsx, indent-string パッケージをインストールします:
        - Launchpad >> Terminal
        - cd ___/sort_json
        - npm install --only=production

    node_modules_patch/indent-string を node_modules にコピーします。

    sort_json.command ファイルに実行属性を追加します:
        - chmod +x sort_json.command

    sort_json.command ファイルをダブルクリックすると sort_json が起動します:


## 使い方

Windows の場合、sort_json.bat をダブルクリックして、下記のように入力します。
mac の場合、sort_json.command をダブルクリックして、下記のように入力します。

    input .json file path> example.json

ファイル パス は、キーボードから入力しなくても、
ファイルをドラッグ＆ドロップして入力できます。

入力したファイルがあるフォルダーに example.json.updating ファイルができます。
