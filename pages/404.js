import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link"

export default function Instructions() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dance!</title>
                <link rel="icon" href="/logo.svg" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    404
                </h1>
            </main>
        </div>
    )
}