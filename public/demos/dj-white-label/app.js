import React from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Button({ className, asChild = false, variant = "default", ...props }) {
  const Comp = asChild ? Slot : "button";

  return React.createElement(Comp, {
    className: cn(
      "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50",
      variant === "default" && "bg-orange-500 text-white hover:bg-orange-400",
      variant === "outline" && "border border-white/15 bg-transparent text-white hover:bg-white/5",
      className
    ),
    ...props,
  });
}

function Card({ className, ...props }) {
  return React.createElement("div", {
    className: cn(
      "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur",
      className
    ),
    ...props,
  });
}

function App() {
  return (
    React.createElement(
      "main",
      {
        className:
          "min-h-screen bg-neutral-950 text-white antialiased"
      },
      React.createElement(
        "section",
        {
          className:
            "mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center"
        },
        React.createElement(
          motion.p,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className:
              "mb-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-300"
          },
          "CategorieN"
        ),
        React.createElement(
          motion.h1,
          {
            initial: { opacity: 0, y: 36 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.1 },
            className:
              "max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl"
          },
          "We unite the sound."
        ),
        React.createElement(
          motion.p,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.2 },
            className:
              "mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
          },
          "Tailwind ist eingebunden, Framer Motion laeuft im Browser, und die Basis fuer shadcn-aehnliche Komponenten ist jetzt ebenfalls vorhanden."
        ),
        React.createElement(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.3 },
            className: "mt-10 flex flex-wrap items-center justify-center gap-4"
          },
          React.createElement(
            Button,
            {
              asChild: true
            },
            React.createElement(
              "a",
              {
                href: "#"
              },
              "Start Project"
            )
          ),
          React.createElement(
            Button,
            {
              asChild: true,
              variant: "outline"
            },
            React.createElement(
              "a",
              {
                href: "#"
              },
              "Learn More"
            )
          )
        ),
        React.createElement(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.4 },
            className: "mt-12 w-full max-w-3xl"
          },
          React.createElement(
            Card,
            {
              className: "grid gap-4 text-left sm:grid-cols-3"
            },
            React.createElement(
              "div",
              null,
              React.createElement(
                "p",
                {
                  className: "text-sm text-white/50"
                },
                "UI Basis"
              ),
              React.createElement(
                "p",
                {
                  className: "mt-2 text-lg font-semibold text-white"
                },
                "Button, Card, cn()"
              )
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "p",
                {
                  className: "text-sm text-white/50"
                },
                "Kompatibel mit"
              ),
              React.createElement(
                "p",
                {
                  className: "mt-2 text-lg font-semibold text-white"
                },
                "Tailwind + Radix"
              )
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "p",
                {
                  className: "text-sm text-white/50"
                },
                "Hinweis"
              ),
              React.createElement(
                "p",
                {
                  className: "mt-2 text-lg font-semibold text-white"
                },
                "shadcn/ui selbst hat kein CDN"
              )
            )
          )
        )
      )
    )
  );
}

createRoot(document.getElementById("root")).render(React.createElement(App));
