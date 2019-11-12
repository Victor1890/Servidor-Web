const {Router} = require('express');
const router = Router();
const admin = require('firebase-admin');

// ruta de las credenciales
const serviceAccount = require('../../tarea5-web-service-firebase-adminsdk-ezelb-eda3b16d27.json');

// añadiendo la ruta y credenciales de la base de datos
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tarea5-web-service.firebaseio.com/'
});

// obteniendo la base de datos
const db = admin.database();

const ref = db.ref('contacts');

// Variable para pasar la respuesta de la base de datos entre el GET y el POST
let contacts =[];

router.get('/', (req, res) => {
    ref.once('value', (snapshot) => {
        const data = snapshot.val();        
        res.json(data);
        contacts = data;
    });
});

router.post('/', (req, res) => {
    const {nombre, apellido, telefono} = req.body;
    const newContact = {
        nombre,
        apellido,
        telefono
    }
    let contactsObject = [];
    if(contacts){
        contactsObject = contacts;
        contactsObject.push(newContact);    
    } else {
        contactsObject.push(newContact);    
    }
    ref.set(contactsObject);
    res.send('received');
})

module.exports = router;