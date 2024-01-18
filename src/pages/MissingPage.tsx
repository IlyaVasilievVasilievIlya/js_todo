import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderElement } from "../components/HeaderElement";

export function MissingPage() {

    return (
        <>
            <HeaderElement />
            <ErrorMessage error="Страница не найдена" />
        </>
    )
}