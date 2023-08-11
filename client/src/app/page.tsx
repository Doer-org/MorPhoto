import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main
      style={{
        height: "calc(100vh - 52px)",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "120px 16px",
          textAlign: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #793AAF, #3451B2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mor
            </span>
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #11181C, #3D4449)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Photo
            </span>
          </h1>
        </div>

        <div
          style={{
            textAlign: "center",
            paddingTop: 120,
          }}
        >
          <Link href="/create" className={styles.card}>
            <h2>
              Create MorPhoto <span>-&gt;</span>
            </h2>
            <p
              style={{
                display: "inline-block",
              }}
            >
              create MorPhoto
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
