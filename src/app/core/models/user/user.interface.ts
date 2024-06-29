export interface LoginModel {
    email: String
    password: String
}
export interface RegisterModel {
    nombres: String
    apellidos: String
    cedula: String
    fecha: String
    sexo: String
    ciudad: String
    imagen?: String
    email: String
    newPassword: String
    confirmPassword: String
}

export interface UserModel {
    id_usuario: number
    nombres: string
    apellidos: string
    email: string
    user_rol: number
    token: string
}

export interface MenuModel {
    ACC_NOMBRE: string
    ACC_PAGINA: string
    id_roles: number
    logo: string
}

export interface UpdateProfileModel {
    nombres: string
    apellidos: string
    email: string
    password: string
}

export interface UpdatePasswordFromProfile {
    email: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export interface UserDataResetPassword {
    email: string
    nombres: string
    apellidos: string
}