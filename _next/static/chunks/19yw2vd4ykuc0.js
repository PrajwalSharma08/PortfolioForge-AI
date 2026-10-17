(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,58072,e=>{"use strict";var t=e.i(56420);let o={name:"code",size:24,node:[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]]};o.node;let s=(0,t.default)(o);e.s(["Code",0,s],58072)},63676,32781,e=>{"use strict";var t=e.i(56420);let o={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};o.node;let s=(0,t.default)(o);e.s(["X",0,s],63676);let r={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};r.node;let n=(0,t.default)(r);e.s(["Loader2",0,n],32781)},8582,e=>{"use strict";var t=e.i(43476),o=e.i(71645),s=e.i(63676),r=e.i(62368),n=e.i(58072),i=e.i(32781),l=e.i(28623),a=e.i(19455),c=e.i(87486),d=e.i(71315),m=e.i(78631),p=e.i(94935),f=e.i(75157);let x=()=>()=>{};async function h(e){let t=new d.default,o={name:`portfolio-${e.profile.fullName.toLowerCase().replace(/\s+/g,"-")}`,version:"1.0.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint"},dependencies:{next:"14.2.0",react:"18.3.0","react-dom":"18.3.0","lucide-react":"0.400.0","framer-motion":"11.0.0"},devDependencies:{"@types/node":"20.12.0","@types/react":"18.3.0","@types/react-dom":"18.3.0",typescript:"5.4.0",tailwindcss:"3.4.0",postcss:"8.4.38",autoprefixer:"10.4.19",eslint:"8.57.0","eslint-config-next":"14.2.0"}},s=`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${e.theme.tokens.colors.primary}',
        secondary: '${e.theme.tokens.colors.secondary}',
        accent: '${e.theme.tokens.colors.accent}',
        background: '${e.theme.tokens.colors.background}',
        surface: '${e.theme.tokens.colors.surface}',
        text: '${e.theme.tokens.colors.text}',
        textMuted: '${e.theme.tokens.colors.textMuted}',
        border: '${e.theme.tokens.colors.border}',
      },
      fontFamily: {
        sans: ['${e.theme.tokens.typography.fontFamily.sans.replace(/'/g,"")}'],
        mono: ['${e.theme.tokens.typography.fontFamily.mono.replace(/'/g,"")}'],
        display: ['${e.theme.tokens.typography.fontFamily.display.replace(/'/g,"")}'],
      },
      borderRadius: {
        lg: '${e.theme.tokens.borderRadius.lg}',
        xl: '${e.theme.tokens.borderRadius.xl}',
        '2xl': '${e.theme.tokens.borderRadius["2xl"]}',
      },
    },
  },
  plugins: [],
}`,r=`@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: ${e.theme.tokens.colors.background};
  --foreground: ${e.theme.tokens.colors.text};
  --primary: ${e.theme.tokens.colors.primary};
  --secondary: ${e.theme.tokens.colors.secondary};
  --accent: ${e.theme.tokens.colors.accent};
  --surface: ${e.theme.tokens.colors.surface};
  --text-muted: ${e.theme.tokens.colors.textMuted};
  --border: ${e.theme.tokens.colors.border};
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: ${e.theme.tokens.typography.fontFamily.sans};
  background: var(--background);
  color: var(--foreground);
}

a {
  color: inherit;
  text-decoration: none;
}`,n=`import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "${e.seo.title}",
  description: "${e.seo.description}",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.className} antialiased\`}>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  )
}`,i=`import { PortfolioRenderer } from "@/components/portfolio-sections"
import { portfolioData } from "@/lib/portfolio-data"

export default function Page() {
  return <PortfolioRenderer portfolio={portfolioData} />
}`,l=`export const portfolioData = ${JSON.stringify(e,null,2)}`,a=`# ${e.profile.fullName}'s Portfolio

Generated with PortfolioForge AI

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel (Recommended)
1. Push this repository to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

### Netlify
1. Push this repository to GitHub
2. Import the repository in Netlify
3. Build command: \`npm run build\`
4. Output directory: \`.next\`

### Docker
\`\`\`bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
\`\`\`

## Customization

Edit \`src/lib/portfolio-data.ts\` to modify your portfolio content.

Edit \`tailwind.config.js\` to customize the theme colors, fonts, and spacing.

## Theme

This portfolio uses the **${e.theme.name}** theme.

## License

MIT License - feel free to use this for your personal portfolio.
`;t.file("package.json",JSON.stringify(o,null,2)),t.file("tsconfig.json",JSON.stringify({compilerOptions:{lib:["dom","dom.iterable","esnext"],allowJs:!0,skipLibCheck:!0,strict:!0,noEmit:!0,esModuleInterop:!0,module:"esnext",moduleResolution:"bundler",resolveJsonModule:!0,isolatedModules:!0,jsx:"preserve",incremental:!0,plugins:[{name:"next"}],paths:{"@/*":["./*"]}},include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],exclude:["node_modules"]},null,2)),t.file("tailwind.config.js",s),t.file("postcss.config.js","module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }"),t.file("next.config.js","/** @type {import('next').NextConfig} */\nconst nextConfig = {}\nmodule.exports = nextConfig"),t.file(".gitignore","# dependencies\nnode_modules\n.next\nout\nbuild\n\n# misc\n.DS_Store\n*.pem\n\n# debug\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# local env files\n.env*.local\n\n# vercel\n.vercel\n\n# typescript\n*.tsbuildinfo\nnext-env.d.ts"),t.file("README.md",a);let c=t.folder("src");c?.file("globals.css",r);let p=c?.folder("app");p?.file("layout.tsx",n),p?.file("page.tsx",i),p?.file("globals.css",r);let f=c?.folder("lib");f?.file("portfolio-data.ts",l);let x=c?.folder("components");x?.file("portfolio-sections.tsx",`import { PortfolioData } from "@/types/portfolio"
import { SectionRenderer } from "./section-renderer"

export function PortfolioRenderer({ portfolio }: { portfolio: PortfolioData }) {
  const sortedSections = [...portfolio.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen" style={{ fontFamily: portfolio.theme.tokens.typography.fontFamily.sans }}>
      {sortedSections.map((section) => (
        <SectionRenderer key={section.id} section={section} portfolio={portfolio} />
      ))}
    </div>
  )
}`);let h=await t.generateAsync({type:"blob"});(0,m.saveAs)(h,`${e.profile.fullName.toLowerCase().replace(/\s+/g,"-")}-portfolio.zip`)}e.s(["default",0,function(){let e=o.useSyncExternalStore(x,()=>!0,()=>!1),[d,m]=o.useState(null),[u,g]=o.useState(!1);o.useEffect(()=>{let e=requestAnimationFrame(()=>{{let e=localStorage.getItem("portfolio-data");if(e)try{m(JSON.parse(e))}catch{}}});return()=>cancelAnimationFrame(e)},[]);let y=async()=>{if(d){g(!0);try{await h(d)}catch(e){console.error("Download failed:",e)}finally{g(!1)}}};if(!e)return(0,t.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-background",children:(0,t.jsxs)("div",{className:"flex flex-col items-center gap-3",children:[(0,t.jsx)(i.Loader2,{className:"h-8 w-8 animate-spin text-primary"}),(0,t.jsx)("p",{className:"text-sm font-medium text-muted-foreground",children:"Loading Portfolio Preview..."})]})});if(!d)return(0,t.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-background",children:(0,t.jsxs)("div",{className:"text-center space-y-4",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold",children:"No Portfolio Data"}),(0,t.jsx)("p",{className:"text-muted-foreground",children:"Please complete the onboarding flow first."}),(0,t.jsx)(a.Button,{onClick:()=>window.location.href=(0,f.getAppPath)("/onboarding"),children:"Go to Onboarding"})]})});let b=[...d.sections||[]].map(e=>"certifications"===e.type&&d.certifications?.length||"education"===e.type&&d.education?.length||"projects"===e.type&&d.projects?.length||"experience"===e.type&&d.experience?.length?{...e,enabled:!0}:e).filter(e=>e.enabled).sort((e,t)=>e.order-t.order);return(0,t.jsxs)("div",{className:"min-h-screen bg-background",children:[(0,t.jsx)("header",{className:"border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-3 sm:px-4",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-14 sm:h-16 gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 sm:gap-3 shrink-0",children:[(0,t.jsx)(a.Button,{variant:"ghost",size:"icon",className:"h-8 w-8",onClick:()=>window.history.back(),children:(0,t.jsx)(s.X,{className:"h-4 w-4"})}),(0,t.jsx)("div",{className:"w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0",children:(0,t.jsx)(l.Sparkles,{className:"h-4 w-4 text-white"})}),(0,t.jsx)("span",{className:"font-bold text-sm sm:text-lg",children:"PortfolioForge"}),(0,t.jsx)(c.Badge,{variant:"secondary",className:"text-[10px] sm:text-xs hidden xs:inline-flex",children:"Preview"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 sm:gap-2",children:[(0,t.jsxs)(a.Button,{variant:"outline",size:"sm",onClick:y,disabled:u,className:"gap-1.5 h-8 text-xs px-2.5 sm:px-3",children:[(0,t.jsx)(r.Download,{className:"h-3.5 w-3.5"}),(0,t.jsx)("span",{className:"hidden sm:inline",children:u?"Preparing...":"Download Portfolio"}),(0,t.jsx)("span",{className:"sm:hidden",children:"Export"})]}),(0,t.jsxs)(a.Button,{variant:"default",size:"sm",onClick:()=>window.location.href=(0,f.getAppPath)("/editor"),className:"gap-1.5 h-8 text-xs px-2.5 sm:px-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90",children:[(0,t.jsx)(n.Code,{className:"h-3.5 w-3.5"}),"Edit"]})]})]})})}),(0,t.jsx)("main",{className:"min-h-[calc(100vh-64px)]",style:{background:d.theme.tokens.colors.background,color:d.theme.tokens.colors.text},children:(0,t.jsx)("div",{style:{fontFamily:d.theme.tokens.typography.fontFamily.sans},children:b.map(e=>(0,t.jsx)(p.SectionRenderer,{section:e,portfolio:d},e.id))})}),(0,t.jsx)("footer",{className:"border-t border-border/50 py-8",style:{borderColor:d.theme.tokens.colors.border},children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 text-center",style:{color:d.theme.tokens.colors.textMuted},children:(0,t.jsx)("p",{children:"Preview generated by PortfolioForge AI"})})})]})}])}]);