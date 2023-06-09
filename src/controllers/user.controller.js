import { userService } from '../services/user.service.js';
import { newUserTemplate } from '../utils/notifications/htmltemplates/newUserCreated.js'
import { sendGmail } from "../utils/notifications/emailSender.js"


const perfilDao = new userService(); // es una clase, esto agrego un nuevo objeto

export const renderLogin = async (req, res) => { //router.get('/login', 
    if (req.session.login) { //verifica si el usuario ya inició sesión, i el usuario ya inició sesión, la solicitud se redirige a la ruta /api/usuario
        res.redirect('/api/usuario')
    } else {
        res.render('pages/login', { status: false }) // se renderiza la plantilla login, El valor de status se puede usar en la plantilla para mostrar un mensaje de error si el inicio de sesión falla.
    }
}

export const renderSignup = async (req, res) => { //router.get('/signup'
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/signup', { status: false })
    }
}

export const signup = async (req, res) => { //router.post('/signup'
    const { body } = req;
    const newUser = await perfilDao.createUser(body);

    if (newUser) {
        // const now = new Date();
        //const newUserTemplateEmail = newUserTemplate(newUser._id, now.toLocaleString());
        // Descomentar si has llenado el .env con tu email y password.
        //await sendGmail('Nuevo usuario creado', newUserTemplateEmail);
        res.status(200).json({ "success": "User added with ID " + newUser._id })
    } else {
        res.status(400).json({ "error": "there was an error, please verify the body content match the schema" })
    }

}

export const login = async (req, res) => { //router.post('/login',
    const { user, pass } = req.body; //se extraen las credenciales de usuario y contraseña del cuerpo de la solicitud utilizando la sintaxis de desestructuración
    const loggedUser = await perfilDao.loginUser({ //se llama al método loginUser del objeto usersDao
        username: user,
        password: pass
    });

    if (loggedUser) {
        req.session.login = true; //Si las credenciales son válidas y el usuario se autentica correctamente, se establece la propiedad login de la sesión como true y se redirige al usuario a la ruta "/api/usuario". 
        res.redirect('/api/usuario')
    } else {
        req.session.login = false; //De lo contrario, se establece la propiedad login de la sesión como false y se redirige al usuario a la ruta "/api/usuario/login".
        res.redirect('/api/usuario/login')
    }
}

export const renderHome = async (req, res) => { //router.get('/',
    res.render('pages/home', { status: req.session.login }) //este status indica si el usuario ha iniciado sesion o no, si es es verdadero, el servidor le mostrará al usuario contenido relevante para los usuarios que han iniciado sesión.
} // si es falso, el servidor le mostrará contenido para usuarios no autenticados o le pedirá al usuario que se autentique.

export const renderLogout = async (req, res) => { //     router.get('/logout',
    if (!req.session.login) { //comienza verificando si la sesión actual tiene una variable de login establecida. Si no está establecida, la solicitud se redirige a la página de inicio.
        res.redirect('/api/usuario')
    } else {
        req.session.destroy((err) => { //llama en la sesión actual al destroy para destruir la sesión.
            if (err) {
                res.json(err);
            } else {
                res.render('pages/logout', { status: false }) //Si no hay errores, la respuesta renderiza una vista de plantilla de "pages/logout" con el estado false.
            }
        })
    }
}
