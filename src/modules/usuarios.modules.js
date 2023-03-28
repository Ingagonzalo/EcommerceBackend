import mongoose from "mongoose";
import bcrypt from 'bcryptjs'; //cifrar las contraseñas de los usuarios antes de almacenarlas en la base de datos.


const SALT_WORK_FACTOR = 6; // especificar el número de rondas de sal que se utilizarán al cifrar las contraseñas.

const Schema = new mongoose.Schema({ // especifica la estructura de los documentos que se almacenarán en la colección de usuarios.
    username: {
        type: String, // Especifica que el tipo de datos de la propiedad username es String.
        required: true, // Especifica que la propiedad username es obligatoria y no puede ser nula o indefinida al guardar un documento.
        index: {
            unique: true //especifica que la propiedad username debe ser indexada en la base de datos con la opción unique: true, lo que significa que no puede haber dos documentos con el mismo valor para la propiedad username
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

Schema.pre("save", function (next) { //pre significa que se ejecutará antes de guardar un documento en la colección de usuarios. 
    const user = this

    if (this.isModified("password") || this.isNew) { //se comprueba si la contraseña se ha modificado o si se trata de un nuevo documento
        bcrypt.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

Schema.methods.comparePassword = async function (password) { // comparar la contraseña proporcionada por un usuario con la contraseña almacenada en la base de datos
    const valid = await bcrypt.compare(password, this.password)
    return valid;
}

export const UsuariosModel = mongoose.model("usuarios", Schema); //se utiliza para interactuar con la colección de usuarios en la base de datos MongoDB. 
