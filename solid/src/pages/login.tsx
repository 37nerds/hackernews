import Login from "@/screens/login/Login";
import Register from "@/screens/login/Register";
import Link from "@/components/ui/Link";

export default () => {
    return (
        <div class="mx-auto flex w-[450px] flex-col gap-5 p-10">
            <Login />
            <Link label="Forgot your password?" href="/forgot-password" />
            <Register />
        </div>
    );
};
