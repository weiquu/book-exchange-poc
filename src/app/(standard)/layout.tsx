import UserProvider from "../../components/global/UserProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: add header
  return <UserProvider>{children}</UserProvider>;
}
