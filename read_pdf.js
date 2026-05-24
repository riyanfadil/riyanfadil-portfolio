const fs = require('fs');
const buf = fs.readFileSync('doc/resume.pdf');
const str = buf.toString('latin1');

// Extract readable text from PDF binary
const chunks = [];
let current = '';
for (let i = 0; i < str.length; i++) {
  const c = str[i];
  const code = str.charCodeAt(i);
  if (code >= 32 && code < 127) {
    current += c;
  } else {
    if (current.length > 3) {
      chunks.push(current.trim());
    }
    current = '';
  }
}
if (current.length > 3) chunks.push(current.trim());

// Print unique meaningful lines
const seen = new Set();
chunks.forEach(line => {
  const clean = line.trim();
  if (clean.length > 3 && !seen.has(clean)) {
    seen.add(clean);
    console.log(clean);
  }
});
