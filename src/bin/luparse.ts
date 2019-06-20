import * as parser from '../latex_parser'
import * as fs from 'fs'
import * as util from 'util'
import * as commander from 'commander'

function deleteLocation(node: any) {
    if (node.hasOwnProperty('location')) {
        delete node.location
    }
    for (const key of Object.getOwnPropertyNames(node)) {
        const val = node[key]
        if (typeof val === 'object') {
            deleteLocation(val)
        }
    }
}

commander
.option('--disable-location', 'delete locations')
.parse(process.argv)
const filename = commander.args[0]
const s = fs.readFileSync(filename, {encoding: 'utf8'})
const ret = parser.parse(s)

if (commander.disableLocation) {
    deleteLocation(ret)
}

console.log(util.inspect(ret, {showHidden: false, depth: null}))
