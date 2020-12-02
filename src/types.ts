export type TRegisterUser = {
  login: string
  email: string
  password: string
}

export type TLoginUser = {
  email: string
  password: string
}

export type TDatabaseSaveUser = {
  avatar: string
  darkTheme: boolean
  email: string
  id: string
  password: string
  username: string
}

export type TLogInUser = {
  logInUser: TDatabaseSaveUser | null | undefined
}

export type TSong = {
  name: string,
  cover: string
  artist: string,
  audio: string,
  id: string,
  active: boolean,
}