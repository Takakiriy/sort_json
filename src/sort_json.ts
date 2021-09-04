import * as fs from "fs";  // or fs = require("fs")  // file system
import * as lib from "./lib";  // or fs = require("fs")  // file system

async function  main() {
	const  input_file_path = await lib.input( "Input JSON UTF-8 file path>" );
	const  output_file_path = input_file_path +".updating";
	const  a_JSON = fs.readFileSync( input_file_path,  "utf-8" );
	await  inputPriorityKeys();

	const  an_object = JSON.parse( a_JSON );
	const  formatted_JSON = JSON.stringify( an_object, sortWithPriority, "\t" );
	fs.writeFileSync( output_file_path,  formatted_JSON );
	console.log('Sorted.');
}

const  priorityKeyNames = [] as string[];
const  orders = [] as any[];
async function  inputPriorityKeys() {
	for (;;) {
		const  key = await lib.input( "Priority key name (To continue, enter only)>" );
		if (key === '' || key === '\\') {
			return;
		}
		priorityKeyNames.push(key);
		orders.push({key, reverse: false});
	}
}

function  sortWithPriority(_: any, nodeValue: any) {
	let  nodeType = 'other';
	if (nodeValue !== null) {
		if (typeof nodeValue === 'object') {
			if (nodeValue instanceof Array) {
				nodeType = 'Array';
			} else {
				nodeType = 'object';
			}
		}
	}

	if (nodeType === 'object') {
		const  nodeObject = nodeValue;
		let  returnObject = {}
		const  copyAValueFunction = function(returnObject: any, key: string) {
			returnObject[key] = nodeObject[key];
			return  returnObject;
		}
		const  priorityCompareFunction = function(a: string, b: string) {
			const  aPriority = priorityKeyNames.indexOf(a)
			const  bPriority = priorityKeyNames.indexOf(b)
			if (aPriority === notFound) {
				if (bPriority === notFound) {
					if (a < b) {
						return  -1;
					} else if (a > b) {
						return  +1;
					} else {
						return  0;
					}
				} else {
					return  +1;
				}
			} else {
				if (bPriority === notFound) {
					return  -1;
				} else {
					return  aPriority - bPriority;
				}
			}
		}

		const  objectAttributeNames = Object.keys(nodeObject).sort(priorityCompareFunction);
		returnObject = objectAttributeNames.reduce(copyAValueFunction, returnObject);
		return  returnObject;
	}
	else if (nodeType === 'Array') {
		return  nodeValue.sort(sortBy(orders));
	}
	else {
		return  nodeValue;
	}
}

function  sortBy(orders: any[]) {
	return (a: any, b: any) => {
		for (const order of orders) {
			if (a[order.key] !== b[order.key]) {
				const  orderBy = order.reverse ? 1 : -1;
				if (a[order.key] < b[order.key]) {
					return orderBy;
				} else {
					return orderBy * -1;
				}
			}
		}
		return 0;
	};
}

async function  callMain() {

    await  main()
        .catch( (e: any)=>{
			console.log( `ERROR: ${e.message}` );
			const  timeOver = new Date();
			timeOver.setSeconds( timeOver.getSeconds() + 1 );

			while ((new Date()).getTime() < timeOver.getTime()) {
			}
        })
        .finally(()=>{
            lib.getInputObject().close();
        });
}
const  notFound = -1;
callMain();
