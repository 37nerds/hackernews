import Submit from "@/components/ui/Submit";
import Field from "./Field";

const Login = () => {
    return (
        <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">Login</h2>
            <div class="flex flex-col gap-2">
                <Field
                    id="username"
                    value=""
                    setValue={value => {
                        console.log(value);
                    }}
                />
                <Field
                    id="password"
                    value=""
                    setValue={value => {
                        console.log(value);
                    }}
                />
                <div class="flex justify-end">
                    <Submit label="login" />
                </div>
            </div>
        </div>
    );
};

export default Login;
