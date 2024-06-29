import { MenuModel, UserModel } from "./user.interface"

export interface UserState{
    loading: boolean
    user: UserModel
    menuOptions: MenuModel[]
    error?: string
}
