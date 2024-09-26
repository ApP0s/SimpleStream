import Header from "@/app/components/Header"; // Adjust the import according to your structure

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SimpleStream</title> {/* You can include the title here */}
        {/* Other head elements like meta tags can go here */}
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
