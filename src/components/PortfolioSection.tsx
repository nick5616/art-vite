import * as React from "react";
import { Theme } from "../models";
import { getRandomBackgroundColorPairFromPalette } from "../theme";

interface PortfolioSectionProps {
    pageTheme: Theme;
}

export function PortfolioSection({
    pageTheme,
}: PortfolioSectionProps): JSX.Element {
    const pair = getRandomBackgroundColorPairFromPalette(pageTheme.palette);

    return (
        <div
            style={{
                background: pair.colorPair.backgroundColor,
                color: pair.colorPair.color,
                padding: "4rem 2rem",
                marginTop: "2rem",
                borderRadius: "20px",
                margin: "2rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                border: `3px solid ${pair.colorPair.color}`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${pair.colorPair.color}20 0%, transparent 70%)`,
                    animation: "pulse 4s ease-in-out infinite",
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        textAlign: "center",
                        textShadow: `2px 2px 4px ${pair.colorPair.backgroundColor}`,
                    }}
                >
                    🎨 3D Portfolio Experience
                </h2>
                <p
                    style={{
                        fontSize: "1.2rem",
                        lineHeight: "1.6",
                        textAlign: "center",
                        marginBottom: "2rem",
                        maxWidth: "600px",
                        margin: "0 auto 2rem auto",
                    }}
                >
                    I made a 3D portfolio website to showcase my art and
                    software projects.
                </p>
                <p
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        textAlign: "center",
                        marginBottom: "2rem",
                        maxWidth: "700px",
                        margin: "0 auto 2rem auto",
                        opacity: 0.9,
                    }}
                >
                    It has a virtual art gallery, some interactive activities
                    and games, and my web-based software projects. Works on
                    phones too.
                </p>
                <div style={{ textAlign: "center" }}>
                    <a
                        href="https://nicolasbelovoskey.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            textDecoration: "none",
                            background: pair.colorPair.color,
                            color: pair.colorPair.backgroundColor,
                            borderRadius: "50px",
                            border: `3px solid ${pair.colorPair.backgroundColor}`,
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
                        🚀 Explore My 3D Portfolio
                    </a>
                </div>
            </div>
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 0.6; transform: scale(1.1); }
                    }
                `}
            </style>
        </div>
    );
}
