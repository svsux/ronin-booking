// pages/_app.js
import '../styles/globals.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        limit={3} // чтобы не копились уведомления
      />
    </>
  );
}
