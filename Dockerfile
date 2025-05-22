# Utiliser l'image officielle de Node.js pour la version 14 (ou une autre que vous préférez)
FROM node:18

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et yarn.lock (si vous utilisez Yarn)
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install || yarn install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel Next.js écoute (par défaut, c'est 3000)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]