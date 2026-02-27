import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className = {styles.header}>
            <div>My Portfolio</div>
            <nav>
                <ul className = {styles.nav}>
                    <li>About</li>
                    <li>Works</li>
                </ul>
            </nav>
        </header>
    );
}