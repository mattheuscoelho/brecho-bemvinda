export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login tem layout próprio — sem header admin
  return <>{children}</>;
}
