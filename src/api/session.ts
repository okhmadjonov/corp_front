// Access token FAQAT xotirada turadi (localStorage'da emas): XSS uni o'g'irlay olmaydi.
// Refresh token httpOnly cookie'da — JavaScript uni umuman ko'rmaydi.
// Sahifa yangilanganda token yo'qoladi va AuthProvider cookie orqali qayta oladi.
let accessToken: string | null = null

export const session = {
  get: () => accessToken,
  set: (token: string | null) => {
    accessToken = token
  },
}
