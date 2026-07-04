import { Footer, WhatsApp, PromoPopup } from "@/components";
import { CartResumeModal } from "@/components/cart/CartResumeModal";
import { Fragment } from "react";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Fragment>
      {children}
      <Footer/>
      <WhatsApp/>
      <CartResumeModal/>
      <PromoPopup/>
    </Fragment>
  );
}