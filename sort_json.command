
# chmod +x main.command
export  script_file_path="$0"
export  parent_path="${script_file_path%/*}"
cd  "${parent_path}"
export  NODE_PATH=/usr/local/lib/node_modules

node  build/src/sort_json.js
