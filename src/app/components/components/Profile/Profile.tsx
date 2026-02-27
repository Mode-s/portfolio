import styles from "./Profile.module.css";

export default function Profile() {
    return (
        <section className = {styles.section}>
            <h2 className = {styles.title}>About Me</h2>
            <p className = {styles.description}>
                ReactとTypeScriptを使った開発
            </p>
        </section>
    );
}