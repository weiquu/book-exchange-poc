import UserProvider from "../../components/global/UserProvider";
import Navbar from "../../components/global/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: add header
  return (
    <UserProvider>
      <Navbar children={children}></Navbar>
    </UserProvider>
  );
}
