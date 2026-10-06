const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-radial-[at_50%_0%] from-blue-900 to-cyan-500">
      {children}
    </div>
  );
};

export default AuthLayout;