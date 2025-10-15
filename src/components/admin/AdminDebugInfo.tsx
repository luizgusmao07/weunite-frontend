import { useAuthStore } from "@/stores/useAuthStore";

export function AdminDebugInfo() {
  const { user, isAuthenticated } = useAuthStore();

  const ADMIN_EMAILS = [
    "admin@weunite.com",
    "luiz@weunite.com",
    "matheus@weunite.com",
    "matheusoliveirale2007@gmail.com",
  ];

  const isAdmin =
    user?.isAdmin || (user?.email && ADMIN_EMAILS.includes(user.email));

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded text-xs z-50">
      <div>Logado: {isAuthenticated ? "Sim" : "Não"}</div>
      <div>Email: {user?.email || "N/A"}</div>
      <div>É Admin: {isAdmin ? "Sim" : "Não"}</div>
      <div>User.isAdmin: {user?.isAdmin ? "Sim" : "Não"}</div>
    </div>
  );
}
