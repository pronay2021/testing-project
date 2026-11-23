import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import AccountPage from "../features/account/AccountPage.jsx";
import PasswordPage from "../features/account/PasswordPage.jsx";
import AdministratorsPage from "../features/admin/admins/AdministratorsPage.jsx";
import AdminLoginPage from "../features/admin/login/AdminLoginPage.jsx";
import AdminPanelPage from "../features/admin/panel/AdminPanelPage.jsx";
import AdminReceiptPage from "../features/admin/cases/AdminReceiptPage.jsx";
import CaseReviewDetailPage from "../features/admin/cases/CaseReviewDetailPage.jsx";
import CaseReviewPage from "../features/admin/cases/CaseReviewPage.jsx";
import ReviewProductPage from "../features/admin/cases/ReviewProductPage.jsx";
import SettingsPage from "../features/admin/settings/SettingsPage.jsx";
import { AdminForgotPage, AdminResetPage, CheckEmailPage, ThanksPage } from "../features/admin/recovery/AdminRecoveryPages.jsx";
import UsersPage from "../features/admin/users/UsersPage.jsx";
import AssessmentStepPage from "../features/assessment/AssessmentStepPage.jsx";
import RoleSelectPage from "../features/assessment/RoleSelectPage.jsx";
import PreGenerationPage from "../features/assessment/PreGenerationPage.jsx";
import ForgotPasswordPage from "../features/auth/forgot-password/ForgotPasswordPage.jsx";
import LoginPage from "../features/auth/login/LoginPage.jsx";
import OtpPage from "../features/auth/otp/OtpPage.jsx";
import SetNewPasswordPage from "../features/auth/set-new-password/SetNewPasswordPage.jsx";
import SignupPage from "../features/auth/signup/SignupPage.jsx";
import MyCasesPage from "../features/cases/MyCasesPage.jsx";
import ClientDetailPage from "../features/clients/ClientDetailPage.jsx";
import ClientsPage from "../features/clients/ClientsPage.jsx";
import DashboardPage from "../features/dashboard/DashboardPage.jsx";
import PaymentPage from "../features/payment/PaymentPage.jsx";
import QuotationPage from "../features/quotation/QuotationPage.jsx";
import RecommendationPage from "../features/recommendation/RecommendationPage.jsx";
import { readSession } from "../lib/api/auth.js";

function RequireAuth({ role, children }) {
  const session = readSession();
  if (!session) return <Navigate to={role === "admin" ? "/admin/login" : "/login"} replace />;
  if (role && session.role !== role) return <Navigate to={role === "admin" ? "/admin/login" : "/login"} replace />;
  return children;
}

function UserShell({ children }) {
  return (
    <RequireAuth role="user">
      <AppShell variant="user">{children}</AppShell>
    </RequireAuth>
  );
}

function AdminShell({ children }) {
  return (
    <RequireAuth role="admin">
      <AppShell variant="admin">{children}</AppShell>
    </RequireAuth>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/reset-password" element={<SetNewPasswordPage />} />

      <Route path="/dashboard" element={<UserShell><DashboardPage /></UserShell>} />
      <Route path="/cases" element={<UserShell><MyCasesPage /></UserShell>} />
      <Route path="/clients" element={<UserShell><ClientsPage /></UserShell>} />
      <Route path="/clients/:id" element={<UserShell><ClientDetailPage /></UserShell>} />
      <Route path="/account" element={<UserShell><AccountPage /></UserShell>} />
      <Route path="/account/password" element={<UserShell><PasswordPage /></UserShell>} />
      <Route path="/assessment/check" element={<UserShell><PreGenerationPage /></UserShell>} />
      <Route path="/assessment/role" element={<UserShell><RoleSelectPage /></UserShell>} />
      <Route path="/assessment/:step" element={<UserShell><AssessmentStepPage /></UserShell>} />
      <Route path="/recommendation" element={<UserShell><RecommendationPage /></UserShell>} />
      <Route path="/quotation" element={<UserShell><QuotationPage /></UserShell>} />
      <Route path="/payment" element={<UserShell><PaymentPage /></UserShell>} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPage />} />
      <Route path="/admin/check-email" element={<CheckEmailPage />} />
      <Route path="/admin/reset-password" element={<AdminResetPage />} />
      <Route path="/admin/thanks" element={<ThanksPage />} />
      <Route path="/admin" element={<AdminShell><AdminPanelPage /></AdminShell>} />
      <Route path="/admin/users" element={<AdminShell><UsersPage /></AdminShell>} />
      <Route path="/admin/cases" element={<AdminShell><CaseReviewPage /></AdminShell>} />
      <Route path="/admin/cases/:id/receipt" element={<AdminShell><AdminReceiptPage /></AdminShell>} />
      <Route path="/admin/cases/:id/product" element={<AdminShell><ReviewProductPage /></AdminShell>} />
      <Route path="/admin/cases/:id" element={<AdminShell><CaseReviewDetailPage /></AdminShell>} />
      <Route path="/admin/administrators" element={<AdminShell><AdministratorsPage /></AdminShell>} />
      <Route path="/admin/settings" element={<AdminShell><SettingsPage /></AdminShell>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
