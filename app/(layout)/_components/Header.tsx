import styles from "../layout.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <img className={styles.logo} src='/logo-32x32.png'/>
            </div>
            <nav>
                <div className={styles.menu}/>
            </nav>
        </header>
    );
}
