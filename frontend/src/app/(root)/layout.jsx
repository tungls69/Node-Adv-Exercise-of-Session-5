import Navbar from "@/components/shares/Navbar";

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}
