import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { supabase } from '../../../lib/supabaseClient';
import { setLoginStatus, syncCart } from '../../../Redux/Slices/cartSlice';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setSuccessMessage('Qeydiyyat uğurla tamamlandı! İndi daxil ola bilərsiniz.');
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            if (data.user) {
                console.log('Login uğurlu:', data.user);
                
                localStorage.setItem('user', JSON.stringify(data.user));
                
                dispatch(setLoginStatus(true));
                dispatch(syncCart());
                
                navigate('/');
            }
        } catch (error: any) {
            console.error('Login xətası:', error);
            console.error('Xəta mesajı:', error.message);
            
            if (error.message.includes('Invalid login credentials')) {
                setError('E-poçt və ya şifrə yanlışdır.');
            } else if (error.message.includes('Email not confirmed')) {
                setError('E-poçtunuz təsdiqlənməyib. Supabase dashboard-dan istifadəçini confirm edin.');
            } else {
                setError(`Xəta: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f1ed] flex justify-center items-center p-5">
            <div className="bg-white rounded-lg shadow-md w-full max-w-105 px-10 py-12">
                <div className="text-center mb-8">
                    <div className="w-18 h-18 inline-flex items-center justify-center text-3xl mb-3">
                        <img className='h-15 w-20' src="https://demo-22.woovinapro.com/wp-content/uploads/2019/09/logo-1.png" alt="Logo" />
                    </div>
                    <h1 className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                        Daxil ol
                    </h1>
                    <p className="text-[#757575] text-sm">
                        Hesabınıza giriş edin
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                            {successMessage}
                        </div>
                    )}
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                    
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
                            placeholder="Şifrənizi daxil edin"
                            required
                            disabled={loading}
                            className="w-full px-3.5 py-3 border border-[#d4d4d4] rounded-md text-[15px] transition-colors focus:outline-none focus:border-[#5d4037] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6 text-sm">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                disabled={loading}
                                className="mr-1.5 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <label 
                                htmlFor="remember" 
                                className="text-[#2c2c2c] cursor-pointer"
                            >
                                Məni xatırla
                            </label>
                        </div>
                        <a 
                            href="#" 
                            className="text-[#5d4037] font-medium hover:underline"
                        >
                            Şifrəni unutmusan?
                        </a>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#5d4037] text-white rounded-md text-[15px] font-medium cursor-pointer transition-colors hover:bg-[#4e342e] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Gözləyin...' : 'Daxil ol'}
                    </button>
                </form>
                <div className="text-center my-7 relative text-[#9e9e9e] text-sm">
                    <span className="bg-white px-3 relative z-10">və ya</span>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-[#e0e0e0] z-0"></div>
                </div>
                <div className="text-center text-sm text-[#757575]">
                    Hesabın yoxdur?{' '}
                    <button 
                        onClick={() => navigate('/register')}
                        className="text-[#5d4037] font-medium hover:underline"
                    >
                        Qeydiyyatdan keç
                    </button>
                </div>
            </div>
        </div>
    );
}