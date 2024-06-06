import styles from "./page.module.css";
import * as React from "react";
import prisma from "@/lib/db";


export default async function Home() {
    const me = await prisma.users.findFirst()
    return (
        <main className={styles.main}>
            hello {me.name}

        </main>
    );
}
