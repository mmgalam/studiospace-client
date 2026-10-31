'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (pw: string) => {
    if (!/[A-Z]/.test(pw)) return 'Password must contain an uppercase letter.';
    if (!/[a-z]/.test(pw)) return 'Password must contain a lowercase letter.';
    if (pw.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name'));
    const email = String(form.get('email'));
    const image = String(form.get('photo'));
    const password = String(form.get('password'));

    const err = validatePassword(password);
    setPasswordError(err);
    if (err) {
      toast.error(err);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password, image });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? 'Registration failed.');
      return;
    }
    toast.success('Account created! Please log in.');
    router.push('/login');
  };

  const input =
    'w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" required placeholder="Full name" className={input} />
        <input name="email" type="email" required placeholder="Email" className={input} />
        <input name="photo" type="url" required placeholder="Photo URL" className={input} />
        <div>
          <input name="password" type="password" required placeholder="Password" className={input} />
          {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}
        </div>
        <button
          disabled={loading}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-60 cursor-pointer"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => authClient.signIn.social({ provider: 'google', callbackURL: '/' })}
        className="w-full mt-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-medium cursor-pointer"
      >
        Continue with Google
      </button>

      <p className="text-sm text-center mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 font-medium">Login</Link>
      </p>
    </div>
  );
}