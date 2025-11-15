import * as React from "react";
import { Theme } from "../models";
import { getRandomBackgroundColorPairFromPalette } from "../theme";

interface PortfolioSectionProps {
    pageTheme: Theme;
}

// Helper function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function PortfolioSection({
    pageTheme,
}: PortfolioSectionProps): JSX.Element {
    const pair = getRandomBackgroundColorPairFromPalette(pageTheme.palette);

    // Convert hex colors to rgba for transparency
    const bgColor = hexToRgba(pair.colorPair.backgroundColor, 0.8);
    const textColor = hexToRgba(pair.colorPair.color, 0.8);

    return (
        <div
            style={{
                backgroundImage: "url('/3dportfolioscreenshot.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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
                justifyContent: "center",
                minHeight: "400px",
            }}
        >
            {/* Diagonal gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${bgColor}, ${textColor})`,
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                <h2
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        textAlign: "center",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                >
                    3D Portfolio Experience
                </h2>
                <p
                    style={{
                        fontSize: "1.2rem",
                        lineHeight: "1.6",
                        textAlign: "center",
                        marginBottom: "0.5rem",
                        maxWidth: "600px",
                        margin: "0 auto 2rem auto",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                >
                    I made a 3D portfolio website to showcase my more recent art
                    and software projects.
                </p>
                <p
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        textAlign: "center",
                        marginBottom: "2rem",
                        maxWidth: "700px",
                        margin: "0 auto 2rem auto",
                        opacity: 0.95,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                >
                    It has a virtual art gallery, some interactive activities
                    and games, and my web-based software projects. Works on
                    phones too.
                </p>
                <div
                    style={{
                        textAlign: "center",
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="https://www.3d.saucedog.art"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            textDecoration: "none",
                            background: "black",
                            color: "white",
                            borderRadius: "50px",
                            border: "3px solid white",
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
                        Explore My 3D Portfolio
                    </a>
                </div>
            </div>
        </div>
    );
}
