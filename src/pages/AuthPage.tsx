import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register, isLoggedIn } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('ayesha@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  if (isLoggedIn) {
    navigate('/account');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter your email and password.', 'error');
      return;
    }
    const success = login(loginEmail, loginPassword);
    if (success) {
      showToast('Welcome back to The Heritage Edit.');
      navigate('/account');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      showToast('Please complete all registration fields.', 'error');
      return;
    }
    const success = register(registerName, registerEmail, registerPassword);
    if (success) {
      showToast('Account created successfully! Welcome to The Heritage Circle.');
      navigate('/account');
    }
  };

  const handleQuickDemo = () => {
    login('ayesha@example.com', 'password123');
    showToast('Signed in as demo patron: Ayesha Ahmed');
    navigate('/account');
  };

  const handleForgotPassword = () => {
    showToast('A password reset link has been dispatched to your email address.');
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: mode === 'login' ? 'Sign In' : 'Create Account' },
          ]}
        />
      </div>

      <div className="max-w-md mx-auto px-6 mt-12">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] font-body font-semibold text-burgundy block mb-2">
            The Heritage Circle
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-charcoal font-normal">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Patron Account'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-warm-grey font-body">
            Access your curated unstitched orders, bespoke measurements, and private seasonal previews.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-border mb-8">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.16em] font-body font-semibold transition-all border-b-2 ${
              mode === 'login'
                ? 'border-mocha text-charcoal'
                : 'border-transparent text-warm-grey hover:text-charcoal'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.16em] font-body font-semibold transition-all border-b-2 ${
              mode === 'register'
                ? 'border-mocha text-charcoal'
                : 'border-transparent text-warm-grey hover:text-charcoal'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs">
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-warm-grey" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-mocha hover:underline font-body"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-warm-grey" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-warm-grey hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors shadow-2xs mt-2"
              >
                Sign In To Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-warm-grey" />
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Maryam Khan"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-warm-grey" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="maryam@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Phone (Pakistan)
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-3 text-warm-grey" />
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-warm-grey" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-warm-grey hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-burgundy text-ivory hover:bg-[#5f2430] text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors shadow-2xs mt-2"
              >
                Create Account & Join Circle
              </button>
            </form>
          )}

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <span className="text-[11px] text-warm-grey font-body block mb-3">
              Testing the website demo?
            </span>
            <button
              onClick={handleQuickDemo}
              className="w-full py-2.5 bg-champagne/40 hover:bg-champagne text-charcoal border border-border text-xs uppercase tracking-[0.14em] font-body font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-burgundy" />
              One-Click Demo Sign In (Ayesha Ahmed)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
