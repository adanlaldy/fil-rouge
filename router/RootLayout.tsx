import {Outlet, useLocation} from "react-router-dom";

function BackToHomeButton() {
    return null;
}

export default function RootLayout() {
    const location = useLocation()
    const isHome = location.pathname === "/"

    return (
        <>
            <Outlet/>
            {!isHome && <BackToHomeButton/>}
        </>
    )
}