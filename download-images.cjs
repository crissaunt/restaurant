const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const urls = [
  ['https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=600', 'chef-aurelie.jpg'],
  ['https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600', 'sommelier-marc.jpg'],
  ['https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600', 'pastry-ines.jpg'],
  ['https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1800', 'restaurant-interior.jpg'],
  ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=900', 'plated-venison.jpg'],
  ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=900', 'chef-kitchen.jpg'],
  ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', 'chocolate-ganache.jpg'],
  ['https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800', 'wild-mushrooms.jpg'],
  ['https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800', 'venison-loin.jpg'],
  ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800', 'wood-fired-octopus.jpg'],
  ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800', 'heirloom-tomato.jpg'],
  ['https://images.unsplash.com/photo-1621996346565-e3bb62747d84?auto=format&fit=crop&q=80&w=800', 'truffle-gnocchi.jpg'],
  ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800', 'honey-parfait.jpg'],
  ['https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800', 'glacier-toothfish.jpg'],
  ['https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', 'spruce-elixir.jpg'],
  ['https://images.unsplash.com/photo-1494790108755-2616b612b898?auto=format&fit=crop&q=80&w=200&h=200', 'avatar-elena.jpg'],
  ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', 'avatar-james.jpg'],
  ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200', 'avatar-sophie.jpg'],
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function download([url, filename]) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(dir, filename));
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download([res.headers.location, filename]).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

(async () => {
  for (const u of urls) {
    process.stdout.write(`Downloading ${u[1]}... `);
    await download(u);
    console.log('done');
  }
  console.log('All images downloaded.');
})();
