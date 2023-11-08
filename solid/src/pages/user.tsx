import createHideFooter from "@/primitives/createHideFooter.ts";

import UForm from "@/screens/user/UForm";
import PWrapper from "@/components/ui/PWrapper";
import ULinks from "@/screens/user/ULinks";

export default () => {
    createHideFooter();

    return (
        <PWrapper>
            <div class="mx-auto flex w-[600px] flex-col gap-2">
                <UForm />
                <ULinks />
            </div>
        </PWrapper>
    );
};
