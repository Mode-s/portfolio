import type { Metadata } from "next";
import "./styles/reset.css"; // Issue #2で設定したリセットCSS
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import styles from "@/app/layout.module.css";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={styles.container}>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}