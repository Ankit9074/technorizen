import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import img1 from "../../assetss/imgs/logo.png";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sessionReady, setSessionReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResetFlow = async () => {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.replace("#", "?"));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");
            const type = params.get("type");

            console.log("Extracted tokens:", { accessToken, refreshToken, type });

            if (type !== 'recovery' || !accessToken || !refreshToken) {
                setError("Invalid password reset link");
                return;
            }

            try {
                const { error: sessionError } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken
                });

                if (sessionError) throw sessionError;

                window.history.replaceState({}, '', window.location.pathname);

            } catch (err) {
                console.error("Session error:", err);
                setError("Reset link expired or invalid");
            }
        };

        handleResetFlow();

        // 4. Memory-only auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === "PASSWORD_RECOVERY") {

                try {
                    const { error } = await supabase.auth.updateUser({
                        password: password
                    });

                    if (error) throw error;

                    alert("Password updated successfully!");
                    navigate("/auth/signin");
                } catch (err) {
                    console.error("Update error:", err);
                }
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, [navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !session) {
                throw new Error("Authentication session missing. Please use the password reset link from your email.");
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) throw updateError;

            setSuccess("Password successfully reset! Redirecting to login...");
            setTimeout(() => navigate("/auth/signin"), 2000);
        } catch (err) {
            console.error("Password reset error:", err);
            setError(err.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4 relative">
            <div className="fixed top-5 left-10">
                <Link to="/">
                    <img src={img1} alt="Home" />
                </Link>
            </div>
            <div className="w-full max-w-md">
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                        <p className="text-gray-400 mt-2">Enter your new password</p>
                    </div>

                    {error && (
                        <div className="p-3 rounded bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleResetPassword} className="space-y-4 mt-6">
                        <div className="relative p-[2px] rounded-[20px]" style={{ background: "linear-gradient(to right, #7A73F0, #35A29F, #FF8C42)" }}>
                            <div className="relative bg-[#1A1133] rounded-[18px]">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password (min 8 characters)"
                                    minLength={8}
                                    className="w-full pl-4 pr-4 py-3 bg-[#1A1133] text-white placeholder-gray-400 rounded-[18px] border-none focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative p-[2px] rounded-[20px]" style={{ background: "linear-gradient(to right, #7A73F0, #35A29F, #FF8C42)" }}>
                            <div className="relative bg-[#1A1133] rounded-[18px]">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    minLength={8}
                                    className="w-full pl-4 pr-4 py-3 bg-[#1A1133] text-white placeholder-gray-400 rounded-[18px] border-none focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-3 rounded-lg font-medium transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-500/10'}`}
                            style={{ border: "1px solid #a855f7", color: "#a855f7", fontSize: "18px" }}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    {success && (
                        <div className="p-3 rounded bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                            {success}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
