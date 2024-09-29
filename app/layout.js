import Header from "@/app/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SimpleStream</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
