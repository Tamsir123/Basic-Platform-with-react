// Des avatars par défaut variés de DaisyUI
export const daisyuiAvatars = [
  'https://img.daisyui.com/images/profile/demo/1@94.webp',
  'https://img.daisyui.com/images/profile/demo/2@94.webp',
  'https://img.daisyui.com/images/profile/demo/3@94.webp',
  'https://img.daisyui.com/images/profile/demo/4@94.webp',
  'https://img.daisyui.com/images/profile/demo/5@94.webp'
];

export const defaultAvatars = daisyuiAvatars;

export function getDefaultAvatar(userId: number = 0): string {
  return daisyuiAvatars[userId % daisyuiAvatars.length];
}

// Obtenir un avatar basé sur l'ID utilisateur ou un hasard
export function getUserAvatar(userId?: number | string | null): string {
  // Si on a un ID utilisateur, on l'utilise pour choisir un avatar cohérent
  if (userId !== undefined && userId !== null) {
    const id = typeof userId === 'string' ? parseInt(userId, 10) || 0 : userId;
    return daisyuiAvatars[Math.abs(id) % daisyuiAvatars.length];
  }
  
  // Sinon on prend un avatar au hasard
  return daisyuiAvatars[Math.floor(Math.random() * daisyuiAvatars.length)];
}
