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
  poster: string
  author: string,
  audio: string,
  id: string,
  active: boolean,
}

export type TSongInfo = {
  currentTimeSong: number
  durationAudio: number
  trackAnimation: number
}

export type TSongDatabase = {
  id: string
  name: string
  author: string
  poster: string
  audio: string
}