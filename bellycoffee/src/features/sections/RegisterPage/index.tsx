import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../../lib/supabaseClient';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Şifrələr uyğun gəlmir!');
            return;
        }

        if (!agreeTerms) {
            setError('Şərtləri qəbul etməlisiniz!');
            return;
        }

        if (password.length < 6) {
            setError('Şifrə ən azı 6 simvoldan ibarət olmalıdır');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                    emailRedirectTo: undefined,
                },
            });

            if (error) {
                throw error;
            }

            if (data.user) {
                console.log('Qeydiyyat uğurlu:', data.user);
                
                if (data.session) {
                    navigate('/login');
                } else {
                    navigate('/login?registered=true');
                }
            }
        } catch (error: any) {
            console.error('Qeydiyyat xətası:', error);
            if (error.message.includes('User already registered')) {
                setError('Bu e-poçt artıq qeydiyyatdan keçib');
            } else if (error.message.includes('Password should be')) {
                setError('Şifrə çox zəifdir');
            } else {
                setError(error.message || 'Qeydiyyat zamanı xəta baş verdi');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] flex justify-center items-center p-5">
            <div className="bg-white rounded-lg shadow-md w-full max-w-150 px-10 py-20">
                <div className="text-center mb-8">
                    <div className="w-17 h-17 inline-flex items-center justify-center text-3xl mb-3">
                        <img src="https://demo-22.woovinapro.com/wp-content/uploads/2019/09/logo-1.png" alt="Logo" />
                    </div>
                    <h1 className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                        Qeydiyyat
                    </h1>
                    <p className="text-[#757575] text-sm">
                        Yeni hesab yaradın
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="mb-5">
                        <label
                            htmlFor="fullName"
                            className="block text-[#2c2c2c] text-sm font-medium mb-1.5"
                        >
                            Ad və Soyad
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Adınızı daxil edin"
                            required
                            disabled={loading}
                            className="w-full px-3.5 py-3 border border-[#d4d4d4] rounded-md text-[15px] transition-colors focus:outline-none focus:border-[#5d4037] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block text-[#2c2c2c] text-sm font-medium mb-1.5"
                        >
                            E-poçt
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ad@sirket.com"
                            required
                            disabled={loading}
                            className="w-full px-3.5 py-3 border border-[#d4d4d4] rounded-md text-[15px] transition-colors focus:outline-none focus:border-[#5d4037] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block text-[#2c2c2c] text-sm font-medium mb-1.5"
                        >
                            Şifrə
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifrənizi daxil edin (ən azı 6 simvol)"
                            required
                            disabled={loading}
                            className="w-full px-3.5 py-3 border border-[#d4d4d4] rounded-md text-[15px] transition-colors focus:outline-none focus:border-[#5d4037] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-[#2c2c2c] text-sm font-medium mb-1.5"
                        >
                            Şifrəni təsdiqlə
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Şifrənizi yenidən daxil edin"
                            required
                            disabled={loading}
                            className="w-full px-3.5 py-3 border border-[#d4d4d4] rounded-md text-[15px] transition-colors focus:outline-none focus:border-[#5d4037] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="flex items-start mb-6 text-sm">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            disabled={loading}
                            className="mr-2 mt-0.5 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <label
                            htmlFor="agreeTerms"
                            className="text-[#2c2c2c] cursor-pointer"
                        >
                            İstifadə şərtlərini və məxfilik siyasətini qəbul edirəm
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#5d4037] text-white rounded-md text-[15px] font-medium cursor-pointer transition-colors hover:bg-[#4e342e] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Gözləyin...' : 'Qeydiyyatdan keç'}
                    </button>
                </form>

                <div className="text-center my-7 relative text-[#9e9e9e] text-sm">
                    <span className="bg-white px-3 relative z-10">və ya</span>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-[#e0e0e0] z-0"></div>
                </div>

                <div className="text-center text-sm text-[#757575]">
                    Artıq hesabın var?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-[#5d4037] font-medium hover:underline"
                    >
                        Daxil ol
                    </button>
                </div>
            </div>
        </div>
    );
}