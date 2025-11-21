// import { defineConfig } from 'vite'
// // import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react';    // import the official React plugin

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     // tailwindcss(),

//   ],

//   base: '/portfolio/',
//   // server: {
//   //   port: 3000,
//   //   open: true,
//   //   cors: true,
//   // },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';    // import the official React plugin

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/portfolio',
// });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig(({ mode }) => ({
//   plugins: [react()],
//   base: mode === 'production' ? '/portfolio/' : '/',   // ✅ Fix here
// }));



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/portfolio',  // this is important for gh-pages deploy
});
