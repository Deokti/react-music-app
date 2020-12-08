export interface TRegisterUser {
  login: string
  email: string
  password: string
}

export type TDarkTheme = {
  darkTheme: boolean | undefined
}

export interface TLoginUser {
  email: string
  password: string
}

export interface TDatabaseSaveUser {
  avatar: string
  darkTheme: boolean
  email: string
  id: string
  password: string
  username: string
}

export interface TLogInUser {
  logInUser: TDatabaseSaveUser | null | undefined
}

export interface TSong {
  name: string,
  cover: string
  artist: string,
  audio: string,
  id: string,
  active: boolean,
}