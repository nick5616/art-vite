import * as React from "react";

export function PianoSection(): JSX.Element {
    return (
        <div
            style={{
                background: "linear-gradient(135deg, #ef4444, #3b82f6)",
                color: "white",
                padding: "4rem 2rem",
                marginTop: "2rem",
                borderRadius: "20px",
                margin: "2rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "300px",
            }}
        >
            {/* Large piano emoji background */}
            <div
                style={{
                    position: "absolute",
                    right: "-10%",
                    top: "50%",
                    transform: "translateY(-50%) rotate(20deg)",
                    fontSize: "40rem",
                    opacity: 0.15,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            >
                🎹
            </div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2rem",
                }}
            >
                {/* Left side text */}
                <div
                    style={{
                        flex: "1",
                        minWidth: "250px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                            textAlign: "left",
                        }}
                    >
                        Try out my Smart Piano Keyboard
                    </h2>
                    <p
                        style={{
                            fontSize: "1.2rem",
                            lineHeight: "1.6",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                            textAlign: "left",
                        }}
                    >
                        Some music theory baked in
                    </p>
                </div>

                {/* Right side button */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <a
                        href="/piano"
                        style={{
                            display: "inline-block",
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            textDecoration: "none",
                            background: "black",
                            color: "white",
                            borderRadius: "50px",
                            border: `3px solid white`,
                            transition: "all 0.3s ease",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-3px) scale(1.05)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 24px rgba(0,0,0,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0) scale(1)";
                            e.currentTarget.style.boxShadow =
                                "0 8px 16px rgba(0,0,0,0.2)";
                        }}
                    >
                        🎹 Play some tunes!
                    </a>
                </div>
            </div>
        </div>
    );
}
