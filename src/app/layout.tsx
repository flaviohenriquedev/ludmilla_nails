import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ReactNode} from "react";
import {Logo} from "@/components/layout/logo/logo";
import {Footer} from "@/components/footer/footer";
import {icons} from "@/constants/icons/icons";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Lud Nails",
    description: "Lud Nails",
};

const menuNavegacao: { descricao: string, url: string }[] = [
    {descricao: 'home', url: '/'},
    {descricao: 'modelos', url: '/modelos'},
    {descricao: 'agendamento', url: '/agendamento'},
];

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {

    function renderMenuNavegacao() {
        return menuNavegacao.map(menu => (
            <li key={menu.descricao}>
                <a href={menu.url}
                   className={`
                    py-2
                    border-transparent
                    transition-all
                    duration-200
                    hover:cursor-pointer
                    hover:border-b
                    hover:border-base-content
                `}>{menu.descricao}</a>
            </li>
        ));
    }

    return (
        <html lang="pt-BR">
        <body className={`h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header
            className={`flex w-full text-sm items-center justify-end gap-10 max-h-10 min-h-10 bg-primary text-primary-content px-80`}>
            <div className={`flex items-center gap-2`}>
                {icons["whatsapp"]}
                <span>(62) 9 9102-1871</span>
            </div>

            <div className={`flex items-center gap-2`}>
                {icons["email"]}
                <span>ludmillafernandagomes@gmail.com</span>
            </div>

        </header>

        <div className={`flex w-full p-5 items-center justify-between max-h-36 min-h-36 bg-base-300 px-80`}>
            <Logo/>
            <ul className={`flex gap-5 items-center text-md text-base-content font-light`}>
                {renderMenuNavegacao()}
            </ul>
        </div>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
