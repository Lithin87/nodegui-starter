const fs = require('fs');
const jp = require('jsonpath');
const xl = require('excel4node');
const {XMLParser} = require('fast-xml-parser');
const prompt = require("prompt-sync")({ sigint: true });

const Main_Execute = () => {


const REQ_PAYLOAD = "./Resources/RequestPayload.txt";
const RES_PAYLOAD = "./Resources/ResponsePayload.txt";
const EXTRACTED   = "./Resources/Extracted.txt";
const EXCEL       = "./Resources/FinalApigeeExtractedDetails.xlsx";
const TRACE       = "./Resources/TraceFiles";
Array.of(REQ_PAYLOAD,RES_PAYLOAD,EXTRACTED,EXCEL).forEach(s => fs.rmSync(s, { force: true }))

fs.readdirSync(TRACE).forEach(file => { parse_trace(`${TRACE}/${file}`)}) 

function parse_trace(filename) {
    const trace_json = JSON.parse(fs.readFileSync(filename));
    
    let req_msg = jp.query(trace_json, '$..results[?(@.ActionResult=="RequestMessage")].content');
    let res_msg = jp.query(trace_json, '$..results[?(@.ActionResult=="ResponseMessage")].content');
    
    new Set(req_msg).forEach(s => fs.writeFileSync(REQ_PAYLOAD, s + "\n", { flag: 'a+' }));
    new Set(res_msg).forEach(s => fs.writeFileSync(RES_PAYLOAD, s + "\n", { flag: 'a+' }));
}

const req_contents = fs.readFileSync(REQ_PAYLOAD).toString()

// var fields = apiSessionId,qflowCustomerId,remoteId,time,status
// date,articleNumber,conditionType,tableNumber,priceList

const fields = prompt("Pls enter the fields to extract  : ");
const headers = fields.split(",")

let output = []
if(!(req_contents.includes("<")))
{  
    req_contents.split(/\r?\n/).forEach( s => {  if(s!='') { output.push(JSON.parse(s))  }}  );       
}
else
{
    const parser = new XMLParser({ ignoreAttributes: true, removeNSPrefix: true });
     output = parser.parse(fs.readFileSync(REQ_PAYLOAD));
}

var a= [];
headers.forEach(s => { a.push(jp.query(output, `$..${s}`)) })
 

t = fields;
for (let i =0 ; i <= a[0].length; i++)
 { 
    fs.writeFileSync(EXTRACTED, t, { flag: 'a' });
    
    var t = "\n"
    for( let k =0 ; k < headers.length; k++ )
    {
        t =  t + a[k][i] + ","
    }
}


var wb = new xl.Workbook();
var ws = wb.addWorksheet('TAB 1');
const lines = fs.readFileSync(EXTRACTED).toString().split(/\r?\n/);
lines.forEach((line, line_index) => line.split(",").forEach((element, field_index) => ws.cell(line_index + 1, field_index + 1).string(element)));
wb.write(EXCEL);

}

export default Main_Execute;