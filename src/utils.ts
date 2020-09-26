export const sortArray = (array: any[], prop: string) => array.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))

export const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5)

export const trimString = (string: string, trim: string) => string.split(trim)[1]
