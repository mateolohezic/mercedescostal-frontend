import { Footer } from "@/components";
import { Fragment } from "react";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Fragment>
      {children}
      <Footer/>
    </Fragment>    
  );
}