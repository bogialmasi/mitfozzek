export const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent text-current py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm mt-2">Mitfőzzek &copy; {currentYear}</p>
            </div>
        </footer>
    );
};