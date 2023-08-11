import Link from "next/link";
import styles from "./page.module.css";
import { ArrowRightIcon } from "@radix-ui/react-icons";

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
          <span
            style={{
              display: "inline-block",
              width: 48,
              height: 4,
              backgroundColor: "#3d4449",
            }}
          ></span>
          <p
            style={{
              color: "#687076",
              fontSize: 14,
              marginTop: 24,
              lineHeight: 1.2,
            }}
          >
            A service that allows anyone
            <br /> to enjoy image conversion.
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            paddingTop: 120,
          }}
        >
          <Link
            href="/create"
            style={{
              padding: "12px 72px",
              borderRadius: 10,
              background: "linear-gradient(90deg, #793AAF, #3451B2)",
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: 12,
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Start Now
              </span>
              <div
                style={{
                  width: 22,
                  height: 22,
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <ArrowRightIcon
                  style={{
                    backgroundColor: "white",
                    width: 22,
                    height: 22,
                    padding: 2,
                    color: "linear-gradient(90deg, #793AAF, #3451B2)",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
