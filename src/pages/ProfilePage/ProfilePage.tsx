import { useAuth } from "@/features/auth/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "32px 0" }}>
      <h1>{user?.full_name}</h1>
      <p>Login: {user?.login}</p>
    </div>
  );
}
