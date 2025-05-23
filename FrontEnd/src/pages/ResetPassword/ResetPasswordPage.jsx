import ResetPassword from "../../component/ResetPassword/ResetPassword";

export default function ResetPasswordPage() {
    return (
        <div
            style={{
                backgroundColor: "black",
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <ResetPassword />
        </div>
    );
}