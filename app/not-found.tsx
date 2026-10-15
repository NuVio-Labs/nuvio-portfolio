"use client"

import NextError from "next/error"

/**
 * Standard-404 von Next.js fuer Anfragen ohne Locale-Zuordnung, z. B. von
 * proxy.ts ausgenommene Pfade wie /wp-login.php, sowie fuer notFound() ohne
 * naeheren not-found-Boundary. Das Root-Layout reicht nur durch, deshalb
 * braucht diese Seite eigene html/body-Tags.
 */
export default function NotFound() {
  return (
    <html lang="de">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  )
}
