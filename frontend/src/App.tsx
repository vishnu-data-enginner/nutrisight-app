import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import Index from "./pages/Index";
import Research from "./pages/Research";
import SimpleResearch from "./pages/SimpleResearch";
import DebugResearch from "./pages/DebugResearch";
import SupabaseTest from "./pages/SupabaseTest";
import TestOnboarding from "./pages/TestOnboarding";
import SupabaseDiagnostic from "./pages/SupabaseDiagnostic";
import TestSupabaseConnection from "./pages/TestSupabaseConnection";
import SimpleSupabaseTest from "./pages/SimpleSupabaseTest";
import FixProfile from "./pages/FixProfile";
import TestScanIncrement from "./pages/TestScanIncrement";
import TestBackendConnection from "./pages/TestBackendConnection";
import TestFileInput from "./pages/TestFileInput";
import TestDashboardData from "./pages/TestDashboardData";
import TestRealData from "./pages/TestRealData";
import InsertTestData from "./pages/InsertTestData";
import TestSupabaseData from "./pages/TestSupabaseData";
import ShowRealData from "./pages/ShowRealData";
import BypassRLSTest from "./pages/BypassRLSTest";
import ShowRealDataDirect from "./pages/ShowRealDataDirect";
import DashboardTest from "./pages/DashboardTest";
import WorkingDashboard from "./pages/WorkingDashboard";
import DirectSQLTest from "./pages/DirectSQLTest";
import ForceRefreshDashboard from "./pages/ForceRefreshDashboard";
import Database from "./pages/Database";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardNew from "./pages/DashboardNew";
import IngredientInsight from "./pages/IngredientInsight";
import TestIngredientInsight from "./pages/TestIngredientInsight";
import ModernHomepage2 from "./pages/ModernHomepage2";
import ModernLogin from "./pages/ModernLogin";
import ModernSignup from "./pages/ModernSignup";
import CleanDashboard from "./pages/CleanDashboard";
import CleanHistory from "./pages/CleanHistory";
import ScanHistory from "./pages/ScanHistory";
import HistoryPage from "./pages/HistoryPage";
import UpgradedHomepage from "./pages/CompleteUpgradedHomepage";
import PremiumHomepage from "./pages/PremiumHomepage";
import UnifiedHomepage from "./pages/UnifiedHomepage";
import UnifiedHomepageNew from "./pages/UnifiedHomepageNew";
import StoryDrivenHomepage from "./pages/StoryDrivenHomepage";
import EnhancedPricing from "./pages/EnhancedPricing";
import UpgradedDashboard from "./pages/UpgradedDashboard";
import FuturisticDashboard from "./pages/FuturisticDashboard";
import ModernDashboard from "./pages/ModernDashboard";
import UltimateDashboard from "./pages/UltimateDashboard";
import SimpleDashboard from "./pages/SimpleDashboard";
import ProductionDashboard from "./pages/ProductionDashboard";
import SimpleUltimateDashboard from "./pages/SimpleUltimateDashboard";
import TestDashboard from "./pages/TestDashboard";
import TestDashboardSimple from "./pages/TestDashboardSimple";
import UpgradedLogin from "./pages/UpgradedLogin";
import UpgradedSignup from "./pages/UpgradedSignup";
import SimpleLogin from "./pages/SimpleLogin";
import SimpleSignup from "./pages/SimpleSignup";
import SafeLogin from "./pages/SafeLogin";
import ProtectedDashboard from "./pages/ProtectedDashboard";
import EnhancedSignup from "./pages/EnhancedSignup";
import ProfileSettings from "./pages/ProfileSettings";
import WorkingProfileSettings from "./pages/WorkingProfileSettings";
import TestProfileSettings from "./pages/TestProfileSettings";
import SimpleTest from "./pages/SimpleTest";
import TestAnimations from "./pages/TestAnimations";
import OnboardingWizard from "./components/OnboardingWizard";
import OnboardingWrapper from "./components/OnboardingWrapper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<StoryDrivenHomepage />} />
            <Route path="modern" element={<ModernHomepage2 />} />
            <Route path="login" element={<SafeLogin />} />
            <Route path="modern-login" element={<ModernLogin />} />
            <Route path="register" element={<UpgradedSignup />} />
            <Route path="modern-signup" element={<ModernSignup />} />
            <Route path="clean-dashboard" element={<CleanDashboard />} />
            <Route path="history" element={<CleanHistory />} />
            <Route path="scan-history" element={<ScanHistory />} />
            <Route path="history-page" element={<HistoryPage />} />
            <Route path="upgraded" element={<UpgradedHomepage />} />
            <Route path="upgraded-dashboard" element={<UpgradedDashboard />} />
            <Route path="upgraded-login" element={<UpgradedLogin />} />
            <Route path="upgraded-signup" element={<EnhancedSignup />} />
            <Route path="pricing" element={<EnhancedPricing />} />
                <Route path="test-animations" element={<TestAnimations />} />
                <Route path="supabase-test" element={<SupabaseTest />} />
                <Route path="test-onboarding" element={<TestOnboarding />} />
                <Route path="supabase-diagnostic" element={<SupabaseDiagnostic />} />
                <Route path="test-supabase-connection" element={<TestSupabaseConnection />} />
                <Route path="simple-supabase-test" element={<SimpleSupabaseTest />} />
                <Route path="fix-profile" element={<FixProfile />} />
                <Route path="test-scan-increment" element={<TestScanIncrement />} />
                <Route path="test-backend-connection" element={<TestBackendConnection />} />
                <Route path="test-file-input" element={<TestFileInput />} />
                <Route path="test-dashboard-data" element={<TestDashboardData />} />
                <Route path="test-real-data" element={<TestRealData />} />
                <Route path="insert-test-data" element={<InsertTestData />} />
                <Route path="test-supabase-data" element={<TestSupabaseData />} />
                <Route path="show-real-data" element={<ShowRealData />} />
                <Route path="bypass-rls-test" element={<BypassRLSTest />} />
                <Route path="show-real-data-direct" element={<ShowRealDataDirect />} />
                <Route path="dashboard-test" element={<DashboardTest />} />
                <Route path="working-dashboard" element={<WorkingDashboard />} />
                <Route path="direct-sql-test" element={<DirectSQLTest />} />
                <Route path="force-refresh-dashboard" element={<ForceRefreshDashboard />} />
                
                {/* Protected Routes */}
                <Route path="research" element={<SimpleResearch />} />
            <Route path="dashboard" element={<ProductionDashboard />} />
            <Route path="ingredient-insight" element={
              <ProtectedRoute>
                <IngredientInsight />
              </ProtectedRoute>
            } />
            <Route path="test-insight" element={<TestIngredientInsight />} />
                <Route path="onboarding" element={
                  <ProtectedRoute>
                    <OnboardingWizard />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={<WorkingProfileSettings />} />
                <Route path="settings" element={<WorkingProfileSettings />} />
            <Route path="database" element={
              <ProtectedRoute>
                <Database />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
