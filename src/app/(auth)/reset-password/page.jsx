import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";


const ResetPasswordPage = async() => {
    
    return (
        <div>
            <h2>Reset Your Password.</h2>
            <Suspense fallback="Loading">
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;