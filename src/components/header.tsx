import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white w-full shadow-md px-6 py-4">
            <div className="w-full flex items-center justify-between">
                {/* Logo / Titre */}
                <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-900 transition">
                    PokéManager
                </Link>

                {/* Navigation */}
                <nav className="flex gap-4">
                    <Link
                        to="/"
                        className="text-blue-600 hover:text-blue-700 visited:text-gray-700 font-medium"
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/all-pokemons"
                        className="text-blue-600 hover:text-blue-700 visited:text-gray-700 font-medium"
                    >
                        Tous les Pokémons
                    </Link>
                </nav>
            </div>
        </header>
    );
}
