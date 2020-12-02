export const themeBackground = (themeDark: boolean | undefined) => {
  return themeDark ? 'bg-dark' : 'bg-light';
}

export const themeHeader = (themeDark: boolean | undefined) => {
  return themeDark ? 'header-dark' : 'header-light';
}

export const themeColor = (themeDark: boolean | undefined) => {
  return themeDark ? 'c-dark' : 'c-light';
}

export const themeDescriptionColor = (themeDark: boolean | undefined) => {
  return themeDark ? 'd-dark' : 'c-light';
}

export const themeHover = (themeDark: boolean | undefined) => {
  return themeDark ? 'hover-dark' : 'hover-light';
}

export const iconTheme = (themeDark: boolean | undefined) => {
  return themeDark ? '#fff' : '#000';
}