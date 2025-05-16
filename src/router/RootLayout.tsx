import {Outlet, useLocation} from "react-router-dom";
import Header from "@/components/header.tsx";

function BackToHomeButton() {
    return null;
}

export default function RootLayout() {
    const location = useLocation()
    const isHome = location.pathname === "/"

    return (
        <>
            <Header />
            <Outlet/>
            {!isHome && <BackToHomeButton/>}
        </>
    )
}