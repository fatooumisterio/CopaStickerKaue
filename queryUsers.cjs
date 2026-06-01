const https = require('https');

const projectId = "copasticker-kaue";
const apiKey = "AIzaSyBcyRFqxmDuPHVKR6UoTHvODxjryzkEpYg";
const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/copa-sticker/documents/users?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.documents) {
        console.log("=== USUÁRIOS CADASTRADOS NO FIRESTORE ===");
        json.documents.forEach(doc => {
          const email = doc.fields && doc.fields.email ? doc.fields.email.stringValue : 'Email desconhecido';
          const name = doc.fields && doc.fields.name ? doc.fields.name.stringValue : 'Nome desconhecido';
          console.log(`- ${name} (${email})`);
        });
      } else {
        console.log("Nenhum usuário encontrado. O banco de dados retornou:");
        console.log(JSON.stringify(json, null, 2));
      }
    } catch (e) {
      console.error("Erro ao analisar a resposta:", e);
    }
  });
}).on('error', err => console.error(err));
