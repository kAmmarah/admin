const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const file = path.join(__dirname, '..', 'index.html');
const src = fs.readFileSync(file, 'utf8');

const startTag = /<script[^>]*type=["']text\/babel["'][^>]*>/i;
const startMatch = src.match(startTag);
if(!startMatch){
  console.error('No text/babel script tag found');
  process.exit(1);
}
const startIdx = src.indexOf(startMatch[0]);
const afterStart = startIdx + startMatch[0].length;
const endTag = '</script>';
const endIdx = src.indexOf(endTag, afterStart);
if(endIdx === -1){
  console.error('No closing </script> found after text/babel tag');
  process.exit(1);
}
const code = src.slice(afterStart, endIdx);
console.log('Transpiling ' + (code.length/1000).toFixed(2) + ' KB of inline JSX...');

const out = babel.transformSync(code, {
  presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
  sourceMaps: false,
  filename: 'inline.jsx',
});

const newScript = '<script>\n' + out.code + '\n</script>';
const newHtml = src.slice(0, startIdx) + newScript + src.slice(endIdx + endTag.length);

fs.writeFileSync(file, newHtml, 'utf8');
console.log('index.html updated with transpiled script.');
