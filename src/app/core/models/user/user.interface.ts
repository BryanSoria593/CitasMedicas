export interface LoginModel {
    email: String,
    password: String,
}
export interface RegisterModel {
    nombres: String,
    apellidos: String,
    cedula: String,
    fecha: String,
    sexo: String,
    ciudad: String,
    imagen?: String,
    email: String,
    password: String,
    passwordConfirm: String,

}
// export interface RegisterModel {
//     loading: boolean,
//     user: {
//         nombres: String,
//         apellidos: String,
//         cedula: String,
//         fecha: String,
//         sexo: String,
//         ciudad: String,
//         imagen?: String,
//         email: String,
//         password: String,
//         passwordConfirm: String,
//     }
// }

export interface UserModel {
    id_usuario: number,
    nombres: string,
    apellidos: string,
    email: string,
    imagen?: string,
    token: string,


}

export interface MenuModel {
    ACC_NOMBRE: string,
    ACC_PAGINA: string,
    id_roles: number,
    logo: string,
}

// export interface UserState{
//     loading: boolean,
//     user: UserModel,
//     menuOptions: MenuModel[],
//     error?: string,
// }




