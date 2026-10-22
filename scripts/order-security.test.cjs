
const {test}=require('node:test'),assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto');
function setup(){
 const rows=[],mails=[],props=new Map(),cache=new Map();
 let locks=0,releases=0;
 const sheet={getLastRow:()=>1,appendRow:r=>rows.push(r)};
 const ctx={
  ContentService:{MimeType:{JSON:'json'},createTextOutput:s=>({setMimeType:()=>JSON.parse(s)})},
  DriveApp:{getFilesByName:()=>({hasNext:()=>true,next:()=>({})})},
  SpreadsheetApp:{open:()=>({getSheetByName:()=>sheet})},
  GmailApp:{sendEmail:(...args)=>mails.push(args)},
  LockService:{getScriptLock:()=>({tryLock:()=>{locks++;return true;},releaseLock:()=>releases++})},
  PropertiesService:{getScriptProperties:()=>({getProperty:k=>props.get(k)||null,setProperty:(k,v)=>props.set(k,v)})},
  CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v)})},
  Utilities:{DigestAlgorithm:{SHA_256:'sha256'},computeDigest:(_,s)=>Array.from(crypto.createHash('sha256').update(s).digest())}
 };
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('artifacts/magical-wreaths/google-apps-script.js','utf8'),ctx);
 const send=d=>ctx.doPost({postData:{contents:JSON.stringify(d)}});
 return {rows,mails,props,send,counts:()=>({locks,releases})};
}
test('normal order records and sends both existing emails',()=>{
 const s=setup();assert.equal(s.send({name:'Jane Doe',email:'jane@example.com',accents:['Ribbon'],notes:'Blue please',confirmFirst:false}).success,true);
 assert.equal(s.rows.length,1);assert.equal(s.mails.length,2);assert.equal(s.mails[1][0],'jane@example.com');
});
test('invalid submissions have no sheet or email effects',()=>{
 const s=setup();for(const data of [null,[],{name:'Jane',email:'a@example.com,b@example.com'},{name:'Bad\nHeader',email:'jane@example.com'},{name:'Jane',email:'jane@example.com',accents:'bad'},{name:'Jane',email:'jane@example.com',notes:'a'.repeat(8001)}]) assert.equal(s.send(data).success,false);
 assert.equal(s.rows.length,0);assert.equal(s.mails.length,0);
});
test('formula-like spreadsheet cells remain literal text',()=>{
 const s=setup();assert.equal(s.send({name:'=IMPORTXML("bad")',email:'jane@example.com',notes:'  =1+1'}).success,true);
 assert.equal(s.rows[0][1],"'"+'=IMPORTXML("bad")');assert.equal(s.rows[0][13],"'  =1+1");
});
test('recipient throttle prevents further email and releases lock',()=>{
 const s=setup();for(let i=0;i<5;i++)assert.equal(s.send({name:'Jane',email:'jane@example.com'}).success,true);
 assert.equal(s.send({name:'Jane',email:'jane@example.com'}).success,false);assert.equal(s.mails.length,10);
 assert.deepEqual(s.counts(),{locks:6,releases:6});
});
test('persistent daily budget limits different recipients',()=>{
 const s=setup();s.props.set('MW_MAX_ORDERS_PER_DAY','1');
 assert.equal(s.send({name:'One',email:'one@example.com'}).success,true);
 assert.equal(s.send({name:'Two',email:'two@example.com'}).success,false);assert.equal(s.rows.length,1);
});
